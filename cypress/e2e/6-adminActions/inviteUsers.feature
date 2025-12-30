Feature: Invite users to his Business.
  
  Facility Manager wants to invite User 

  Scenario: Manager wants to invite user
    Given Manager have a business in WePlay
    When Manager attempts to invite users as <role>
    Then Manager submits invite
    Then Manager should get success message for <role>
    And User invite should receive email
    When User clicks on invite link
    Then User should be re-directed to WePlay.
    And User create his own user under the invitee business as <role>.
    Then User should be able to access WePlay
    And Manager should be able to see this new user under his business

    Examples:
    | role |
    | Admin |
    | Referee |

  Scenario: Manager enters wrong emails 
    Given Manager have a business in WePlay
    When Manager attempts to invite invalid emails
    Then System should show correct error message.

  Scenario: Manager wants to reinvite a user 
    Given Manager have a business in WePlay
    And User is already have invitation sent
    When Manager attempts to invite user
    Then System should show correct invite error message

    