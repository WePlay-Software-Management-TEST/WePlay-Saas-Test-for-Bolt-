Feature: Facility Edits a Team
  
  Facility Manager wants to Edit a team.

  Scenario: Facility Manager wants to add player to team from dropdown
    Given Facility has valid credentials
    And Facility have registered teams
    When Manager wants to add player from dropdown
    Then System should add Player to team Roster
    And View new changes instantly
    
  Scenario: Facility Manager wants to Edit a team
    Given Facility has valid credentials
    And Facility have registered teams
    When manager wants to edit a team
    And manager confirms new changes of team
    Then System should show a success Message
    And System should correct results

  Scenario: Facility Manager cancels Edit process
    Given Facility has valid credentials
    And Facility have registered teams
    When manager wants to edit a team
    And manager cancels new changes of team
    Then System should show a failure Message

  Scenario: Facility Manager cancels Edit process mid proccessing
    Given Facility has valid credentials
    And Facility have registered teams
    When manager wants to edit a team
    And manager cancels new changes of team mid request
    Then System should show act as though edits have been cancelled