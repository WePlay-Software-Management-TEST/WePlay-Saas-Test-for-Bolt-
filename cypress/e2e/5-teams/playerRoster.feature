Feature: Player roster for a team
  
  Facility Manager wants to list all players associated with a certain team.

  Scenario: Manager wants to see a team roster
    Given Facility has registered teams with players associated
    When Manager attempts to view team details
    Then Roster associated with that team should show full players information

  Scenario: Facility wants to remove player from team roster
    Given Facility has registered teams with players associated
    And Manager attempts to view team details
    When Manager want to remove player from team roster
    Then Should Show a success Message
    
    