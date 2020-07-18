const MAX_LEN = 6;
const inp = document.querySelector('#inp')
const output = document.querySelector('#output')
const list = document.querySelector('#list')
let allChordsArr = []
const frets = [
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']
]

class fretBoard {
    base
    strings

    constructor(str) {
        this.base = document.createElement('div')
        this.base.classList.add('fretboard base')    

        
        
        this.strings = [

        ]
    }
    draw() {
        
    }
}

// fretPostion objects represent a segment of the fretboard where there can be a note, or no note
// They are responsible for drawing the visible portion of the fretboard object
class fretPosition {
    empty
    note

    constructor(type) {
        if(type === 'note') {
            this.
        }
    }
}

inp.addEventListener('keyup', (eve) => {
    displayOutput(inp.value)
})

inp.focus()

function displayOutput(str) {
    if (str.length > MAX_LEN) str = str.slice(0, MAX_LEN)
    let tmpArr = str.split('')
    let tmpArr2 = []
    let tmpStr = ""
    let builder = ""
    let tmpBtn = document.createElement('button')
    tmpBtn.innerText = "SAVE"

    tmpArr.forEach((x, i) => {
        tmpArr2.push(translateFretNumber(x, i))
    })

    output.innerHTML = ""
    tmpArr2.forEach((x, i) => {
        tmpStr += `${x} `
        output.innerHTML += `<span class="noteCell">${x}</span>`
    })

    output.innerHTML += builder
    builder += `<span>${tmpStr}</span>`
    output.appendChild(tmpBtn)
    tmpBtn.addEventListener('click', ev => {
        saveChord(tmpArr2)
    })
}

function displayChord(str) {
    
}

function saveChord(arr) {
    inp.value = ""
    inp.focus()
    allChordsArr.push(arr)
    showAll()
}

function showAll() {
    let tmp = ""
    let plainText = []

    allChordsArr.forEach((x) => {
        tmp += `<div class='listRow'>`
        x.forEach((y, i) => {
            if (i + 1 % MAX_LEN === 0) tmp += `YAY!<br />`
            tmp += `<span class="listCell  ${selectAnim()}">${y}</span>`
        })

        x.forEach(y => {
            plainText.push(`${y} `)
        })
        
        tmp += ` ${plainText.join('')}</div>`
        list.innerHTML = tmp
        plainText = []
    })
}

function translateFretNumber(number, str) {
    if (number === 'x' || number === 'X') return 'X'
    return frets[str][parseInt(number)]
}

function padStart(str, len) {
    let tmp = "";
    for (let i = len - str.length; i < len; i++) {
        tmp += `0${tmp}`
    }
}

function selectAnim() {
    let styles = ["anim1","anim2", "anim3"]
    return styles[Math.floor(Math.random() * styles.length)]
}