var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition()
var synth = window.speechSynthesis

const dictAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const buttonFunctionA = "Listen"
const buttonFunctionB = "Stop"
let currentResult = {}

// On button click
document.querySelector("button").onclick = function () {
  // document.querySelector(".definition").innerHTML = ""
  if (document.querySelector("button").innerHTML == buttonFunctionA) {
    startRecogniton(buttonFunctionB)
  } else {
    stopRecognition(buttonFunctionA)
  }  
}

// On result from speech recognition
recognition.onresult = function (event) {
  let word = event.results[0][0].transcript
  console.log(word)
  if (word == "stop") {
    recognition.onend = function (event) {
      stopRecognition(buttonFunctionA)
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
    let speech = new SpeechSynthesisUtterance(textToRead)
    speech.onend = function(event) {
      startRecogniton(buttonFunctionB)
    }
    synth.speak(speech)
}

// Response handler
function responseHandler(responseStatus, responseText) {
    currentResult = JSON.parse(responseText)
    console.log(currentResult)
    if (responseStatus == 200) {
      definition = currentResult[0].meanings[0].definitions[0].definition
    } else {
      definition = "No matches"
    }
    stopRecognition(buttonFunctionA)
    readThis(definition)
}