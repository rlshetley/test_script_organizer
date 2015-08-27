Feature: Test Step API

  Background:
    Given a url "/api/teststeps/"

  Scenario: Create a test step
    Given a TestStep with properties
      | property | value       |
      | name     | test        |
      | action     | test        |
      | description     | test        |
      | expectedResult     | test        |
      | stepNumber     | 1        |
    And a TestStep with a Test relationship using test
    When the TestStep is created
    Then a message with HTTP code 201 is received
    And the TestStep is in the system

    Scenario Outline: Update a test step
      Given a TestStep with properties
        | property | value       |
        | name     | test        |
        | action     | test        |
        | description     | test        |
        | expectedResult     | test        |
        | stepNumber     | 1        |
      And a TestStep with a Test relationship using test
    And the TestStep is created
    When the TestStep <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the TestStep is in the system

    Examples:
    | property| value|
    | name    | test345 |


    Scenario: Delete a test step
      Given a TestStep with properties
        | property | value       |
        | name     | test        |
        | action     | test        |
        | description     | test        |
        | expectedResult     | test        |
        | stepNumber     | 1        |
      And a TestStep with a Test relationship using test
    And the TestStep is created
    When the TestStep is deleted
    Then a message with HTTP code 204 is received
    And the TestStep is not in the system
