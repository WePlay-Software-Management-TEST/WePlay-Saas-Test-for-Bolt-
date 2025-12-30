/**
 * @Function Gets Owner, sub and username from AppSync Event.
 * @param { Object } event - AppSync Event.
 * @param { string } expectedEvent - Expected Event, Can be Mutation or Query, default to 'Mutation'
 * @returns { Object } - Contains Owner, Sub And Username.
 */
export function getOwnerId (event, expectedEvent = 'Mutation') {
  const { typeName } = event;

  if (!typeName || typeName !== expectedEvent || typeName === '') {
    throw new Error(`typeName is ${typeName}, it should be ${expectedEvent}`);
  };
  console.log(event?.identity?.resolverContext);
  const { businessId, ownerId } = event?.identity?.resolverContext;
  console.log(ownerId);
  return { businessId, ownerId };
};
