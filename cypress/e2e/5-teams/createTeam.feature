Feature: Facility Creates A Team
  
  Facility Manager wants to create a team.

  Scenario: Facility creates a minimal team
    Given Facility Already Logged in
    Given Facility has no registered players
    When manager creates a minimal team
    And Manager Saves team
    Then System should show a success Message
    Then System should show correct results

  Scenario: Facility Cancel team creation
    Given Facility Already Logged in
    When manager creates a minimal team
    And tries to cancel the team creation
    Then Team creation should be cancelled successfully
  
  Scenario: Facility Create A team
    Given Facility Already Logged in
    And Manager Create Player
    When Manager Create Team
    And Manager Saves team
    Then System should show a success Message
    Then System should show correct results
    And Players Added to the Team should get notified