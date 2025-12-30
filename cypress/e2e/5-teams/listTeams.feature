Feature: Facility List all teams
  
  Facility Manager wants to list all teams associated with it's facility.

  Scenario: Manager Lists all teams
    Given Facility has registered teams with captains And Team Photo
    When Manager attempts to view teams
    Then All teams associated with this facility will show correclty

  Scenario: Facility have no registered teams
    Given Facility has no registered teams
    Then Empty welcome screen should appear

  Scenario: Facility Manager wants to filter teams based on State
    Given Facility has registered teams
    When Manager filters Teams based on 'state'
    Then System should show results with "California"

  Scenario: Facility Manager wants to filter teams based on City
    Given Facility has registered teams
    When Manager filters Teams based on 'city'
    Then System should show results with "Pasadena"

  Scenario: Facility Manager wants to filter teams based on County
    Given Facility has registered teams
    When Manager filters Teams based on 'county'
    Then System should show results with "Los Angeles County"

  Scenario: Facility Manager filter returns empty
    Given Facility has registered teams
    When Manager filters Teams based on 'state'
    Then System should not show results with "Nevada"

