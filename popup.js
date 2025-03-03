document.addEventListener('DOMContentLoaded', function() {
    // Get copied text from the clipboard when the popup opens
    chrome.runtime.sendMessage({ action: "getCopiedText" }, function(response) {
        document.getElementById('inputText').value = response.text;
    });
});

document.getElementById('processButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const key = "KEY"; // You can change this to any key you want
    const action = document.querySelector('input[name="action"]:checked').value;
    
    let outputText;
    if (action === 'cipher') {
        outputText = vigenereCipher(inputText, key);
    } else {
        outputText = vigenereDecipher(inputText, key);
    }
    
    document.getElementById('outputText').value = outputText;
});

function vigenereCipher(text, key) {
    let result = '';
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt();
            const base = char.charCodeAt(0) < 91 ? 65 : 97; // A or a
            const keyChar = key[keyIndex % key.length];
            const keyCharCode = keyChar.charCodeAt() - 65; // A = 0, B = 1, ...
            result += String.fromCharCode(((charCode - base + keyCharCode) % 26) + base);
            keyIndex++;
        } else {
            result += char; // Non-alphabetic characters are unchanged
        }
    }
    return result;
}

function vigenereDecipher(text, key) {
    let result = '';
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt();
            const base = char.charCodeAt(0) < 91 ? 65 : 97; // A or a
            const keyChar = key[keyIndex % key.length];
            const keyCharCode = keyChar.charCodeAt() - 65; // A = 0, B = 1, ...
            result += String.fromCharCode(((charCode - base - keyCharCode + 26) % 26) + base);
            keyIndex++;
        } else {
            result += char; // Non-alphabetic characters are unchanged
        }
    }
    return result;
}