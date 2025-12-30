Feature: Business Login Feature

  Business Wants to Login to WePlay.

  Scenario: A Successful Business Login
    Given Business Has Valid Credentials
    When Business Owner attempts to access WePlay
    Then Business can successfully login to WePlay

  Scenario: A Unsuccessful Business Login
    Given Business has invalid credentials
    When Business Owner attempts to access WePlay
    Then Business can't access WePlay
    And sees a meaningful error message

  Scenario: Business tries to login as unconfirmed user
    Given Business have unconfirmed Credentials
    When Business Owner attempts to access WePlay
    Then "Please confirm email" screen should appear

  Scenario: Business tries to login multiple times with invalid credentials 
    Given Business has invalid credentials
    When Business Owner attempts to access WePlay multiple times
    Then System locks out this user