var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition()
var synth = window.speechSynthesis

const dictAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const buttonFunctionA = "Listen"
const buttonFunctionB = "Stop"
let currentResult = {}
let counter = 0

// On button click
document.querySelector("button").onclick = function () {
  if (document.querySelector("button").innerHTML == buttonFunctionA) {
    startRecogniton(buttonFunctionB)
  } else {
    recognition.onend = function (event) {
      stopRecognition(buttonFunctionA)
    }
    stopRecognition(buttonFunctionA)
  }
}

// On result from speech recognition
recognition.onresult = function (event) {
  document.querySelector(".definition").innerHTML = ""
  let word = event.results[0][0].transcript
  if (!(word == "next") && !(word == "stop")) {
    document.querySelector("input").value = word
  }
  console.log(word)

  if (word == "stop") {
    recognition.onend = function (event) {
      stopRecognition(buttonFunctionA)
    }
  } else if (word == "next") {
    if (!(Object.keys(currentResult).length === 0)) {
      if (currentResult[0].meanings.length > 0) {
        counter++
        if (!(counter >= currentResult[0].meanings.length)) {
          let nextDefinition = currentResult[0].meanings[counter].definitions[0].definition
          let nextPartOfSpeech = currentResult[0].meanings[counter].partOfSpeech
          readThis(`${nextPartOfSpeech.charAt(0).toUpperCase() + nextPartOfSpeech.slice(1)}. ${nextDefinition.charAt(0).toUpperCase() + nextDefinition.slice(1)}`)
        } else {
          readThis("No more definitions.")
          counter = 0
          currentResult = {}
        }
      }
    } else {
      readThis("Next is a reserved word. Request a definition before using the 'next' keyword")
    }
  } else {
    get(dictAPI + word)
  }
}

// On end of speech recognition
recognition.onend = function (event) {
  if (!synth.speaking) {
    startRecogniton(buttonFunctionB)
  }
}

// Functions

// Start recognition
function startRecogniton(buttonName) {
  console.log("Listening...")
  document.querySelector("button").innerHTML = buttonName
  recognition.start()
}

// Stop recognition
function stopRecognition(buttonName) {
  document.querySelector("button").innerHTML = buttonName
  recognition.stop()
}

// Search dictionary via API
function get(url) {
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url)
    httpRequest.onload = function () {
      currentResult = httpRequest.responseText
      responseHandler(httpRequest.status, httpRequest.responseText)
    }
    httpRequest.send()
  }

// Say definition
function readThis(textToRead) {
  document.querySelector(".definition").innerHTML = textToRead
  let speech = new SpeechSynthesisUtterance(textToRead)
  speech.onend = function(event) {
    startRecogniton(buttonFunctionB)
  }
  synth.speak(speech)
}

// Response handler
function responseHandler(responseStatus, responseText) {
  console.log(responseText)  
  currentResult = JSON.parse(responseText)
  let definition = ""
  let partOfSpeech = ""

  if (responseStatus == 200) {
    definition = currentResult[0].meanings[0].definitions[0].definition
    partOfSpeech = currentResult[0].meanings[0].partOfSpeech
  } else {
    definition = "No matches"
  }

  stopRecognition(buttonFunctionA)
  let sayThis = `${partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}. ${definition.charAt(0).toUpperCase() + definition.slice(1)}`
  console.log(sayThis)
  readThis(sayThis)
}