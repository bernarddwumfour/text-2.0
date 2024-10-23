let editor = document.querySelectorAll(".textEditor")[0]
// Function to apply text outline
export function toggleOutline() {
  const editor = document.querySelector(".textEditor");
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (selectedText) {
    const commonAncestor = range.commonAncestorContainer;

    // Find the closest SPAN element with the border style
    let parentNode =
      commonAncestor.nodeType === 3
        ? commonAncestor.parentNode
        : commonAncestor;
    let spanToRemove = null;

    while (parentNode && parentNode !== editor) {  // Fix the editor reference
      if (
        parentNode.tagName === 'SPAN' &&
        parentNode.style.border === '1px solid black'
      ) {
        spanToRemove = parentNode;
        break;
      }
      parentNode = parentNode.parentNode;
    }

    if (spanToRemove) {
      // If the outline is already applied, remove it
      const textNode = document.createTextNode(spanToRemove.textContent);
      spanToRemove.parentNode.replaceChild(textNode, spanToRemove);

      // Restore the selection to the text
      range.selectNodeContents(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // If the outline is not applied, apply it
      const span = document.createElement('span');  // Fix the element creation
      span.style.border = '1px solid black';
      span.textContent = selectedText;

      // Replace the selected text with the span element
      range.deleteContents();
      range.insertNode(span);

      // Restore the selection to the span
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}


// Copy text to the clipboard
export function copyText() {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed) {
    navigator.clipboard
      .writeText(selection.toString())
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
}

// Cut text to the clipboard
export function cutText() {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed) {
    navigator.clipboard
      .writeText(selection.toString())
      .then(() => {
        selection.deleteFromDocument();
        console.log('Text cut to clipboard');
      })
      .catch((err) => {
        console.error('Failed to cut text: ', err);
      });
  }
}


// Paste text from the clipboard
export function pasteText() {
  const selection = window.getSelection();

  navigator.clipboard
    .readText()
    .then((text) => {
      if (selection.rangeCount > 0) {
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(text));
      } else {
        editor.appendChild(document.createTextNode(text));
      }
      console.log('Text pasted from clipboard');
    })
    .catch((err) => {
      console.error('Failed to paste text: ', err);
    });
}

export const makeSubscript = () => {
  const selection = window.getSelection();

  if (!selection.rangeCount) return;

  const parentElement = selection.anchorNode.parentElement;

  if (parentElement.tagName === 'SUB') {
    document.execCommand('removeFormat'); // Applies superscript formatting
  } else {
    document.execCommand('subscript');
  }
}

export const makeSuperscript = () => {
  const selection = window.getSelection();

  if (!selection.rangeCount) return;

  const parentElement = selection.anchorNode.parentElement;

  if (parentElement.tagName === 'SUP') {
    document.execCommand('removeFormat'); // Applies superscript formatting
  } else {
    document.execCommand('superscript');
  }
}
// Function to set line height
export const setLineHeight = (value) => {
  if (value) {
    const selection = window.getSelection();

    // Check if there is a selection
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      // Ensure there's selected text
      if (selectedText.trim()) {
        // Create a span element
        const span = document.createElement('span');
        // Apply line-height style to the span
        span.style.lineHeight = value;
        // span.style.lineHeight = `${value * 100}%`; 
        span.style.display = 'block'; // Changed to block to ensure line-height takes effect
        span.style.width = '100%'; // Optional: Ensure it spans full width
        span.style.whiteSpace = 'pre-wrap'; // Preserve wrapping and spaces
        span.textContent = selectedText; // Set selected text inside span

        // Remove the original text
        range.deleteContents();

        // Re-insert the styled span
        range.insertNode(span);

        // Adjust selection to the new span
        const newRange = document.createRange();
        newRange.selectNode(span);

        selection.removeAllRanges(); // Clear previous selection
        selection.addRange(newRange); // Add the new span as the selection
      }
    }
  }
};

// Function to adjust letter spacing
export const setLetterSpacing = (value) => {
  if (value) {
    const selection = window.getSelection();

    // Check if there is a selection
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      // Ensure there's selected text
      if (selectedText.trim()) {
        // Create a span element
        const span = document.createElement('span');

        // Apply letter-spacing style to the span
        span.style.letterSpacing = `${value}rem`;
        span.style.display = 'inline-block'; // Ensure letter-spacing takes effect
        span.style.whiteSpace = 'pre-wrap'; // Preserve wrapping and spaces
        span.textContent = selectedText; // Set selected text inside span

        // Remove the original text
        range.deleteContents();

        // Re-insert the styled span
        range.insertNode(span);

        // Adjust selection to the new span
        const newRange = document.createRange();
        newRange.selectNode(span);

        selection.removeAllRanges(); // Clear previous selection
        selection.addRange(newRange); // Add the new span as the selection
      }
    }
  }
};


export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
export const makeFullScreen = () => {
  document.documentElement.requestFullscreen();

}


// Helper function to get the maximum width of media
const getMaxMediaWidth = () => {
  const editorWidth = textEditor.clientWidth; // Get the width of the editor
  return editorWidth - 64; // 4rem = 64px, subtract it from the editor width
};

// Helper function to create a resizable wrapper around the media
const createResizableWrapper = (mediaElement) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('resizable-wrapper');
  wrapper.style.maxWidth = getMaxMediaWidth() + 'px'; // Set max width
  wrapper.style.resize = 'both';
  wrapper.style.overflow = 'hidden'; // Ensure content doesn't overflow the wrapper
  wrapper.style.display = 'inline-block'; // Keep wrapper inline
  wrapper.style.padding = '0.5rem'; // Add padding for a nicer look
  wrapper.style.border = '1px dashed #ccc'; // Optional: Add border for resizing visual
  wrapper.style.position = 'relative';
  wrapper.style.width = "200px"
  wrapper.contentEditable = false

  wrapper.appendChild(mediaElement);
  wrapper.appendChild(document.createElement("br")) // Add media to wrapper

  // Resize observer to scale media proportionally when wrapper is resized
  const resizeObserver = new ResizeObserver(() => {
    const wrapperWidth = wrapper.offsetWidth;
    mediaElement.style.width = wrapperWidth + 'px'; // Scale media to wrapper width
    mediaElement.style.height = 'auto'; // Maintain aspect ratio
  });
  resizeObserver.observe(wrapper); // Observe the wrapper for resizing

  return wrapper;
};

// Image upload

export const uploadImage = (button) => {
  console.log(button)
  // button.querySelector("input").click()
  let file = button.files[0]
  console.log(file)
  // const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.style.maxWidth = '100%'; // Ensure the image fits inside the wrapper
      img.style.height = 'auto';

      const wrapper = createResizableWrapper(img); // Wrap image in a resizable div
      editor.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  }

}


// Video upload
export const uploadVideo = (button) => {
  // button.click()
  let file = button.files[0]

  // const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const video = document.createElement('video');
      video.src = event.target.result;
      video.setAttribute('controls', 'controls');
      video.style.maxWidth = '100%'; // Ensure the video fits inside the wrapper
      video.style.height = 'auto';

      const wrapper = createResizableWrapper(video); // Wrap video in a resizable div
      editor.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  }

}

const dropDowmButton = document.getElementsByClassName('dropDownButton');
//toggling Drop downs
for (let i = 0; i < dropDowmButton.length; i++) {
  dropDowmButton[i] &&
    dropDowmButton[i].addEventListener('click', () => {
      dropDowmButton[i]
        .querySelector('.dropDownMenu')
        .classList.toggle('hidden');
    });
  dropDowmButton[i] &&
    dropDowmButton[i].addEventListener('blur', () => {
      dropDowmButton[i].querySelector('.dropDownMenu').classList.add('hidden');
    });
}

// Function to change the text color
const changeTextColor = (value) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    document.execCommand('foreColor', false, value);
  }
};

// Function to highlight text
const changeHiliteColor = (value) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    document.execCommand('hiliteColor', false, value);
  }
};

// Handle text color change
export const colorText = (textColorButton) => {
  const textcolors = textColorButton.querySelectorAll('li');
  for (let i = 0; i < textcolors.length; i++) {
    textcolors[i]?.addEventListener('click', () => {
      const color = textcolors[i].dataset.color;
      changeTextColor(color);
      // textcolors[i].parentElement.classList.add('hidden'); 
    });
  }
};

// Handle text highlight change
export const highlightText = (highlightColorButton) => {
  const markcolors = highlightColorButton.querySelectorAll('li');
  for (let i = 0; i < markcolors.length; i++) {
    markcolors[i]?.addEventListener('click', () => {
      const color = markcolors[i].dataset.color;
      changeHiliteColor(color);
      // markcolors[i].parentElement.classList.add('hidden'); 
    });
  }
};

// const markcolors = mark.getElementsByTagName('li');
// for (let i = 0; i < markcolors.length; i++) {
//   markcolors[i] &&
//     markcolors[i].addEventListener('click', () => {
//       changeHiliteColor(markcolors[i].dataset.color);
//       markcolors[i].parentElement.classList.add('hidden');
//     });
// }

// const textcolors = textColor.querySelectorAll('li');
// for (let i = 0; i < textcolors.length; i++) {
//   textcolors[i] &&
//     textcolors[i].addEventListener('click', () => {
//       changeTextColor(textcolors[i].dataset.color);
//       textcolors[i].parentElement.classList.add('hidden');
//     });
// }

export function changeFontSize(fontsize) {
  let fontSize = fontsize.value + 'px';
  let selection = window.getSelection();

  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);

    // Create a <span> element and apply the font size as an inline style
    let span = document.createElement("span");
    span.style.fontSize = fontSize;

    range.surroundContents(span);  // Wrap the selected text in the span
  }
}

export function changeFontType(fonttype) {
  let fontType = fonttype.value; // Assuming the font type is passed as value (e.g., Arial, Times New Roman)
  let selection = window.getSelection();

  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0);

    // Create a <span> element and apply the font family as an inline style
    let span = document.createElement("span");
    span.style.fontFamily = fontType;

    range.surroundContents(span);  // Wrap the selected text in the span
  }
}


export function addQuotation() {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    // Create a blockquote element
    const blockquote = document.createElement("blockquote");
    blockquote.style.borderLeft = "1px solid #ccc"; // Optional style
    blockquote.style.marginLeft = "10px"; // Indent the blockquote
    blockquote.style.paddingLeft = "10px"; // Add padding to the left
    blockquote.style.fontStyle = "italic"; // Optional italic text style

    // Insert selected text into blockquote
    blockquote.textContent = range.toString();
    range.deleteContents(); // Remove the selected text
    range.insertNode(blockquote);
    editor.appendChild(document.createElement("br")) // Insert the blockquote in place of the selected text
  }
}

export function addCitation() {
  const citationText = prompt("Enter the citation text:");

  if (citationText) {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const citationSup = document.createElement('sup');

      // Style and create citation
      citationSup.style.fontSize = '0.8em';
      citationSup.style.color = 'blue';
      citationSup.style.cursor = 'pointer';
      citationSup.setAttribute('title', citationText);
      citationSup.textContent = `[${citationText}]`;

      range.insertNode(citationSup);

      // Move the caret to the end of the citation
      range.setStartAfter(citationSup);
      range.setEndAfter(citationSup);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

// Track the number of bookmarks added
let bookmarkCount = 0;
const bookmarkList = [];
export function addBookmark() {
  // renderBookmarkList();
  const bookmarkName = prompt("Enter a name for this bookmark:");

  if (bookmarkName) {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const bookmarkSpan = document.createElement('span');

      // Create a unique ID for each bookmark
      bookmarkCount++;
      const bookmarkId = `bookmark-${bookmarkCount}`;

      // Set attributes for the bookmark span
      bookmarkSpan.setAttribute('id', bookmarkId);
      bookmarkSpan.setAttribute('data-bookmark', bookmarkName);
      bookmarkSpan.style.backgroundColor = 'yellow'; // To highlight it temporarily
      bookmarkSpan.textContent = `[Bookmark: ${bookmarkName}]`; // Visible placeholder

      range.insertNode(bookmarkSpan);

      // Store the bookmark information in an array for quick access
      bookmarkList.push({ id: bookmarkId, name: bookmarkName });
    }
  }
}

// Function to jump to a bookmark
function jumpToBookmark(bookmarkId) {
  const bookmarkElement = document.getElementById(bookmarkId);

  if (bookmarkElement) {
    bookmarkElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightBookmark(bookmarkElement);  // Highlight it for visual feedback
  } else {
    alert("Bookmark not found.");
  }
}

// Optional: Temporary highlight when jumping to a bookmark
function highlightBookmark(element) {
  element.style.backgroundColor = 'lightgreen';

  setTimeout(() => {
    element.style.backgroundColor = 'yellow'; // Reset after some time
  }, 1000);
}

// Function to render bookmarks list
function renderBookmarkList() {
  const bookmarkListDiv = document.getElementById('bookmarkList');
  bookmarkListDiv.innerHTML = '';  // Clear any existing content
  
  if (bookmarkList.length > 0) {
      const ul = document.createElement('ul');
      
      bookmarkList.forEach(bookmark => {
          const li = document.createElement('li');
          const button = document.createElement('button');
          
          button.textContent = bookmark.name;
          button.addEventListener('click', () => jumpToBookmark(bookmark.id));
          
          li.appendChild(button);
          ul.appendChild(li);
      });
      
      bookmarkListDiv.appendChild(ul);
  } else {
      bookmarkListDiv.textContent = 'No bookmarks added.';
  }
}

// Call renderBookmarkList after adding a bookmark
document.querySelector('.bookmarkDropdown').addEventListener('click', () => {
  renderBookmarkList();
});


export function wrapParagraph() {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    // Check if startContainer is a text node or element
    let parentElement = range.startContainer.nodeType === 3
      ? range.startContainer.parentElement
      : range.startContainer;

    // Find the closest paragraph element
    const parentParagraph = parentElement.closest('p');

    if (parentParagraph) {
      const wrapperDiv = document.createElement('div');
      // wrapperDiv.style.border = "1px solid #ccc";
      // wrapperDiv.style.padding = "10px";
      wrapperDiv.style.margin = "10px 0";

      // Wrap the paragraph in a div
      parentParagraph.parentNode.insertBefore(wrapperDiv, parentParagraph);
      wrapperDiv.appendChild(parentParagraph);
    }
  }
}

export function paragraphLineSpacing(value) {
  const lineHeight = value;

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    // Check if startContainer is a text node or element
    let parentElement = range.startContainer.nodeType === 3
      ? range.startContainer.parentElement
      : range.startContainer;

    // Find the closest paragraph element
    const parentParagraph = parentElement.closest('p');

    if (parentParagraph) {
      parentParagraph.style.lineHeight = lineHeight;
    }
  }
}

export function renameDocument(documentName) {
  // Use prompt to ask the user for the new document name
  const newDocumentName = prompt("Enter a new name for your document:", document.title);
  document.querySelector(documentName).textContent = newDocumentName

  // If the user provides a name, update the document's title
  if (newDocumentName && newDocumentName.trim() !== "") {
      document.title = newDocumentName.trim(); // Set browser tab title
      alert("Document renamed to: " + newDocumentName);
  } else {
      alert("Document name cannot be empty.");
  }
}

export function clearEditorText() {
  editor.innerHTML = ""; // Clear the content inside the editor
}