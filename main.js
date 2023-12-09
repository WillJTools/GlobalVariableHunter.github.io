function searchGlobals() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const content = e.target.result;
      const wordsWithA = findWordsWithA(content);
      displayResults(wordsWithA);
    };

    reader.readAsText(file);
  } else {
    alert('Please select a file.');
  }
}

function findWordsWithA(code) {
  // Splitting code content into words
  const words = code.split(/\b\W+\b/);
  // Filtering words that contain 'a' or 'A'
  const wordsWithA = words.filter(word => /a/i.test(word));
  return wordsWithA;
}

function displayResults(words) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  if (words.length > 0) {
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
  } else {
    const noWordsMessage = document.createElement('p');
    noWordsMessage.textContent = 'No words found containing the letter "A".';
    resultContainer.appendChild(noWordsMessage);
  }
}
