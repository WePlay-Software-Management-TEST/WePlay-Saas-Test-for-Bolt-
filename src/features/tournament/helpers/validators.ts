/**
 * Checks if a given number is a power of two.
 *
 * @param num The number to be checked.
 * @returns True if the number is a power of two, false otherwise.
 */
export function isPowerOfTwo (num: number): boolean {
  return !(Math.log2(num) % 1 === 0);
};

/**
 * Check if the number of teams can be spread around groups that will have a number of teams
 * We checking that our groups should be a power of 2 number.
 * We don't implement BYE matches.
 *
 * @param numOfTeams The total number of teams.
 * @param eachGroupTeams The number of teams in each group.
 * @returns True if the number of teams is divisible by the number of teams in each group, false otherwise.
 */
export function isTeamsSpreadableByGroups (numOfTeams: number, eachGroupTeams: number): boolean {
  if (numOfTeams === null) return false;
  if (eachGroupTeams === null) return false;

  const numOfGroups = numOfTeams / eachGroupTeams;
  return isPowerOfTwo(numOfGroups);
};
