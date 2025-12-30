Feature: All teams associated with player from player view
  
  Facility Manager wants to list all teams associated with a certain player.

  Scenario: Facility Manager want to add a player to multiple teams
    Given Facility has registered player with no teams
    When Manager visits player view
    Then Manger want to add player to a team as <role>
    Then Manager should see list of teams associated with player
    And System should show correct player role for each team in player view

    Examples:
    | role |
    | Captain |
    | Player |

  Scenario: Manager wants to see all teams a player is a member of
    Given Facility has registered player with several teams
    When Manager navigates to player page
    Then He can see all the teams the player is a member of

  Scenario: Facility wants to remove a player from a team
    Given Facility has registered player with several teams
    And Manager navigates to player page
    When Manager attempts to remove a team from the list of teams
    Then sees a success message