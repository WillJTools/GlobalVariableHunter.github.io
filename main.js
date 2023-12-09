function searchGlobals() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const content = e.target.result;
      const wordsWithA = findWordsWithA(content);

      if (wordsWithA.length > 0) {
        displayResults(wordsWithA);
      } else {
        displayNoWordsFound();
      }
    };

    reader.readAsText(file);
  } else {
    alert('Please select a file.');
  }
}

function findWordsWithA(code) {
  const words = code.split(/\b\W+\b/);
  const wordsWithA = words.filter(word => /a/i.test(word));
  return wordsWithA;
}

function displayResults(words) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Words with the letter "A":';
  resultContainer.appendChild(heading);

  const list = document.createElement('ul');
  words.forEach(word => {
    const listItem = document.createElement('li');
    listItem.textContent = word;
    list.appendChild(listItem);
  });
  resultContainer.appendChild(list);
}

function displayNoWordsFound() {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  const noWordsMessage = document.createElement('p');
  noWordsMessage.textContent = 'No words found containing the letter "A".';
  resultContainer.appendChild(noWordsMessage);
}
