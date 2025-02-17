# MS_Teams_Captions_Snatcher
Here is a technical GitHub README file for your Chrome Extension:

**Captions Snatcher**
=====================

**Overview**
-----------

Captions Snatcher is a Chrome Extension that automatically captures and saves meeting notes for Microsoft Teams meetings.

**Features**
------------

* Captures meeting notes from Microsoft Teams meetings
* Allows users to set a countdown timer to capture notes at a specific time
* Enables autosave feature to save notes automatically
* Saves notes in a local storage

**Technical Requirements**
-------------------------

* Chrome 80 or later
* Microsoft Teams integration

**Development**
--------------

### Frontend

The frontend code is written in HTML, CSS, and JavaScript. The HTML file (`popup.html`) contains the user interface for the extension, including input fields for setting a countdown timer and enabling autosave. The CSS file (`popup.css`) styles the UI, and the JavaScript file (`popup.js`) handles the logic for capturing and saving notes.

### Backend

The backend code is written in JavaScript and uses the Microsoft Teams API to capture meeting notes. The backend code is responsible for sending requests to the Microsoft Teams API to retrieve meeting notes and saving them to local storage.

**Installation**
--------------

To install the extension, follow these steps:

1. Clone the repository: `git clone https://github.com/Robinbinu/MS_Teams_Captions_Snatcher`
2. Go to the extension directory: `cd captions-snatcher`
3. Load the extension in Chrome: `chrome://extensions/`, enable developer mode, and click "Load unpacked". Then, select the extension directory.
4. Click "Add to Chrome" to install the extension.

**Troubleshooting**
-------------------

* If the extension is not working, check the console for errors.

**Contributing**
--------------

Contributions are welcome! If you'd like to contribute to the extension, please fork the repository and submit a pull request.

**License**
---------

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


I hope this helps! Let me know if you have any questions or need further assistance.
