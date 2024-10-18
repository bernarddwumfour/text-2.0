
import { changeFontSize, changeFontType, colorText, copyText, cutText, exitFullScreen, highlightText, makeFullScreen,makeSubscript,makeSuperscript,pasteText,setLetterSpacing,setLineHeight,toggleOutline, uploadImage, uploadVideo } from "./_customFunctions.js";

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
    { element: ".letterSpacing", command:  setLetterSpacing(document.getElementById("letterSpacingSelect").value) },
];

let elementsWithCustomEvent = [
    { event : "change",element: ".lineHeight", command:  ()=>setLineHeight(document.getElementById("lineHeightSelect").value) },
    { event : "change",element: ".letterSpacing", command:  ()=>setLetterSpacing(document.getElementById("letterSpacingSelect").value) },
    { event : "change",element: ".uploadImage", command:  (e)=>uploadImage(e.target) },
    { event : "change",element: ".uploadVideo", command:  (e)=>uploadVideo(e.target)},
    { event : "change",element: ".fontSize", command: ()=>changeFontSize(document.querySelector(".fontSize"))},
    { event : "change",element: ".fontName", command: ()=>changeFontType(document.querySelector(".fontName"))},
]

let attachFunctionToButton = [
    { element: ".textColorButton", command:  ()=>colorText(document.querySelector('.textColorButton')) },
    { element: ".highlightTextButton", command:  ()=>highlightText(document.querySelector('.highlightTextButton')) },
]

const execAttachfunctiontoinput = (selector,action)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener("click",action)
    })
}

const execCommandWithEventtype = (selector,action,eventTYype)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener(eventTYype,action)
    })
}

const execCommand = (selector,action)=>{
    document.querySelectorAll(selector).forEach(item=>{
        item.addEventListener("click",action )
    })
}


elementsWithCustomEvent.forEach(item => {
    item.value ? execCommandWithEventtype(item.event,item.element, item.command, item.value) : execCommand(item.element, item.command)

})


elements.forEach(item => {
    item.value ? execCommand(item.element, item.command, item.value) : execCommand(item.element, item.command)

})

attachFunctionToButton.forEach(item => {
     execAttachfunctiontoinput(item.element, item.command)

})
