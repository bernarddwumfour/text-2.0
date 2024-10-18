
// Helper function to get the maximum width of media
const getMaxMediaWidth = () => {
    const editorWidth = textEditor.clientWidth; // Get the width of the editor
    return editorWidth - 64; // 4rem = 64px, subtract it from the editor width
};

// Helper function to create a resizable wrapper around the media
export const createResizableWrapper = (mediaElement) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('resizable-wrapper');
    wrapper.style.maxWidth = getMaxMediaWidth() + 'px'; // Set max width
    wrapper.style.resize = 'both';
    wrapper.style.overflow = 'hidden'; // Ensure content doesn't overflow the wrapper
    wrapper.style.display = 'inline-block'; // Keep wrapper inline
    wrapper.style.padding = '0.5rem'; // Add padding for a nicer look
    wrapper.addEventListener("focus", () => {
        wrapper.style.border = '1px dashed #ccc'; // Optional: Add border for resizing visual
    })
    wrapper.addEventListener("blur", () => {
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


document.addEventListener("DOMContentLoaded", () => {
    const textEditor = document.getElementById('textEditor');

    // Function to create an SVG shape
    const createShape = (type, attributes) => {
        const svgNS = "http://www.w3.org/2000/svg";
        const shape = document.createElementNS(svgNS, type);

        Object.entries(attributes).forEach(([attr, value]) => {
            shape.setAttribute(attr, value);
        });

        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.float = 'left';
        svg.style.left = '0'
        svg.style.padding = "10px"// Keep SVG on the left
        svg.appendChild(shape);
        // Align wrapper to the left
        const wrapper = createResizableWrapper(svg);



        // Set maximum width and height based on the textEditor container
        const updateMaxSize = () => {
            const editorRect = textEditor.getBoundingClientRect();
            const padding = 60; // 3rem = 48px (Adjust width minus 3rem)
            // wrapper.style.maxWidth = `${editorRect.width - padding}px`;
            wrapper.style.maxWidth = `400px`;
            wrapper.style.maxHeight = `300px`; // Set max height to 400px
        };

        // Update the max size initially and on window resize
        updateMaxSize();
        window.addEventListener('resize', updateMaxSize); // Recalculate on window resize

        return wrapper;
    };

    // Function to insert shape in the editor
    const insertShape = (shapeElement) => {
        textEditor.appendChild(shapeElement);

    };

    // Insert Circle
    document.getElementById('insertCircleBtn').addEventListener('click', () => {
        const circle = createShape('circle', { cx: 50, cy: 50, r: 50, fill: 'none', stroke: 'black', 'stroke-width': 1 });
        insertShape(circle);
    });

    // Insert Rectangle
    document.getElementById('insertRectBtn').addEventListener('click', () => {
        const rect = createShape('rect', { width: 100, height: 60, x: 0, y: 0, fill: 'none', stroke: 'black', 'stroke-width': 1 });
        insertShape(rect);
    });

    // Insert Triangle
    document.getElementById('insertTriangleBtn').addEventListener('click', () => {
        const triangle = createShape('polygon', { points: '50,0 100,100 0,100', fill: 'none', stroke: 'black', 'stroke-width': 1 });
        insertShape(triangle);
    });

    // Insert Line
    // document.getElementById('insertLineBtn').addEventListener('click', () => {
    //     const line = createShape('line', { x1: 0, y1: 0, x2: 100, y2: 0, stroke: 'black', 'stroke-width': 1 });
    //     insertShape(line);
    // });
    // Insert Arrow
    document.getElementById('insertArrowBtn').addEventListener('click', () => {
        const arrow = createShape('polygon', {
            // points: '0,25 50,0 50,10 100,25 50,40 50,50', // Corrected points for right-pointing arrow
            points : "0,0 100,50 0,100 20, 50",
            fill: 'black',                               // Fill color of the arrow
            stroke: 'black',                             // Stroke color
            'stroke-width': 1
        });
        insertShape(arrow);
    });




});
