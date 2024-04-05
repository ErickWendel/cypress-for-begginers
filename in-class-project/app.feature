Feature: Image Registration

  Scenario: Submitting an image with invalid inputs
    Given I am on the image registration page
    When I enter "" in the title field
    Then I enter "" in the URL field
    Then I click the submit button
    Then I should see "Please type a title for the image" message above the title field
    And I should see "Please type a valid URL" message above the imageUrl field
    And I should see an exclamation icon in the title and URL fields

  Scenario: Submitting an image with valid inputs using enter key
    Given I am on the image registration page
    When I enter "Alien BR" in the title field
    Then I should see a check icon in the title field
    When I enter "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field
    Then I should see a check icon in the imageUrl field
    Then I can hit enter to submit the form
    And the list of registered images should be updated with the new item
    And the new item should be stored in the localStorage
    Then The inputs should be cleared

  Scenario: Submitting an image and updating the list
    Given I am on the image registration page
    Then I have entered "BR Alien" in the title field
    Then I have entered "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" in the URL field
    When I click the submit button
    And the list of registered images should be updated with the new item
    And the new item should be stored in the localStorage
    Then The inputs should be cleared

  Scenario: Refreshing the page after submitting an image clicking in the submit button
    Given I am on the image registration page
    Then I have submitted an image by clicking the submit button
    When I refresh the page
    Then I should still see the submitted image in the list of registered images