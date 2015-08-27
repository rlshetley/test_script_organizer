Feature: Test Result API

  Background:
    Given a url "/api/testresults/"

  Scenario: Create a test result
    Given a TestResult with properties
      | property | value       |
      | name     | test        |
      | actualResult     | test        |
      | comments     | test        |
      | isPass     | False        |
    And a TestResult with a TestStep relationship using testStep
    And a TestResult with a TestSession relationship using testSession
    When the TestResult is created
    Then a message with HTTP code 201 is received
    And the TestResult is in the system

    Scenario Outline: Update a test result
    Given a TestResult with properties
      | property | value       |
      | name     | test        |
      | actualResult     | test        |
      | comments     | test        |
      | isPass     | False        |
    And a TestResult with a TestStep relationship using testStep
    And a TestResult with a TestSession relationship using testSession
    And the TestResult is created
    When the TestResult <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the TestResult is in the system

    Examples:
    | property| value|
    | name    | test345 |


    Scenario: Delete a test result
    Given a TestResult with properties
      | property | value       |
      | name     | test        |
      | actualResult     | test        |
      | comments     | test        |
      | isPass     | False        |
    And a TestResult with a TestStep relationship using testStep
    And a TestResult with a TestSession relationship using testSession
    And the TestResult is created
    When the TestResult is deleted
    Then a message with HTTP code 204 is received
    And the TestResult is not in the system
