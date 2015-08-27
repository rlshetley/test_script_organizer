Feature: Test Event API

  Background:
    Given a url "/api/testevents/"

  Scenario: Create a test event
    Given a TestEvent with properties
      | property | value       |
      | name     | test        |
    And a TestEvent with a TestSuite relationship using testSuite
    When the TestEvent is created
    Then a message with HTTP code 201 is received
    And the TestEvent is in the system

  Scenario Outline: Update a test event
    Given a TestEvent with properties
      | property | value |
      | name     | test  |
    And a TestEvent with a TestSuite relationship using testSuite
    And the TestEvent is created
    When the TestEvent <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the TestEvent is in the system

    Examples:
    | property| value|
    | name    | test345 |

  Scenario: Delete a test event
    Given a TestEvent with properties
      | property | value |
      | name     | test  |
    And a TestEvent with a TestSuite relationship using testSuite
    And the TestEvent is created
    When the TestEvent is deleted
    Then a message with HTTP code 204 is received
    And the TestEvent is not in the system

  Scenario: Get test events for project
    Given a TestEvent with properties
      | property | value |
      | name     | test  |
    And a TestEvent with a TestSuite relationship using testSuite
    And the TestEvent is created
    And a TestEvent with properties
      | property | value |
      | name     | test2  |
    And a TestEvent with a TestSuite relationship using testSuite
    And the TestEvent is created
    When the TestEvent resource is queried with project set to a Project
    Then a message with HTTP code 200 is received
    And the results contain the TestEvent
