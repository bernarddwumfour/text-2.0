// Importing custom functions from another module
import { 
    addBookmark, addCitation, addQuotation, changeFontSize, changeFontType, colorText, 
    copyText, cutText, exitFullScreen, highlightText, makeFullScreen, makeSubscript, 
    makeSuperscript, paragraphLineSpacing, pasteText, setLetterSpacing, setLineHeight, 
    toggleOutline, uploadImage, uploadVideo, wrapParagraph 
} from "./_customFunctions.js";

// Array of elements that will trigger different commands when clicked
let elements = [
    { element: ".fullscreenBtn", command: makeFullScreen },  // Fullscreen mode
    { element: ".previewBtn", command: exitFullScreen },     // Exit fullscreen mode
    { element: ".outlineBtn", command: toggleOutline },      // Toggle document outline
    { element: ".copy", command: copyText },                // Copy text
    { element: ".paste", command: pasteText },              // Paste text
    { element: ".cut", command: cutText },                  // Cut text
    { element: ".subscript", command: makeSubscript },      // Subscript text
    { element: ".superscript", command: makeSuperscript },  // Superscript text
    { element: ".lineHeight", command: () => setLineHeight(document.getElementById("lineHeightSelect").value) },  // Change line height based on selected value
    { element: ".letterSpacing", command: () => setLetterSpacing(document.getElementById("letterSpacingSelect").value) },  // Adjust letter spacing
    { element: ".insertQuoteBtn", command: () => addQuotation() },  // Insert quotation block
    { element: ".addCitation", command: () => addCitation() },      // Add a citation
    { element: ".insertBookmark", command: () => addBookmark() },   // Insert a bookmark
    { element: ".wrapParagraph", command: () => wrapParagraph() },  // Wrap text in a paragraph
    { element: ".paragraphLineSpacing", command: () => paragraphLineSpacing(document.getElementById("paragraphLineSpacing").value) }  // Set paragraph line spacing
];

// Function to bind commands to elements' click events
const execCommand = (selector, action) => {
    // Select all elements matching the selector
    document.querySelectorAll(selector).forEach(item => {
        // Add a click event listener for each selected element
        item.addEventListener("click", action);
    });
}

// Iterating through the elements array to attach the commands to corresponding buttons
elements.forEach(item => {
    item.value 
        ? execCommand(item.element, item.command, item.value)  // If 'value' exists, pass it to execCommand
        : execCommand(item.element, item.command);  // Otherwise, execute the command directly
});

// Array for elements with custom event types (e.g., "change" events for dropdowns or input fields)
let elementsWithCustomEvent = [
    { event: "change", element: ".lineHeight", command: () => setLineHeight(document.getElementById("lineHeightSelect").value) },  // Line height adjustment
    { event: "change", element: ".letterSpacing", command: () => setLetterSpacing(document.getElementById("letterSpacingSelect").value) },  // Letter spacing adjustment
    { event: "change", element: ".uploadImage", command: (e) => uploadImage(e.target) },  // Image upload
    { event: "change", element: ".uploadVideo", command: (e) => uploadVideo(e.target) },  // Video upload
    { event: "change", element: ".fontSize", command: () => changeFontSize(document.querySelector(".fontSize")) },  // Font size change
    { event: "change", element: ".fontName", command: () => changeFontType(document.querySelector(".fontName")) },  // Font type change
];

// Function to bind commands to elements with specific event types (like "change")
const execCommandWithEventtype = (eventType, selector, action) => {
    document.querySelectorAll(selector).forEach(item => {
        // Add a listener for a custom event (e.g., "change")
        item.addEventListener(eventType, action);
    });
}

// Iterating through the custom event elements array
elementsWithCustomEvent.forEach(item => {
    execCommandWithEventtype(item.event, item.element, item.command);
});

// Array of elements that need specific functions attached on click (e.g., for text color or highlight)
let attachFunctionToButton = [
    { element: ".textColorButton", command: colorText(document.querySelector('.textColorButton')) },  // Text color
    { element: ".highlightTextButton", command: highlightText(document.querySelector('.highlightTextButton')) },  // Highlight text
];

// Function to attach commands to buttons directly
const execAttachfunctiontoinput = (selector, action) => {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener("click", action);  // Attach 'click' event for buttons
    });
}

// Iterate through the attachFunctionToButton array to bind commands
attachFunctionToButton.forEach(item => {
    execAttachfunctiontoinput(item.element, () => item.command);  // Bind functions to buttons
});
