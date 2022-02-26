// I select the parent element
const body = document.querySelector("body")

// I select the reference element
const script = document.querySelector("script")

// I create a new user input
const label = document.createElement("label")

const input = document.createElement("input")
input.setAttribute("type", "text")
// input.setAttribute("value", "hello")

const button = document.createElement("button")
button.innerHTML = "Submit"

// I create a new h1 header element
const h1 = document.createElement("h1")

// Within the parent element, I insert an input element before the reference element
body.insertBefore(input, script)
body.insertBefore(button, script)
body.insertBefore(label, input).innerHTML = "Type your word here: "

// Within the parent element, I insert an h1 element before the reference element
body.insertBefore(h1, script)

function display(word) {
    // I add new text to the h1 element
    document.querySelector("h1").innerHTML = `The definition of ${word} is...`

    // This is the URL that will return the definition of 'hello' as a JSON object
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    get(url)

}

function addToDOM(responseText) {
    const para = document.createElement("p")
    let responseJSON = JSON.parse(responseText)
    
    body.insertBefore(para, script)

    let def = responseJSON[0].meanings[0].definitions[0].definition

    document.querySelector("p").innerHTML = def
}

function get(url) {
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url)
    httpRequest.send()
    httpRequest.onload = function () {
        addToDOM(httpRequest.responseText)
    }
}

button.onclick = function () {
    let word = document.querySelector("input").value
    display(word)
}