Feature: Manager wants to remove user from business
  
  Facility Manager wants to remove user from business

  Scenario: Manager wants remove user from business
    Given Business have multiple users associated with it.
    When Manager attempts to remove user from business
    Then Success message should show.
    And User can not access his account.

  Scenario: Admin want to remove himself
    Given Admin is already in a business.
    When Manager attempts to remove himself
    Then System should not allow him
    