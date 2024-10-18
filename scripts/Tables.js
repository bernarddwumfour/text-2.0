(function () {
    const insertTableBtn = document.getElementById('insertTableBtn');
    const textEditor = document.getElementById('textEditor');
  
    // Function to insert a table
    function insertTable() {
      const rows = prompt("Enter the number of rows:", "3");
      const cols = prompt("Enter the number of columns:", "3");
  
      if (!rows || !cols || isNaN(rows) || isNaN(cols)) {
        alert("Please enter valid numbers for rows and columns.");
        return;
      }
  
      const table = document.createElement('table');
      table.classList.add('resizable-table');
  
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
          const cell = i === 0 ? document.createElement('th') : document.createElement('td');
          cell.textContent = i === 0 ? `Header ${j + 1}` : `Row ${i + 1} Col ${j + 1}`;
          tr.appendChild(cell);
        }
        table.appendChild(tr);
      }
  
      insertElementAtCaret(table);
      makeResizable(table);
  
      // Add event listener for double-click to modify rows and columns
      table.addEventListener('dblclick', function() {
        modifyTable(table);
      });
    }
  
    // Function to modify the table structure (rows and columns) on double-click
    function modifyTable(table) {
      const rows = prompt("Enter the new number of rows:", table.rows.length);
      const cols = prompt("Enter the new number of columns:", table.rows[0].cells.length);
  
      if (!rows || !cols || isNaN(rows) || isNaN(cols)) {
        alert("Please enter valid numbers for rows and columns.");
        return;
      }
  
      const currentRows = table.rows.length;
      const currentCols = table.rows[0].cells.length;
  
      // Adjust the number of rows
      if (rows > currentRows) {
        // Add rows
        for (let i = currentRows; i < rows; i++) {
          const tr = document.createElement('tr');
          for (let j = 0; j < cols; j++) {
            const cell = i === 0 ? document.createElement('th') : document.createElement('td');
            cell.textContent = i === 0 ? `Header ${j + 1}` : `Row ${i + 1} Col ${j + 1}`;
            tr.appendChild(cell);
          }
          table.appendChild(tr);
        }
      } else if (rows < currentRows) {
        // Remove rows
        for (let i = currentRows - 1; i >= rows; i--) {
          table.deleteRow(i);
        }
      }
  
      // Adjust the number of columns
      for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const currentCells = row.cells.length;
  
        if (cols > currentCells) {
          // Add columns
          for (let j = currentCells; j < cols; j++) {
            const cell = i === 0 ? document.createElement('th') : document.createElement('td');
            cell.textContent = i === 0 ? `Header ${j + 1}` : `Row ${i + 1} Col ${j + 1}`;
            row.appendChild(cell);
          }
        } else if (cols < currentCells) {
          // Remove columns
          for (let j = currentCells - 1; j >= cols; j--) {
            row.deleteCell(j);
          }
        }
      }
    }
  
    function insertElementAtCaret(element) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(element);
      selection.removeAllRanges();
    }
  
    // Function to make the table resizable
    function makeResizable(table) {
      let isResizing = false;
      let lastX = 0;
      let lastY = 0;
  
      const editorComputedStyle = window.getComputedStyle(textEditor);
      const editorPadding = parseFloat(editorComputedStyle.paddingLeft) + parseFloat(editorComputedStyle.paddingRight);
      const maxTableWidth = textEditor.clientWidth - editorPadding;
  
      table.style.maxWidth = `${maxTableWidth}px`;
  
      table.addEventListener('mousedown', function (e) {
        if (e.target === table) {
          isResizing = true;
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
  
      window.addEventListener('mousemove', function (e) {
        if (isResizing) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
  
          const newWidth = table.clientWidth + dx;
          const newHeight = table.clientHeight + dy;
  
          if (newWidth <= maxTableWidth) {
            table.style.width = `${newWidth}px`;
          }
          table.style.height = `${newHeight}px`;
  
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
  
      window.addEventListener('mouseup', function () {
        if (isResizing) {
          isResizing = false;
        }
      });
    }
  
    insertTableBtn.addEventListener('click', insertTable);
  })();
  