Feature: Test Session API

  Background:
    Given a url "/api/testsessions/"

  Scenario: Create a test session
    Given a TestSession with properties
      | property | value       |
      | name     | test        |
      | server     | test        |
      | browser     | test        |
      | tester     | john        |
      | startDate     | Fri, 23 Jan 2015 00:00:00 GMT      |
      | finishDate     | Fri, 23 Jan 2015 00:00:00 GMT       |
    And a TestSession with a Test relationship using test
    When the TestSession is created
    Then a message with HTTP code 201 is received
    And the TestSession is in the system

    Scenario Outline: Update a test session
      Given a TestSession with properties
        | property | value       |
        | name     | test        |
        | server     | test        |
        | browser     | test        |
        | tester     | john        |
        | startDate     | Fri, 23 Jan 2015 00:00:00 GMT      |
        | finishDate     | Fri, 23 Jan 2015 00:00:00 GMT       |
      And a TestSession with a Test relationship using test
    And the TestSession is created
    When the TestSession <property> is updated with <value>
    Then a message with HTTP code 201 is received
    And the TestSession is in the system

    Examples:
    | property| value|
    | name    | test345 |


    Scenario: Delete a test session
      Given a TestSession with properties
        | property | value       |
        | name     | test        |
        | server     | test        |
        | browser     | test        |
        | tester     | john        |
        | startDate     | Fri, 23 Jan 2015 00:00:00 GMT      |
        | finishDate     | Fri, 23 Jan 2015 00:00:00 GMT       |
      And a TestSession with a Test relationship using test
    And the TestSession is created
    When the TestSession is deleted
    Then a message with HTTP code 204 is received
    And the TestSession is not in the system
