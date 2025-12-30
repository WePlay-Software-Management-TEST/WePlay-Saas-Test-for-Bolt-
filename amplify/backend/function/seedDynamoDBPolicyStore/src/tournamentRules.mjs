export const tournamentRulesFixtures = [{
  Rule: 'Each Team Play with Each Other {teamPlayWithEach}',
  id: 'a0fc5b97-197e-4ea6-a1a8-aa41e4d77b1a',
  Description: 'How many times does a team plays in a RoundRobin'
},
{
  Rule: 'Each Group Teams {groupTeams}',
  id: '8e382f33-66f3-4b86-aafd-17a21379607e',
  Description: 'How many teams does a group includes'
},
{
  Rule: 'Qualifies from each Group {placementQualifier}',
  id: '655981e0-559f-4434-8b47-e08a947618b2',
  Description: 'Who Qualifies from each group to move on'
},
{
  Rule: 'Number Of fields used in tournament is {numOfFields}',
  id: '88651982-862f-4ee3-bb2e-588add5fbfd6',
  Description: 'Number of fields used in a tournament'
},
{
  Rule: 'Tournament Start Time {startTime}',
  id: '4495f7e9-867e-40a8-9a20-eb791ff91001',
  Description: 'Tournament Start Time'
},
{
  Rule: 'Tournament Start Date {startDate}',
  id: '9c542448-818b-44f6-807d-28ef431642cd',
  Description: 'Tournament Start Date'
},
{
  Rule: 'Tournament End Time {endTime}',
  id: 'b41fc823-e804-47cf-980d-4d5fd20d304e',
  Description: 'Tournament End Time'
},
{
  Rule: 'Tournament End Date {finishDate}',
  id: 'f6e6b93b-d1e3-440b-84c8-ff6d9673e06b',
  Description: 'Tournament End Date'
},
{
  Rule: 'Daily Matches By Field {dailyMatchesByField}',
  id: 'b49aaa8e-1daf-449a-9690-426dac6b5849',
  Description: 'Tournament Daily matches in all fields'
},
{
  Rule: 'Match Duration {matchesDuration}',
  id: '45c478c6-7578-4747-add6-4ee35c0ba4f6',
  Description: 'Match Duration'
},
{
  Rule: 'Days of Matches {daysOfMatches}',
  id: 'f7247d21-b6f0-4c78-aae7-50251d3a6ebc',
  Description: 'Days of matches in tournament'
},
{
  Rule: 'Daily Match By Field {field} are {matchesPerDay}',
  id: 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6',
  Description: 'Daily Match by certain Field'
},
{
  Rule: 'Total number of Teams is {numOfTeams}',
  id: 'f2813385-2dfb-4521-9a32-3f0d9ed4e39a',
  Description: 'Number of teams'
},
{
  Rule: 'tourney belongs to {division}',
  id: '72ac6a21-e899-4be0-b2ea-019c635b2adb',
  Description: 'Divison of this tourney'
}
];

export const tftToSportsFixtures = [{
  id: 'fe6ab43b-9b5f-4b3f-b7d9-481d2340ee31',
  SportType: 'SOCCER',
  TournamentFormatType: ['ROUNDROBIN', 'SINGLE_ELIMINATION']
}];

export const tRulesToTFormatFixtures = [
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'a0fc5b97-197e-4ea6-a1a8-aa41e4d77b1a',
    id: '48895091-aeb4-49bd-b547-544d3293b819'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '8e382f33-66f3-4b86-aafd-17a21379607e',
    id: '2cf0cbea-98d1-445d-a9bf-8dde7abe0b38'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '655981e0-559f-4434-8b47-e08a947618b2',
    id: '318bf46c-b5b8-48ac-ae13-7e2d3ff0020f'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '88651982-862f-4ee3-bb2e-588add5fbfd6',
    id: 'd705424c-73af-4c6f-b075-de4d8e9f97fa'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '4495f7e9-867e-40a8-9a20-eb791ff91001',
    id: '1c3e1837-265f-412f-995b-b67e8919625b'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '9c542448-818b-44f6-807d-28ef431642cd',
    id: '86a75ade-2f82-498b-ad77-0a46b1b0eb61'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'b41fc823-e804-47cf-980d-4d5fd20d304e',
    id: '89cb690e-e520-41a5-9af0-308beb7a0288'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'f6e6b93b-d1e3-440b-84c8-ff6d9673e06b',
    id: 'd4aa1cf1-d764-44d5-8801-46d48ce3c4fb'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'b49aaa8e-1daf-449a-9690-426dac6b5849',
    id: '06a66d0f-2ab9-408a-84e2-c3c31666163c'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '45c478c6-7578-4747-add6-4ee35c0ba4f6',
    id: '3551f660-b249-4e46-8874-1b0bd6157741'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'f7247d21-b6f0-4c78-aae7-50251d3a6ebc',
    id: '06b8e4a3-a813-483a-a6d0-7a56d6ed5a6f'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6',
    id: 'e3482c35-68b3-4e45-afba-4bc75fb6ac80'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: '88651982-862f-4ee3-bb2e-588add5fbfd6',
    id: '3035533e-ee7e-4e11-a0ef-7df231b32aaa'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: '4495f7e9-867e-40a8-9a20-eb791ff91001',
    id: 'ed2c0558-70a5-4840-84ba-dc5ef76a3efe'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: '9c542448-818b-44f6-807d-28ef431642cd',
    id: '420c4e28-9576-4de1-a7e3-bc7e16a9c0f5'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'b41fc823-e804-47cf-980d-4d5fd20d304e',
    id: '54dea33b-af19-48d9-8971-f6609dc93d47'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'f6e6b93b-d1e3-440b-84c8-ff6d9673e06b',
    id: '3dfc12aa-a429-4b9e-ac9c-1c08213dcb0e'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'b49aaa8e-1daf-449a-9690-426dac6b5849',
    id: '7bd5e2b8-eb3c-4378-b019-c77cccf39da3'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: '45c478c6-7578-4747-add6-4ee35c0ba4f6',
    id: '4f806107-1348-4312-8d49-75fa7bd77c0e'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'f7247d21-b6f0-4c78-aae7-50251d3a6ebc',
    id: 'c5fbc248-02fc-456a-8fb3-9a49b80bb3f2'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6',
    id: '3da88ccd-3fc5-4874-8de4-e311cc5967b4'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: 'f2813385-2dfb-4521-9a32-3f0d9ed4e39a',
    id: '2f6fa2a7-ebb0-4e03-ae32-ab44782098b2'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: 'f2813385-2dfb-4521-9a32-3f0d9ed4e39a',
    id: 'f977cfac-6dbd-4532-a88d-0e18232c1bad'
  },
  {
    TournamentFormatType: 'ROUNDROBIN',
    ruleID: '72ac6a21-e899-4be0-b2ea-019c635b2adb',
    id: '98a1408d-cdf6-4bd6-9aec-c77b88016f3c'
  },
  {
    TournamentFormatType: 'SINGLE_ELIMINATION',
    ruleID: '72ac6a21-e899-4be0-b2ea-019c635b2adb',
    id: 'd9a4028a-ba0d-47e6-8c59-c91282fb4c44'
  }
];
