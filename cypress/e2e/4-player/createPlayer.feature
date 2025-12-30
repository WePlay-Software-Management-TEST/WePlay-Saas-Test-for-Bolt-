Feature: Facility Create Player

  Business Wants to Create Profile

  Scenario: Admin creates profile successfully
    Given Admin logged in
    When Admin navigates to create profile screen
    Then Fill out profile form
    Then Admin should see Profile info screen
    And Email should be sent to the newly created player
    And Profile info screen view the correct data
    And Team Roster should Show the correct Teams

  
  Scenario: Admin tries to create profile with invalid information
    Given Admin logged in
    When Admin navigates to create profile screen
    When Admin Fill out profile form with invalid information
    Then Admin sees a meaningful error message

  Scenario: Admin tries to create profile but cancels half way there
    Given Admin logged in
    When Admin navigates to create profile screen
    And Admin Fill out profile form with invalid information
    Then Admin Cancels the process
