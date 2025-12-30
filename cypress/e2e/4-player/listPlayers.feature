Feature: Facility List Profiles
  
  Facility Manager wants to list players.

  Scenario: Facility has no registered profiles
    Given Facility has no registered profiles  
    Then Empty welcome screen should appear

  Scenario: Manager lists all the profiles that are in the system
    Given Facility has registered some profiles    
    When Manager attempts to view facility profiles
    Then Profiles associated with that facility should appear

  Scenario: Manager wants to filter profiles
    Given Facility has registered some profiles    
    Then Manager attempts to view facility profiles
    When Manager filters profiles table
    Then System should show correct results
    