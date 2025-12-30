Feature: Facility Edit Profile
  
  Facility Manager wants to edit Profile.
  Scenario: Facility Manager wants to edit profile details
    Given Facility has registered profiles ''
    When Manager wants to edit profile details
    And Manager confirms new profile details
    Then System should show success message
    Then System should save new profile details

  Scenario: Facility Manager Cancel edit process
    Given Facility has registered profiles ''
    When Manager wants to edit profile details
    And Manager cancel Edit process
    Then System should show toast message

  Scenario: Facility Manager wants to delete player from team
    Given Facility has registered profiles 'Roster'
    And Player is Associated with at least one team 
    When Manager removes a player from a team
    Then System should show the remaining players correctly

    