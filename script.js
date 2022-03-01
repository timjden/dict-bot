function display(word) {
    
    document.querySelector(".definition-title").innerHTML = `The definition of ${word} is...`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    get(url)

}

function addToDOM(responseText) {
    let responseJSON = JSON.parse(responseText)
    let def = responseJSON[0].meanings[0].definitions[0].definition
    document.querySelector(".definition").innerHTML = def
}

function get(url) {
    let httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url)
    httpRequest.send()
    httpRequest.onload = function () {
        addToDOM(httpRequest.responseText)
    }
}

const button = document.querySelector(".submit")

button.onclick = function () {
    let word = document.querySelector(".word").value
    console.log(word)
    display(word)
}