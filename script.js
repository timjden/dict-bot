function search(word) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  get(url)
}

function addToDOM(responseStatus, responseText) {
  let responseJSON = JSON.parse(responseText)
  let def

  if (responseStatus == 200) {
    // document.querySelector(".definition-title").innerHTML = `The definition of ${responseJSON[0].word} is...`
    def = responseJSON[0].meanings[0].definitions[0].definition
    document.querySelector(".definition").innerHTML = def
  } else {
    def = responseJSON.title
    document.querySelector(".definition").innerHTML = def
  }
}

function get(url) {
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url)
    // Assigns a function to XMLHttpRequest object's onload event 
    // handler which fires when a request is completed sucessfully
    httpRequest.onload = function () {
        addToDOM(httpRequest.status, httpRequest.responseText)
    }
    httpRequest.send()
}

// On button click
const button = document.querySelector(".submit")

button.onclick = function () {
  let word = document.querySelector(".word").value
  // document.querySelector(".definition-title").innerHTML = ""
  document.querySelector(".definition").innerHTML = ""
  search(word)
}

// On 'Enter'
const input = document.querySelector(".word")

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    button.click()
  }
})