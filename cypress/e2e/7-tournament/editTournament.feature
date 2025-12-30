Feature: Facility Creates A Tournament
  
  Facility Manager wants to create a tournament.

  Scenario: Facility creates a tournament
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament
    And Manager save tournament
    And Manager update tournament
    When Manager save tournament
    Then System should show correct results