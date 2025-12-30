Feature: Facility Deletes a Team
  
  Facility Manager wants to Delete a team.

  Scenario: Facility Manager wants to delete a team
    Given Facility has valid credentials
    And Facility have registered teams
    When manager wants to delete a team
    And manager confirms deletion of team
    Then System should show a success Message
    And System should not show that team

  Scenario: Facility Manager cancel delete
    Given Facility has valid credentials
    And Facility have registered teams
    When manager wants to delete a team
    And manager cancels deletion of team
    Then System should show that team