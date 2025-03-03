chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCopiedText") {
        navigator.clipboard.readText().then(text => {
            sendResponse({ text: text });
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
            sendResponse({ text: "" });
        });
        return true; // Indicates that we will send a response asynchronously
    }
});