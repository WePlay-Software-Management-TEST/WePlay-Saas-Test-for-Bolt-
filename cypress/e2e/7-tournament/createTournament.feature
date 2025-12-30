Feature: Facility Creates A Tournament
  
  Facility Manager wants to create a tournament.

  Scenario: Facility creates a tournament singleElimination
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament singleElimination
    When Manager save tournament
    Then System should show the singleElimination tournament

  Scenario: Facility creates a tournament roundrobin
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament roundrobin
    When Manager save tournament
    Then System should show the roundrobin tournament