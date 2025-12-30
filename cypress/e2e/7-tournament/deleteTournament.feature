Feature: Facility Deletes a Tournament
  
  Facility Manager wants to Delete a tournament.

  Scenario: Facility Manager wants to delete a tournament
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament
    And Manager save tournament
    And Manager wants to delete a tournament
    When Manager confirms deletion of tournament
    Then System should not show that tournament

  Scenario: Facility Manager wants to delete a tournament cancel
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament
    And Manager save tournament
    And Manager wants to delete a tournament
    When Manager cancel deletion of tournament
    Then System should return to tournament form