Feature: Facility Delete Profile
  
  Facility Manager wants to delete player.

  Scenario: Facility Manager wants to delete a profile
    Given Facility has registered profiles  
    When Facility Manager wants to remove a player
    And Confirms resuming the delete process
    Then System should stop showing that profile

  Scenario: Facility Manager doesn't want to delete a profile
    Given Facility has registered profiles  
    When Facility Manager wants to remove a player
    And cancels the delete process
    Then System should still show that profile

  