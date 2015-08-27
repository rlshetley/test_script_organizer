Feature: Test API

  Background:
    Given a url "/api/tests/"

  Scenario: Create a test
    Given a Test with properties
      | property | value |
      | name     | test  |
    And a Test with a TestSuite relationship using testsuite
    When the Test is created
    Then a message with HTTP code 201 is received
    And the Test is in the system

  Scenario Outline: Update a test
    Given a Test with properties
      | property | value |
      | name     | test  |
    And a Test with a TestSuite relationship using testsuite
    And the Test is created
    When the Test <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the Test is in the system

    Examples:
    | property| value|
    | name    | test345 |

  Scenario: Delete a test
    Given a Test with properties
      | property | value |
      | name     | test  |
    And a Test with a TestSuite relationship using testsuite
    And the Test is created
    When the Test is deleted
    Then a message with HTTP code 204 is received
    And the Test is not in the system
