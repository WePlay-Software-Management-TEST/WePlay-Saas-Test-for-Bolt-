import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

export function createTourney (input, businessesID, ownerId) {
  const {
    createTournament, tournamentRulesVariables, groups,
    matchesToReferees, matchesParties, matches, tfGroupMatchs
  } = input;
  const tourneyVersion = isNaN(Number(createTournament?._version ?? 0)) ? 1 : Number(createTournament?._version ?? 0) + 1;

  const defaultValuesForCreation = {
    _lastChangedAt: new Date().getTime(),
    updatedAt: new Date().toISOString(),
    businessesID,
    owner: ownerId,
    createdAt: new Date().toISOString()
  };

  const atomicTourney = {
    TransactItems: [
      {
        Put: {
          Item: {
            __typename: 'Tournaments',
            _version: tourneyVersion,
            ...defaultValuesForCreation,
            ...createTournament
          },
          TableName: process.env.API_WEPLAYMAIN_TOURNAMENTSTABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)'
        }
      }
    ]
  };

  const addItemsToTransaction = (items, tableName, typename) => {
    const primaryKeys = new Set();
    items.forEach(item => {
      const _version = isNaN(Number(item?._version ?? 0)) ? 1 : Number(item?._version ?? 0) + 1;
      const primaryKey = item.id;
      if (primaryKeys.has(primaryKey)) {
        throw new Error(`Duplicate primary key detected: ${primaryKey} at type: ${typename}`);
      }

      primaryKeys.add(primaryKey);

      atomicTourney.TransactItems.push({
        Put: {
          Item: {
            __typename: typename,
            _version,
            ...defaultValuesForCreation,
            ...item
          },
          TableName: tableName,
          ConditionExpression: 'attribute_not_exists(id)'
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
}
