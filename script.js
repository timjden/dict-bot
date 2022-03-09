// Function to make a network request using XMLHttpRequest.
function makeNetworkRequest(url) {
  const promise = new Promise((resolve) => {
    const httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url)
    httpRequest.send()
    httpRequest.onload = function () {
      resolve({
        status: httpRequest.status,
        body: httpRequest.responseText
      })
    }
  })

  return promise
}

// Function to return the definition of a word by making a network request.
function getDefinition(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const promise = makeNetworkRequest(url)
  return promise.then(({ status, body }) => {
    if (status === 200) {
      const definition = JSON.parse(body)
      return definition[0].meanings[0].definitions[0].definition
    } else {
      throw new Error('Failed to fetch definition. Please check your network.')
    }
  })
}

// Input element
const inputElement = document.querySelector(".word")
// Button element
const buttonElement = document.querySelector(".submit")
// Definition element
const definitionElement = document.querySelector(".definition")
// Word element
const wordElement = document.querySelector(".word")

document.querySelectorAll('.image').forEach((e) => e.style.display = 'none')

function handleDefinitionSearch() {
  // Clear any previous definition.
  definitionElement.innerHTML = ""

  // Show an validation error message if there is no word.
  const word = wordElement.value
  if (word === '') {
    definitionElement.innerHTML = 'Please enter a valid word to search for.'
    return
  }

  // Add a loading text to the button
  buttonElement.innerHTML = 'Searching...'

  // Get the definition, then set the definition element's innerHTML to the definition.
  getDefinition(word).then((definition) => {
    document.querySelectorAll('.image').forEach((e) => e.style.display = 'block')
    definitionElement.innerHTML = definition
  }).catch(() => {
    definitionElement.innerHTML = 'Failed to search for definition, please try again.'
  }).finally(() => {
    buttonElement.innerHTML = 'Search'
  })
}

// Add onClick handler to button element.
buttonElement.onclick = function () {
  handleDefinitionSearch()
}

// Add keyup eventListener to input element.
inputElement.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    handleDefinitionSearch()
  }
})