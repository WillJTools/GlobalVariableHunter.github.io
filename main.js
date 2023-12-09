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
  const globalVarRegex = /\b(?:var|let|const)\s+(\w+)/g;
  const matches = code.match(globalVarRegex);
  return matches ? matches.map(match => match.split(/\s+/)[1]) : [];
}

function displayResults(variables) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  if (variables.length > 0) {
    const heading = document.createElement('h2');
    heading.textContent = 'Global Variables found:';
    resultContainer.appendChild(heading);

    const list = document.createElement('ul');
    variables.forEach(variable => {
      const listItem = document.createElement('li');
      listItem.textContent = variable;
      list.appendChild(listItem);
    });
    resultContainer.appendChild(list);
  } else {
    const noVarsMessage = document.createElement('p');
    noVarsMessage.textContent = 'No global variables found in this code.';
    resultContainer.appendChild(noVarsMessage);
  }
}
