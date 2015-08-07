Feature: Project API

Scenario: Create a project
  Given a Project with properties
    |property|value|
    |name | test |
  When the Project is created
  Then a message with HTTP code 201 is received
  And the Project is in the system

Scenario: Update a project
  Given a Project with properties
    |property|value|
    |name | test |
  And the Project is created
  When the Project is updated with properties
    |property|value|
    |name | test345 |
  Then a message with HTTP code 201 is received
  And the Project is in the system

Scenario: Update a project
  Given a Project with properties
    |property|value|
    |name | test |
  And the Project is created
  When the Project is deleted
  Then a message with HTTP code 204 is received
  And the Project is not in the system
