Feature: Business Registration Feature

  Business Wants to register with WePlay.

  Scenario: A Successful Business Registration
    Given Business Have a Valid Email Address
    When Business Registers With Valid Business Information
    Then New Business Account Have Been Created

  Scenario: Business With Invalid Email Address
    Given Business have an Invalid Email Address
    When Business tries to registers With Invalid Business Email
    Then Validation Error "Invalid Email Format" Appears
  
  Scenario: Business did not recieve first verification email
    Given Business Have a Valid Email Address
    When Business tries to resend verification email
    Then Business resume registration 

  Scenario: Business with Invalid Password
    Given Business Have a Valid Email Address
    And Business have confirmed his Email Address
    When Business have entered invalid Password
    Then Validation Error "Invalid Password" Appears

  Scenario: Business clicks on resend email after validating email
    Given Business Have a Valid Email Address
    And Business have already confirmed his Email Address
    When Business resend confirmation email
    Then "Account have been confirmed error" should Appear


  Scenario: Business clicks on invalid email validation link
    Given Business Have a Valid Email Address
    And Business have resent confirmation email
    When Business clicks on the invalid confirmation email
    Then Business can't resume registration

  Scenario: Business enters invalid address location
    Given Business have reached Business info step
    When Business enter invalid mailing address
    Then Address error message should appear

  Scenario: Business enters mailing address manually
    Given Business have reached Business info step
    When Business tries to enter mailing address manually
    Then New Business Account Have Been Created