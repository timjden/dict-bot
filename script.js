var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
// recognition.maxAlternatives = 1
var synth = window.speechSynthesis;

function search(word) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  get(url)
}

function addToDOM(responseStatus, responseText) {
  let responseJSON = JSON.parse(responseText)
  let def

  if (responseStatus == 200) {
    def = responseJSON[0].meanings[0].definitions[0].definition
    document.querySelector(".definition").innerHTML = def
    talk(def)
  } else {
    def = responseJSON.title
    document.querySelector(".definition").innerHTML = def
  }
}

function get(url) {
  let httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', url)
  httpRequest.onload = function () {
    addToDOM(httpRequest.status, httpRequest.responseText)
  }
  httpRequest.send()
}

function talk(sayThis) {
  recognition.stop()
  let speech = new SpeechSynthesisUtterance(sayThis)
  speech.onend = function () {
    // if (document.querySelector(".word").value.toLowerCase() !== 'thank you') {
    //   recognition.start()
    // } else {
    // }
  }
  synth.speak(speech)
}

// Set speech recognition event
recognition.onresult = function (event) {
  console.log('recognition onresult')
  let word = event.results[0][0].transcript
  document.querySelector(".word").value = word
  search(word)
}

// On button click
const button = document.querySelector(".submit")

button.onclick = function () {
  document.querySelector(".definition").innerHTML = ""
  recognition.start();
  console.log('recognition start')
}

// On 'Enter'
const input = document.querySelector(".word")

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault()
    button.click()
  }
})