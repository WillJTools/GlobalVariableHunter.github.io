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
  const globalVarRegex = /\b(var|let|const)\s+(\w+)\b/g;
  const matches = code.match(globalVarRegex);
  
  if (matches) {
    const uniqueVars = [...new Set(matches.map(match => match.split(/\s+/)[1]))];
    return uniqueVars;
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
