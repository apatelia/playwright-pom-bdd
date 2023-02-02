@products
Feature: Products

  @add_to_cart
  Scenario: User should be able to add a product to the cart
    Given the user is logged in and on Products page
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart item badge must show correct count of 1

  @remove_from_cart
  Scenario: User should be able to remove the product from the cart
    Given the user is logged in and on Products page
    When the user adds "Sauce Labs Bike Light" to the cart
    Then the user should be able to remove "Sauce Labs Bike Light" from the cart, using the `Remove` button
    Then the cart item badge must not be displayed

  @logout
  Scenario: User should be able to log out
    Given the user is logged in and on Products page
    When the user clicks Log out from hamburger menu
    Then the user must not be logged out
