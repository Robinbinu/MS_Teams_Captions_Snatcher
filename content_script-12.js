const transcriptArray = [];
let capturing = false;
let observer = null;
let mainCount = 900;
let countdown = 900;
let autosaveEnabled = false;


function checkCaptions() {
    // Teams v2 
    const closedCaptionsContainer = document.querySelector("[data-tid='closed-captions-renderer']");
    if (!closedCaptionsContainer) {
        // alert("Please, click 'More' > 'Language and speech' > 'Turn on live captions'");
        return;
    }
    const transcripts = closedCaptionsContainer.querySelectorAll('.ui-chat__item');

    transcripts.forEach(transcript => {
        const ID = transcript.querySelector('.fui-Flex > .ui-chat__message').id;
        if (transcript.querySelector('.ui-chat__message__author') != null) {
            const Name = transcript.querySelector('.ui-chat__message__author').innerText;
            const Text = transcript.querySelector('.fui-StyledText').innerText;
            const Time = new Date().toLocaleTimeString();

            const index = transcriptArray.findIndex(t => t.ID === ID);

            if (index > -1) {
                if (transcriptArray[index].Text !== Text) {
                    // Update the transcript if text changed
                    transcriptArray[index] = {
                        Name,
                        Text,
                        Time,
                        ID
                    };
                }
            } else {
                console.log({
                    Name,
                    Text,
                    Time,
                    ID
                });
                // Add new transcript
                transcriptArray.push({
                    Name,
                    Text,
                    Time,
                    ID
                });
            }
        }
    });
}

function startTranscription() {
    const meetingDurationElement = document.getElementById("call-duration-custom");
    if (meetingDurationElement) {
        // Meeting duration element found
    } else {
        setTimeout(startTranscription, 5000);
        return false;
    }

    const closedCaptionsContainer = document.querySelector("[data-tid='closed-captions-renderer']");
    if (!closedCaptionsContainer) {
        console.log("Please, click 'More' > 'Language and speech' > 'Turn on live captions'");
        setTimeout(startTranscription, 5000);
        return false;
    }

    capturing = true;
    observer = new MutationObserver(checkCaptions);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return true;
}

startTranscription();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case 'start_capture':
            console.log('start_capture triggered!');
            startTranscription();
            break;
        case 'return_transcript':
            console.log("response:", transcriptArray);
            if (!capturing) {
                alert("Oops! No captions were captured. Please, try again.");
                return;
            }

            let meetingTitle = document.title.replace("__Microsoft_Teams", '').replace(/[^a-z0-9 ]/gi, '');
            chrome.runtime.sendMessage({
                message: "download_captions",
                transcriptArray: transcriptArray,
                meetingTitle: meetingTitle
            });
            break;
        default:
            break;
    }
});

console.log("content_script.js is running");

let autosaveInterval;

setInterval(() => {
        if (capturing) {
            console.log(`Downloading captions in ${countdown} seconds...`);
            countdown--;
            if (countdown === 0) {
                countdown = mainCount; // reset the countdown
                let meetingTitle = document.title.replace("__Microsoft_Teams", '').replace(/[^a-z0-9 ]/gi, '');
                chrome.runtime.sendMessage({
                    message: "download_captions",
                    transcriptArray: transcriptArray,
                    meetingTitle: meetingTitle
                });
            }
        }
    }, 1000);





// document.addEventListener('DOMContentLoaded', () => {
//     const countdownInput = document.getElementById('countdownInput');
//     const autosaveCheckbox = document.getElementById('autosaveCheckbox');

//     // Set initial values
//     countdownInput.value = countdown;
//     autosaveCheckbox.checked = autosaveEnabled;

//     // Update countdown value
//     countdownInput.addEventListener('input', (event) => {
//         countdown = parseInt(event.target.value, 10) || 0;
//         mainCount = countdown;
//         console.log('Countdown set to:', countdown);
//     });

//     // Toggle autosave
//     autosaveCheckbox.addEventListener('change', (event) => {
//         autosaveEnabled = event.target.checked;
//         console.log('Autosave enabled:', autosaveEnabled);
//         if (autosaveEnabled) {
//             startAutosave();
//         } else {
//             stopAutosave();
//         }
//     });
// });