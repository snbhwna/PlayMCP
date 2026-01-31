Feature: SauceDemo Login Functionality
  As a user of SauceDemo
  I want to be able to login with different user types
  So that I can access the application based on my permissions

  Background:
    Given I am on the SauceDemo login page

  @smoke @positive
  Scenario: Valid Login - Standard User
    When I login with valid standard user credentials
    Then I should be redirected to the inventory page
    And I should see the page title as "Products"
    And I should see 6 inventory items
    And the logout option should be available in the menu

  @smoke @negative
  Scenario: Login with Locked Out User
    When I login with locked out user credentials
    Then I should remain on the login page
    And I should see an error message containing "Epic sadface: Sorry, this user has been locked out."
    And the inventory page should not be visible
    And the login form should still be present

  @negative
  Scenario: Login with Invalid Username
    When I login with username "invalid_user" and password "secret_sauce"
    Then I should see an error message containing "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @negative
  Scenario: Login with Empty Username
    When I login with username "" and password "secret_sauce"
    Then I should see an error message containing "Epic sadface: Username is required"

  @negative
  Scenario: Login with Empty Password
    When I login with username "standard_user" and password ""
    Then I should see an error message containing "Epic sadface: Password is required"

  @positive
  Scenario Outline: Login with Different User Types
    When I login with username "<username>" and password "<password>"
    Then I should be redirected to the inventory page
    And I should see the page title as "Products"

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |
