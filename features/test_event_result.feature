Feature: Test Event Results API

  Background:
    Given a url "/api/testeventresults/"

  Scenario: Create a test event result
    Given a TestEventResult with properties
      | property | value       |
    And a TestEventResult with a TestEvent relationship using testEvent
    And a TestEventResult with a TestSession relationship using testSession
    When the TestEventResult is created
    Then a message with HTTP code 201 is received
    And the TestEventResult is in the system

  Scenario: Delete a test event result
    Given a TestEventResult with properties
      | property | value       |
    And a TestEventResult with a TestEvent relationship using testEvent
    And a TestEventResult with a TestSession relationship using testSession
    And the TestEventResult is created
    When the TestEventResult is deleted
    Then a message with HTTP code 204 is received
    And the TestEventResult is not in the system
