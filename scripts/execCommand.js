// Function to execute a command when an element is clicked
const execCommand = (element, command, value = null) => {
    // Select all elements that match the selector passed in as 'element'
    element = document.querySelectorAll(element)

    // Loop through each element and add an event listener for the 'click' event
    element.forEach((item) => {
        item.addEventListener('click', () => {
            // Execute the specified document command when the element is clicked
            // 'command' is the editing command, and 'value' is any optional value
            document.execCommand(command, value)
        })
    })
}

// Array of elements and their associated editing commands
let elements = [
    { element: ".bold", command: "bold" },                   // Makes selected text bold
    { element: ".italic", command: "italic" },               // Makes selected text italic
    { element: ".underline", command: "underline" },         // Underlines selected text
    { element: ".strikethrough", command: "strikeThrough" }, // Strikethrough on selected text
    { element: ".align-left", command: "justifyLeft" },      // Aligns text to the left
    { element: ".align-center", command: "justifyCenter" },  // Centers the text
    { element: ".align-right", command: "justifyRight" },    // Aligns text to the right
    { element: ".justify", command: "justifyFull" },         // Justifies text (align to both sides)
    { element: ".bullet-list", command: "insertUnorderedList" }, // Inserts a bullet point list
    { element: ".numbered-list", command: "insertOrderedList" },  // Inserts a numbered list
    { element: ".indent", command: "indent" },               // Indents text
    { element: ".outdent", command: "outdent" },             // Reduces the indentation of text
    { element: ".undo", command: "undo" },                   // Undo the last action
    { element: ".redo", command: "redo" },                   // Redo the last undone action
    { element: ".insert-link", command: "createLink" },      // Inserts a hyperlink
    { element: ".horizontalLine", command: "insertHorizontalRule" }, // Inserts a horizontal line
    { element: ".insertQuoteBtn", command: "formatBlock", value : "blockquote" }, // Formats selected text as a blockquote
    // { element: ".fontName", command: "fontName", value : document.querySelector(".fontName").value },        
    // Commented out fontName example (can be used for changing font style)
];

// Loop through each item in the elements array
// If 'value' is provided, it passes the value along with the command, otherwise it just executes the command
elements.forEach(item => {
    item.value ? execCommand(item.element, item.command, item.value) : execCommand(item.element, item.command)
})
