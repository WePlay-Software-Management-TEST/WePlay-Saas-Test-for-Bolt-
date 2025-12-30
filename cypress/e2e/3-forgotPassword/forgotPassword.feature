Feature: Business Forgot Password Feature

  Business Wants to Reset his Password

  Scenario: Business reset password successfully
    Given Business Has Valid Credentials
    When Business Owner attempts to reset password
    Then Business can successfully login to WePlay

  Scenario: Business reset password Unsuccessfully
    Given Business has invalid Credentials
    When Business Owner attempts to reset password
    Then Business cant reset password
    And Meaningful error message should appear

  Scenario: Business remembers old password after sending reset request
    Given Business Has Valid Credentials
    When Business Owner attempts to reset password
    When Business remember old password
    Then Business can access weplay using old password
