/**
 * Returns ExpressionAttributeValues & UpdateExpression attributes for DynamoDB Commands.
 * Mainly it maps the object to it's corrsponding element in the DynamoDB model.
 * Also have few exception for "Position & State" attributes.
 *
 * @param {Object} dataModel  - The input event containing keys and values to be updated.
 * @returns {Object} An object containing updated keys, update expression, and attribute values.
 */

export function getDynamoDbExpressions (dataModel, businessesID) {
  const { id, _version, State, Position, ...keys } = dataModel;

  if (businessesID !== undefined && businessesID !== null && businessesID !== '') {
    keys.businessesID = businessesID;
  };

  const updateExpKeys = Object.keys(keys).map((key) => (`${key} = :${key}`));
  let updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, ${updateExpKeys.join(', ')}`;
  const expAttrValues = {
    ':updatedAt': new Date().toISOString(),
    ':lastChangedAt': Math.floor(Date.now()),
    ':version': isNaN(Number(_version ?? 0)) ? 1 : Number(_version ?? 0) + 1
  };

  Object.keys(keys).forEach((updateInfoKey) => {
    expAttrValues[`:${updateInfoKey}`] = keys[updateInfoKey];
  });

  if (State !== undefined) {
    updateExp = `${updateExp}, #State = :state`;
    expAttrValues[':state'] = State;
  }

  if (Position !== undefined) {
    updateExp = `${updateExp}, #Position = :position`;
    expAttrValues[':position'] = Position;
  };

  return {
    updateExpKeys,
    updateExp,
    expAttrValues
  };
};
