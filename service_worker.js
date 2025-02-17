// Service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page 
// or user interaction.
// Service worker script will be forcefully terminated after about 30 seconds of inactivity, and restarted when it's next needed.
// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/66618269#66618269

// This code is not used. But without it, the extension does not work
let isTranscribing = false;
let transcriptArray = [];

function jsonToYaml(json) {
    return json.map(entry => {
        return `Name: ${entry.Name}\nText: ${entry.Text}\nTime: ${entry.Time}\n----`;
    }).join('\n');
}

function saveTranscripts(meetingTitle, transcriptArray) {
    const yaml = jsonToYaml(transcriptArray);
    console.log(yaml);

    chrome.downloads.download({
        url: 'data:text/plain,' + yaml,
        filename: meetingTitle + ".txt",
        saveAs: true
    });
}



chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log(message);
    switch (message.message) {
        case 'start_capture':
            chrome.tabs.query({
                url: "https://teams.microsoft.com/*"
            }, function (tabs) {
                console.log("Tabs query result:", tabs);
                if (tabs[0]) {
                    console.log("sending message start_capture");
                    chrome.tabs.sendMessage(tabs[0].id, {
                        message: "start_capture"
                    });
                    console.log("message start_capture sent!");
                }
            });
            break;
        case 'download_captions':
            console.log('download_captions triggered!', message);
            saveTranscripts(message.meetingTitle, message.transcriptArray);

            break;
        case 'save_captions':
            console.log('save_captions triggered!');

            chrome.tabs.query({
                url: "https://teams.microsoft.com/*"
            }, function (tabs) {
                console.log("Tabs query result:", tabs);
                if (tabs[0]) {
                    console.log("sending message return_transcript");
                    chrome.tabs.sendMessage(tabs[0].id, {
                        message: "return_transcript"
                    });
                    console.log("message start_capture sent!");
                }
            });

            break;
        default:
            break;
    }
});

// let countdown = 10; // 10 seconds

// // Listen for messages from the content script.
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     switch (request.message) {
//         case 'transcript':
//             console.log("transcript:", request.transcriptArray);
//             transcriptArray = request.transcriptArray;
//             meetingTitle = request.meetingTitle;
//             chrome.runtime.sendMessage({
//                 message: "download_captions",
//                 transcriptArray: transcriptArray,
//                 meetingTitle: meetingTitle
//             });
//             break;
//         default:
//             break;
//     }
// });

// // Auto-download transcriptions every 10 seconds
// let intervalId = setInterval(() => {
//     console.log(`Downloading captions in ${countdown} seconds...`);
//     countdown--;
//     if (countdown === 0) {
//         let meetingTitle = document.title.replace("__Microsoft_Teams", '').replace(/[^a-z0-9 ]/gi, '');
//         countdown = 10; // reset the countdown
//         if (transcriptArray.length > 0) {
//             chrome.runtime.sendMessage({
//                 message: "download_captions",
//                 transcriptArray: transcriptArray,
//                 meetingTitle: meetingTitle
//             });
//         }
//     }
// }, 1000);