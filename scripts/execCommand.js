const execCommand = (element, command, value = null) => {
    element = document.querySelectorAll(element)
    element.forEach((item) => {
        item.addEventListener('click', () => {
            document.execCommand(command, value)
        })
    })
}

let elements = [
    { element: ".bold", command: "bold" },
    { element: ".italic", command: "italic" },
    { element: ".underline", command: "underline" },
    { element: ".strikethrough", command: "strikeThrough" },
    { element: ".align-left", command: "justifyLeft" },
    { element: ".align-center", command: "justifyCenter" },
    { element: ".align-right", command: "justifyRight" },
    { element: ".justify", command: "justifyFull" },
    { element: ".bullet-list", command: "insertUnorderedList" },
    { element: ".numbered-list", command: "insertOrderedList" },
    { element: ".indent", command: "indent" },
    { element: ".outdent", command: "outdent" },
    { element: ".undo", command: "undo" },
    { element: ".redo", command: "redo" },
    { element: ".insert-link", command: "createLink" },
    { element: ".horizontalLine", command: "insertHorizontalRule" },
    { element: ".insertQuoteBtn", command: "formatBlock", value : "blockquote" },
    { element: ".fontName", command: "fontName", value : document.querySelector(".fontName").value },
];


elements.forEach(item => {
    item.value ? execCommand(item.element, item.command, item.value) : execCommand(item.element, item.command)

})