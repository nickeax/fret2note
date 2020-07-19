const MAX_LEN = 6;
const inp = document.querySelector('#inp')
const output = document.querySelector('#output')
const list = document.querySelector('#list')
let allChordsArr = []
let allFretBoardsArr = []
const frets = [
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']
]

class FretPosition {
    segment
    constructor(type, note, isFirst, stringNum) {
        this.createSegment(type, note, isFirst, stringNum)
    }

    createSegment(t, nte, isFirst, stringNum) {
        let tmpCont = newElement('span', ['segmentContainer'])

        let CL = []
        CL.push('segment')
        CL.push(`string${stringNum}`)
        CL.push(t === 'note' ? 'segment--note' : 'segment--empty')
        CL.push(isFirst ? 'nut' : 'segment--empty')
        let tmp = newElement('span', CL)
        
        let DCL = []
        DCL.push(t === 'note' ? 'dot' : 'dot--hidden')
        DCL.push(isFirst ? 'nutNote' : 'dot-hidden')
        let dot = newElement('span', DCL)
        dot.innerHTML = nte || "&nbsp"
        tmp.appendChild(dot)
        tmpCont.appendChild(tmp)
        this.segment = tmpCont
    }
    draw(parent) {
        parent.appendChild(this.segment)
    }

    newString() {

    }
}

class FretBoard {
    base
    strings
    fretNumber
    stringNumber
    inputFrets = []

    constructor(str, fn = 7, sn = 6) {
        this.strings = []
        this.fretNumber = fn
        this.stringNumber = sn
        this.base = document.createElement('div')
        this.base.classList.add('fretboard', 'base')
        let tmpArr = str.split('')//.reverse()
        this.inputFrets = tmpArr.map(x => {
            return parseInt(x)
        })

        for (let i = this.stringNumber - 1; i >= 0; i--) {
            let tmpSeg = []
            for (let y = 0; y < this.fretNumber; y++) {
                let flag = false;
                if (this.inputFrets[i] === y) {
                    tmpSeg.push(new FretPosition('note', translateFretNumber(y, i), y == 0, i))
                } else {
                    tmpSeg.push(new FretPosition('empty', "", y == 0, i))
                }
            }
            this.strings.push(tmpSeg)
        }
    }

    draw(parent) {
        this.strings.forEach(x => {
            for (let i = 0; i < x.length; i++) {
                x[i].draw(parent)
            }
            parent.innerHTML += "<br>"
        })
    }
}

inp.addEventListener('keyup', (eve) => {
    
    inp.value = isALlowed(inp.value)
    // if(eve.keyCode < 48 || eve.keyCode >= 57) {
    //     inp.value = ""
    //     return
    // }
    displayOutput(inp.value)
})

inp.focus()

function isALlowed(chr) {
    let tmpArr = chr.split('')
    tmpArr = tmpArr.filter(x => {
        return (parseInt(x) >= 0 && parseInt(x) <= 9 || x === 'x'.toLowerCase())
    })

    return tmpArr.join('')
}

function newElement(type, cl) {
    let tmp = document.createElement(type)
    tmp.classList.add(...cl)
    return tmp
}
function displayOutput(str) {
    if (str.length > MAX_LEN) str = str.slice(0, MAX_LEN)
    let tmpArr = str.split('')
    let tmpArr2 = []
    let tmpStr = ""
    let builder = ""
    let tmpBtn = document.createElement('button')
    if(inp.value.length > 0) {
        tmpBtn.innerText = "SAVE"
    } else {
        tmpBtn.innerHTML = ""
    }

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
        allFretBoardsArr.push(new FretBoard(inp.value))
        saveChord(tmpArr2)
        tmpArr2 = []
        inp.value = ""
        tmpBtn.style.display = 'none'
    })
}

function displayChord(str) {
    let fb = new FretBoard(str)
    fb.draw(prt)
}

function saveChord(arr) {
    // inp.value = ""
    inp.focus()
    allChordsArr.push(arr)
    arr = []
    showAll()
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showAll() {
    removeAllChildNodes(list)

    allFretBoardsArr.forEach((x, i) => {
        let fbAnchor = newElement('div', ['listRow'])
        fbAnchor.innerHTML = drawNotesRow(i)
        x.draw(fbAnchor)
        list.appendChild(fbAnchor)
    })

}

function drawNotesRow(row) {
    let tmp = ""
    tmp = `<div class="notesRow">`
    allChordsArr[row].forEach((x, i) => {
        if (i + 1 % MAX_LEN === 0) tmp += `<br />`
        tmp += `<div class="listCellParent"><span class="listCell  ${selectAnim()}">${x}</span></div>`
    })
    tmp += `</div>`
    return tmp
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
    let styles = ["anim1", "anim2", "anim3"]
    return styles[Math.floor(Math.random() * styles.length)]
}