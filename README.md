# smash.gg Tournament Filter

## description

  This chrome extension allows smash.gg users to filter the list of tournament cards by location. It utilizes Javascript, html, css, and the chrome extension apis to manipulate DOM data.

## Features and Implementation

### Browser Action Pop-up

  This extension allows the user to select locations to display, and displays all cards if no locations are selected. The list of locations is populated by a content script, which gets the full list of "gg-cards", selected the location from the card, and saves a list of these locations to chrome's local storage, including a boolean flag defaulting to false. The browser action allows the user to select checkboxes corresponding with locations, and updates that location's boolean value in chrome storage.

### Live Update on Storage Changes

  The extension will update the displayed content as the user selects checkboxes. This is accomplished by adding a listener to the chrome local storage and saving to local storage as checkboxes are selected using an onChange method.

## To Be Implemented

### Sort By Game

  Allow for users to filter cards by game as well as location.

### Style

  Style the popup to be more visually appealing.

  
