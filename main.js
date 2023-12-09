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
  const variables = [];

  if (matches) {
    matches.forEach(match => {
      const varName = match.split(/\s+/)[1];
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    });
  }

  return variables;
}

function displayResults(variables) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  const noVarsMessage = document.createElement('p');
  noVarsMessage.textContent = 'No global variables found in this code.';
  
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
    resultContainer.appendChild(noVarsMessage);
  }
}
