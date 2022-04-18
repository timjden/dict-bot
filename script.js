function httpRequest (url) {
  let response = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.responseText)
      } else {
        reject(request.responseText)
      }
    }

    request.open("GET", url)
    request.send()
    
  })

  return response

}

function handleResponse(word) {
  httpRequest(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((okResponse) => {
    return JSON.parse(okResponse)[0].meanings[0].definitions[0].definition
  }).catch((badResponse) => {
    return JSON.parse(badResponse).message
  })
}

let result = handleResponse("hello")

const inputElement = document.querySelector(".word")
const buttonElement = document.querySelector(".submit")
const definitionElement = document.querySelector(".definition")
const wordElement = document.querySelector(".word")

function searchForWord (word) {
  let definition = handleResponse(word)
  definitionElement.innerHTML = ""
}

buttonElement.onclick = function () {
  searchForWord(wordElement)
}

// Add keyup eventListener to input element.
inputElement.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    searchForWord(wordElement)
  }
})

