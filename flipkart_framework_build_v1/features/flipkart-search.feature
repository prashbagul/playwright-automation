Feature: Flipkart product search

  # Static scenarios; one unique TCID per scenario enables scenario-level parallelism.
  Scenario: Search using Excel TC001
    Given I open Flipkart for test case "TC001"
    When I search using the Excel data
    Then the search results should contain the expected text

  Scenario: Search using Excel TC002
    Given I open Flipkart for test case "TC002"
    When I search using the Excel data
    Then the search results should contain the expected text
