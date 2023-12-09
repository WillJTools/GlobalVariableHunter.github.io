function searchGlobals() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const content = e.target.result;
        const globalVars = findGlobalVariables(content);
        displayResults(globalVars);
      };
  
      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  }
  
  function findGlobalVariables(code) {
    // Implement logic to search for global variables in the code
    // This might involve using regular expressions or AST parsing
    // Example:
    const globalVarRegex = /(?:var|let|const)\s+(\w+)\s*=/g;
    const matches = code.match(globalVarRegex);
    if (matches) {
      return matches.map(match => match.replace(/(var|let|const)\s+/, ''));
    } else {
      return [];
    }
  }
  
  function displayResults(variables) {
    const resultContainer = document.getElementById('result');
    if (variables.length > 0) {
      resultContainer.textContent = 'Global Variables found:\n' + variables.join('\n');
    } else {
      resultContainer.textContent = 'No global variables found.';
    }
  }
  