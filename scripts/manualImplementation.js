
import { addBookmark, addCitation, addQuotation, changeFontSize, changeFontType, colorText, copyText, cutText, exitFullScreen, highlightText, makeFullScreen,makeSubscript,makeSuperscript,paragraphLineSpacing,pasteText,setLetterSpacing,setLineHeight,toggleOutline, uploadImage, uploadVideo, wrapParagraph } from "./_customFunctions.js";

let elements = [
    { element: ".fullscreenBtn", command: makeFullScreen },
    { element: ".previewBtn", command:  exitFullScreen },
    { element: ".outlineBtn", command:  toggleOutline },
    { element: ".copy", command:  copyText },
    { element: ".paste", command:  pasteText },
    { element: ".cut", command:  cutText },
    { element: ".subscript", command:  makeSubscript },
    { element: ".superscript", command:  makeSuperscript },
    { element: ".lineHeight", command:  ()=>setLineHeight(document.getElementById("lineHeightSelect").value) },
    { element: ".letterSpacing", command:  ()=>setLetterSpacing(document.getElementById("letterSpacingSelect").value) },
    { element: ".insertQuoteBtn", command: ()=>addQuotation()},
    { element: ".addCitation", command: ()=>addCitation()},
    { element: ".insertBookmark", command: ()=>addBookmark()},
    { element: ".wrapParagraph", command: ()=>wrapParagraph()},
    { element: ".paragraphLineSpacing", command: ()=>paragraphLineSpacing(document.getElementById("paragraphLineSpacing").value)}
];

const execCommand = (selector,action)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener("click",action )
    })
}

elements.forEach(item => {
    item.value ? execCommand(item.element, item.command, item.value) : execCommand(item.element, item.command)

})


let elementsWithCustomEvent = [
    { event : "change",element: ".lineHeight", command:  ()=>setLineHeight(document.getElementById("lineHeightSelect").value) },
    { event : "change",element: ".letterSpacing", command:  ()=>setLetterSpacing(document.getElementById("letterSpacingSelect").value) },
    { event : "change",element: ".uploadImage", command:  (e)=>uploadImage(e.target) },
    { event : "change",element: ".uploadVideo", command:  (e)=>uploadVideo(e.target)},
    { event : "change",element: ".fontSize", command: ()=>changeFontSize(document.querySelector(".fontSize"))},
    { event : "change",element: ".fontName", command: ()=>changeFontType(document.querySelector(".fontName"))},
]

const execCommandWithEventtype = (eventTYype,selector,action)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener(eventTYype,action)
    })
}

elementsWithCustomEvent.forEach(item => {
    execCommandWithEventtype(item.event,item.element, item.command) 
})




let attachFunctionToButton = [
    { element: ".textColorButton", command:  colorText(document.querySelector('.textColorButton')) },
    { element: ".highlightTextButton", command:  highlightText(document.querySelector('.highlightTextButton')) },
]

const execAttachfunctiontoinput = (selector,action)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener("click",action)
    })
}

attachFunctionToButton.forEach(item => {
    execAttachfunctiontoinput(item.element, ()=>item.command)
})


