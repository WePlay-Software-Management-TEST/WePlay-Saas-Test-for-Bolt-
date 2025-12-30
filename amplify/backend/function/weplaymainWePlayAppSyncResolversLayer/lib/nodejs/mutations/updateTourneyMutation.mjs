import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

export function updateTourney (input, businessId, ownerId) {
  const {
    createTournament, tournamentRulesVariables, groups,
    matchesToReferees, matchesParties, matches, tfGroupMatchs,
    changedFormat, fieldDetailsChanged, originalTourney
  } = input;

  const tourneyVersion = isNaN(Number(createTournament?._version ?? 0)) ? 1 : Number(createTournament?._version ?? 0) + 1;

  const getUpdatedDeleteInput = (entry, tableName) => {
    const {
      id, _version, _deleted,
      _lastChangedAt, updatedAt,
      __typename, owner, ...otherKeys
    } = entry;

    otherKeys.businessesID = businessId;

    const updateExpKeys = Object.keys(otherKeys).map((key) => (`${key} = :${key}`));
    const updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, #deleted = :deleted, ${updateExpKeys.join(', ')}`;
    const expAttrValues = {
      ':updatedAt': new Date().toISOString(),
      ':lastChangedAt': Math.floor(Date.now()),
      ':version': _version + 1,
      ':deleted': true
    };

    Object.keys(otherKeys).forEach((updateInfoKey) => {
      expAttrValues[`:${updateInfoKey}`] = otherKeys[updateInfoKey];
    });
    return {
      Update: {
        TableName: tableName,
        Key: {
          id
        },
        UpdateExpression: updateExp,
        ExpressionAttributeNames: {
          '#lastChangedAt': '_lastChangedAt',
          '#version': '_version',
          '#deleted': '_deleted'
        },
        ExpressionAttributeValues: expAttrValues,
        ConditionExpression: 'attribute_exists(id) AND businessesID = :businessesID',
        ReturnValues: 'UPDATED_NEW'
      }
    };
  };

  const {
    id, _version, _deleted,
    _lastChangedAt, updatedAt,
    __typename, owner, ...otherKeys
  } = createTournament;

  otherKeys.businessesID = businessId;

  const updateExpKeys = Object.keys(otherKeys).map((key) => (`${key} = :${key}`));
  const updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, #deleted = :deleted, ${updateExpKeys.join(', ')}`;
  const expAttrValues = {
    ':updatedAt': new Date().toISOString(),
    ':lastChangedAt': Math.floor(Date.now()),
    ':version': _version + 1,
    ':deleted': false
  };

  Object.keys(otherKeys).forEach((updateInfoKey) => {
    expAttrValues[`:${updateInfoKey}`] = otherKeys[updateInfoKey];
  });
  const atomicTourney = {
    TransactItems: [
      {
        Update: {
          Item: {
            __typename: 'Tournaments',
            _version: tourneyVersion,
            _lastChangedAt: new Date().getTime(),
            ...createTournament
          },
          Key: {
            id
          },
          ExpressionAttributeNames: {
            '#lastChangedAt': '_lastChangedAt',
            '#version': '_version',
            '#deleted': '_deleted'
          },
          UpdateExpression: updateExp,
          ExpressionAttributeValues: expAttrValues,
          ConditionExpression: 'attribute_exists(id) AND businessesID = :businessesID',
          TableName: process.env.API_WEPLAYMAIN_TOURNAMENTSTABLE_NAME,
          ReturnValues: 'UPDATED_NEW'
        }
      }
    ]
  };

  if (originalTourney !== undefined && originalTourney !== '') {
    const matchesToReferees = [];
    const matchesParties = [];
    const matches = [];
    const tfGroupMatchs = [];

    const tfGroups = originalTourney.TFGroups.items.map((tfGroup) => {
      const TFGroupMatches = tfGroup.TFGroupMatches;
      tfGroupMatchs.push(...TFGroupMatches.items.map((tfGroupmatch) => {
        const match = tfGroupmatch.Matches;
        matches.push(...match.items.map((match) => {
          const matchParty = match.MatchParties;
          const MTreferee = match.MatchesToReferees;
          matchesParties.push(...matchParty.items.map((matchP) => {
            delete matchP.team;
            return { ...matchP };
          }));
          matchesToReferees.push(...MTreferee.items.map((mTR) => {
            delete mTR.contactID;
            return { ...mTR };
          }));
          delete match.MatchParties;
          delete match.MatchesToReferees;
          delete match.Field;
          return {
            ...match
          };
        }));
        delete tfGroupmatch.Matches;
        return {
          ...tfGroupmatch
        };
      }));
      delete tfGroup.TFGroupMatches;

      return {
        ...tfGroup
      };
    });
    const deleteMatchesToRefereesRelationships = matchesToReferees.map((MTreferee) => getUpdatedDeleteInput(MTreferee, process.env.API_WEPLAYMAIN_MATCHESTOREFEREESTABLE_NAME));

    if (changedFormat === true) {
      atomicTourney.TransactItems.push(...deleteMatchesToRefereesRelationships);
      atomicTourney.TransactItems.push(...matchesParties.map((matchParty) => getUpdatedDeleteInput(matchParty, process.env.API_WEPLAYMAIN_MATCHPARTIESTABLE_NAME)));
      atomicTourney.TransactItems.push(...matches.map((match) => getUpdatedDeleteInput(match, process.env.API_WEPLAYMAIN_MATCHESTABLE_NAME)));
      atomicTourney.TransactItems.push(...tfGroupMatchs.map((tfGroupMatch) => getUpdatedDeleteInput(tfGroupMatch, process.env.API_WEPLAYMAIN_TFGROUPMATCHESTABLE_NAME)));
      atomicTourney.TransactItems.push(...tfGroups.map((group) => getUpdatedDeleteInput(group, process.env.API_WEPLAYMAIN_TFGROUPSTABLE_NAME)));
    } else if (fieldDetailsChanged === true) {
      atomicTourney.TransactItems.push(...deleteMatchesToRefereesRelationships);
    }
  };

  const addItemsToTransaction = (items, tableName, typename) => {
    const primaryKeys = new Set();
    items.forEach(item => {
      const {
        id, _version: version, _deleted,
        _lastChangedAt, updatedAt,
        __typename, owner, ...otherKeys
      } = item;
      const _version = isNaN(Number(version ?? 0)) ? 1 : Number(version ?? 0) + 1;

      const primaryKey = item.id; // Assuming 'id' is the primary key

      if (primaryKeys.has(primaryKey)) {
        throw new Error(`Duplicate primary key detected: ${primaryKey} at type: ${typename}`);
      }
      primaryKeys.add(primaryKey);

      otherKeys.businessesID = businessId;

      if (_version === 1 || typename === 'MatchesToReferees') {
        otherKeys.createdAt = new Date().toISOString();
      }

      const updateExpKeys = Object.keys(otherKeys).map((key) => (`${key} = :${key}`));
      const updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, #deleted = :deleted, ${_version === 1 || typename === 'MatchesToReferees' ? '#owner = :owner, ' : ''} ${updateExpKeys.join(', ')}`;
      const expAttrValues = {
        ':updatedAt': new Date().toISOString(),
        ':lastChangedAt': Math.floor(Date.now()),
        ':version': _version,
        ':deleted': false
      };

      const expAttrNames = {
        '#lastChangedAt': '_lastChangedAt',
        '#version': '_version',
        '#deleted': '_deleted'
      };

      if (_version === 1 || typename === 'MatchesToReferees') {
        expAttrValues[':createdAt'] = new Date().toISOString();
        expAttrValues[':owner'] = ownerId;
        item.createdAt = new Date().toISOString();
        item.owner = ownerId;
        expAttrNames['#owner'] = 'owner';
      }

      Object.keys(otherKeys).forEach((updateInfoKey) => {
        expAttrValues[`:${updateInfoKey}`] = otherKeys[updateInfoKey];
      });

      const ConditionExpression = '(attribute_exists(id) AND businessesID = :businessesID) OR attribute_not_exists(id)';

      atomicTourney.TransactItems.push({
        Update: {
          Item: {
            __typename: typename,
            _version,
            _lastChangedAt: new Date().getTime(),
            ...item
          },
          Key: {
            id
          },
          UpdateExpression: updateExp,
          ExpressionAttributeNames: expAttrNames,
          ExpressionAttributeValues: expAttrValues,
          TableName: tableName,
          ConditionExpression
        }
      });
    });
  };

  addItemsToTransaction(tournamentRulesVariables, process.env.API_WEPLAYMAIN_TOURNAMENTRULESVARIABLESTABLE_NAME, 'TournamentRulesVariables');
  addItemsToTransaction(groups, process.env.API_WEPLAYMAIN_TFGROUPSTABLE_NAME, 'TFGroups');
  addItemsToTransaction(matchesToReferees, process.env.API_WEPLAYMAIN_MATCHESTOREFEREESTABLE_NAME, 'MatchesToReferees');
  addItemsToTransaction(matchesParties, process.env.API_WEPLAYMAIN_MATCHPARTIESTABLE_NAME, 'MatchParties');
  addItemsToTransaction(matches, process.env.API_WEPLAYMAIN_MATCHESTABLE_NAME, 'Matches');
  addItemsToTransaction(tfGroupMatchs, process.env.API_WEPLAYMAIN_TFGROUPMATCHESTABLE_NAME, 'TournamentRulesVariables');

  const chunkSize = 99;
  const chuncksOfSeedCommand = [];

  console.log('All Transactions:::', JSON.stringify(atomicTourney.TransactItems));

  for (let i = 0; i < atomicTourney.TransactItems.length; i += chunkSize) {
    const chunk = atomicTourney.TransactItems.slice(i, i + chunkSize);
    chuncksOfSeedCommand.push({
      TransactItems: chunk
    });
  }
  const atomicRequests = chuncksOfSeedCommand.map((write) => {
    return new TransactWriteCommand(write);
  });
  return { atomicRequests };
};
