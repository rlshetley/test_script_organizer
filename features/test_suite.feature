Feature: Test Suite API

  Background:
    Given a url "/api/testsuites/"

  Scenario: Create a test suite
    Given a TestSuite with properties
      | property | value |
      | name     | test  |
    And a TestSuite with a Project relationship using project_id
    When the TestSuite is created
    Then a message with HTTP code 201 is received
    And the TestSuite is in the system

  Scenario Outline: Update a test suite
    Given a TestSuite with properties
      | property | value |
      | name     | test  |
    And a TestSuite with a Project relationship using project_id
    And the TestSuite is created
    When the TestSuite <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the TestSuite is in the system

    Examples:
    | property| value|
    | name    | test345 |

  Scenario: Delete a test suite
    Given a TestSuite with properties
      | property | value |
      | name     | test  |
    And a TestSuite with a Project relationship using project_id
    And the TestSuite is created
    When the TestSuite is deleted
    Then a message with HTTP code 204 is received
    And the TestSuite is not in the system

  Scenario: Get test suites for project
    Given a TestSuite with properties
      | property | value |
      | name     | test  |
    And a TestSuite with a Project relationship using project_id
    And the TestSuite is created
    And a TestSuite with properties
      | property | value |
      | name     | test2  |
    And a TestSuite with a Project relationship using project_id
    And the TestSuite is created
    When the TestSuite resource is queried with project set to a Project
    Then a message with HTTP code 200 is received
    And the results contain the TestSuite
