Feature: Facility List all tournaments
  
  Facility Manager wants to list all tournaments associated with it's facility.

  
  Scenario: Manager empty Lists all tournaments
    Given Facility Already Logged in
    When Manager attempts to view tournaments
    Then Display empty tournaments page
  Scenario: Manager Lists all tournaments
    Given Facility Already Logged in
    And Facility have registered teams
    And Manager create tournament
    And Manager save tournament
    When Manager attempts to view tournaments
    Then Display all tournaments

