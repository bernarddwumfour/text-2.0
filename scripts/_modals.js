let editor = document.querySelector('.textEditor')
class Pagemodal {
    // #backdrop = document.getElementById('#modal');
    #button;  
    #modalcontent;
    #modal = document.querySelector('#dummymodal');
    #type;
    editor = document.querySelector(".textEditor");

    constructor(button, modalcontent, type) {
        this.#button = document.querySelector(button);
        this.#modalcontent = document.querySelector(modalcontent);
        this.#type = type;
        this.showModal();
    }

    #cloneContent = () => {
        let clone = this.#modalcontent.content.cloneNode(true);

        clone.querySelector('.modalCancel').addEventListener('click', () => {
            this.#modal.style.display = 'none';
        });

        let action = () => {
            if (this.#type == 'editText') {
                const texts = clone.querySelectorAll('span');
                const input = clone.querySelector('input');
                let actionButton = clone.querySelectorAll('.action')[0];
                // Variable to store the current selection
                let currentSelection;

                // Save the current selection before opening the modal
                const saveCurrentSelection = () => {
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        currentSelection = selection.getRangeAt(0);
                    }
                };

                saveCurrentSelection()

                // Restore the selection to its previous state
                const restoreSelection = () => {
                    if (currentSelection) {
                        const selection = window.getSelection();
                        selection.removeAllRanges(); // Clear existing selections
                        selection.addRange(currentSelection); // Restore the saved selection
                    }
                };

                // debugger
                for (let i = 0; i < texts.length; i++) {
                    texts[i].addEventListener('click', () => {
                        const emoji = texts[i].textContent;
                        input.value += emoji;
                    });
                }

                actionButton.addEventListener('click', () => {
                    restoreSelection()
                    this.editor.focus();
                    document.execCommand('insertText', false, input.value);
                    // this.editor.innerHTML += input.value
                    this.#modal.style.display = 'none';
                });
            } else if (this.#type == 'addGraph') {
                // alert("Add graph")
                let actionButton = clone.querySelectorAll('.action')[0];
                let graphType = clone.querySelector('div').dataset.graph;
                let labels = clone.querySelectorAll('input')[0];
                let values = clone.querySelectorAll('input')[1];
                let label = clone.querySelectorAll('input')[2];


                // console.log(graphType);
                actionButton.addEventListener('click', function () {
                    labels = labels.value.split(',');
                    values = values.value.split(',');
                    let backgroundColor = 'rgb(153, 102, 255)';
                    const colors = [
                        'rgb(255, 99, 132)', // Soft Red
                        'rgb(75, 192, 192)', // Teal
                        'rgb(54, 162, 235)', // Light Blue
                        'rgb(255, 206, 86)', // Soft Yellow
                        'rgb(153, 102, 255)', // Light Purple
                        'rgb(255, 159, 64)', // Orange
                        'rgb(100, 149, 237)', // Cornflower Blue
                        'rgb(255, 182, 193)', // Light Pink
                        'rgb(144, 238, 144)', // Light Green
                        'rgb(240, 128, 128)', // Light Coral
                        'rgb(255, 140, 0)', // Dark Orange
                        'rgb(173, 216, 230)', // Light Sky Blue
                        'rgb(255, 228, 181)', // Moccasin
                        'rgb(221, 160, 221)', // Plum
                        'rgb(250, 128, 114)', // Salmon
                        'rgb(124, 252, 0)', // Lawn Green
                        'rgb(135, 206, 250)', // Light Steel Blue
                        'rgb(255, 222, 173)', // Navajo White
                        'rgb(238, 130, 238)', // Violet
                        'rgb(176, 224, 230)', // Powder Blue
                    ];

                    if (graphType == 'pie') {
                        backgroundColor = [];
                        for (let i = 0; i < values.length; i++) {
                            backgroundColor.push(colors[i]);
                        }
                    }

                    label = label.value;
                    // console.log(labels,values)
                    
                    // Create a canvas element for the chart
                    const canvas = document.createElement('canvas');
                    canvas.width = 400; // Set width
                    canvas.height = 200; // Set height



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
                        wrapper.addEventListener("focus",()=>{
                            wrapper.style.border = '1px dashed #ccc'; // Optional: Add border for resizing visual
                        })
                        wrapper.addEventListener("blur",()=>{
                            wrapper.style.border = 'none'; // Optional: Add border for resizing visual
                        })
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
                      


                   

                    // Create a chart
                    const ctx = canvas.getContext('2d');
                    const chart = new Chart(ctx, {
                        type: `${graphType}`, // Type of chart
                        data: {
                            labels,
                            datasets: [
                                {
                                    label,
                                    data: values,
                                    backgroundColor,
                                    // borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: graphType != 'pie' && {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                    let wrapper = createResizableWrapper(canvas)

                    // Insert the canvas into the editor
                    editor.appendChild(wrapper);

                    // Example function to draw a simple line graph            
                    

                    // makeResizable(wrapper);

                    // Create a chart
                });
            } else if (this.#type == 'addLink') {
                const input = clone.querySelector('#link');
                const text = clone.querySelector('#linkText');
                let actionButton = clone.querySelectorAll('.action')[0];
                // Variable to store the current selection
                let currentSelection;

                // Save the current selection before opening the modal
                const saveCurrentSelection = () => {
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        currentSelection = selection.getRangeAt(0);
                    }
                };

                saveCurrentSelection()

                // Restore the selection to its previous state
                const restoreSelection = () => {
                    if (currentSelection) {
                        const selection = window.getSelection();
                        selection.removeAllRanges(); // Clear existing selections
                        selection.addRange(currentSelection); // Restore the saved selection
                    }
                };

                actionButton.addEventListener('click', () => {

                    this.editor.focus();
                    restoreSelection()
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const linkNode = document.createElement('a');
                    linkNode.href = input.value;
                    linkNode.textContent = text.value;
                    linkNode.target = "_blank"; // Open link in new tab
                    range.deleteContents(); // Remove the selected text
                    range.insertNode(linkNode); // Insert 

                    document.execCommand('createLink', input.value);
                    let links = this.editor.getElementsByTagName('a');
                    for (var i = 0; i < links.length; i++) {
                        links[i].setAttribute('target', '_blank');
                        links[i].setAttribute('style', 'color : blue');

                        links[i].addEventListener('click', () => {
                            window.open(event.target.href, '_blank');
                        });
                    }
                    this.#modal.style.display = 'none';
                });
            }
        };

        action();

        this.#modal.replaceChildren(clone);

        // console.log(modal)
    };

    showModal() {
        this.#button.addEventListener('click', () => {
            // alert("clicked")
            // debugger
            this.#modal.style.display = 'flex';
            this.#cloneContent(this.#modalcontent);
        });
        return;
    }

    hidemodal() {
        this.#button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        return;
    }
}

// window.addEventListener("load",()=>{

const emojiModal = new Pagemodal('#emoji', '#addEmojiModal', 'editText');
const equationModal = new Pagemodal(
    '#equation',
    '#addEquationModal',
    'editText',
);
  const specialCharacters = new Pagemodal(
    '#specialCharacters',
    '#addSpecialCharactersModal',
    'editText',
  );
const linkModal = new Pagemodal('#addLink', '#addLinkModal', 'addLink');
const pieChartModal = new Pagemodal(
    '#pieChart',
    '#addPieChartModal',
    'addGraph',
);
const lineChartModal = new Pagemodal(
    '#lineChart',
    '#addLineChartModal',
    'addGraph',
);
const barChartModal = new Pagemodal(
    '#barChart',
    '#addBarChartModal',
    'addGraph',
);
