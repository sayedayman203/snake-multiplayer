//Variables
let ui = document.getElementById('ui')
let game = document.getElementById('game')

let back = document.querySelector('div.back')
let PTId = document.querySelectorAll('table.ptable tr')[0]
let PTColor = document.querySelectorAll('table.ptable tr')[1]
let PTControl = document.querySelectorAll('table.ptable tr')[2]
let PTScore = document.querySelectorAll('table.ptable tr')[3]
    //Interface - Main
let gameInterface = document.getElementById("interface")
let openGame = document.querySelector("#interface .play")
let openSettings = document.querySelector("#interface .options")
    //Options - Main
let gameOptions = document.getElementById("options")
let OB = document.querySelector('#options .buttons')
let OCNB = document.querySelector("#options .buttons .cnumber")
let OCCB = document.querySelector("#options .buttons .ccolor")
let OcontrolB = document.querySelector("#options .buttons .ccontrol")
let OScoreB = document.querySelector("#options .buttons .cscore")
    //Options - Change Number
let OCND = document.querySelector("#options .changenumber")
let OCNInput = document.querySelector("#options .changenumber input")
let OCNSave = document.querySelector("#options .changenumber button")
    //Options - Change Color
let OCCD = document.querySelector("#options .changecolor")
let OCCPlayer = document.querySelector("#options .changecolor input[name='playernum']")
let OCCColor = document.querySelectorAll("#options .changecolor .colors input")
let OCCSave = document.querySelector("#options .changecolor button")
    //Options - Change Control
let control = document.querySelector("#options .control")
let controlPlayer = document.querySelector("#options .control input[name='playernum']")
let controlButtons = document.querySelectorAll("#options .control .pcontrol input")
let controlSave = document.querySelector("#options .control button")
    //Options - Change Score
let score = document.querySelector("#options .changescore")
let scoreInput = document.querySelector("#options .changescore input")
let scoreSave = document.querySelector("#options .changescore button")
// Player Table
function refreshT() {
    PTId.innerHTML = '<th>Player id</th>'
    PTColor.innerHTML = '<th>Color</th>'
    PTControl.innerHTML = '<th>Control</th>'
    PTScore.innerHTML = '<th>Final Score</th>'

        // id
    if (localStorage.getItem('NumOfPlayers') == null) {
        localStorage.setItem('NumOfPlayers', '1')
        localStorage.setItem('Player 1 color', '#f00')
        localStorage.setItem('Player 1 control', 'ArrowUp ArrowDown ArrowLeft ArrowRight')
    }
    for (let i=1; i <= localStorage.getItem('NumOfPlayers'); i++) {
        let td = document.createElement('td')
        td.innerHTML = i
        PTId.appendChild(td)
    }
        // color
    for (let i=1; i <= localStorage.getItem('NumOfPlayers'); i++) {
        let td = document.createElement('td')
        if (localStorage.getItem(`Player ${i} color`) != null) {
            td.style.backgroundColor = localStorage.getItem(`Player ${i} color`)
            PTColor.appendChild(td)
        } else {
            td.innerHTML = '-'
            PTColor.appendChild(td)
        }
    }
        // control
    for (let i=1; i <= localStorage.getItem('NumOfPlayers'); i++) {
        let td = document.createElement('td')
        if (localStorage.getItem(`Player ${i} control`) != null) {
            let keys = localStorage.getItem(`Player ${i} control`).split(' ')
            td.innerHTML = `Up: ${keys[0]} | Down: ${keys[1]} | Left: ${keys[2]} | Right: ${keys[3]}`
            PTControl.appendChild(td)
        } else {
            td.innerHTML = '-'
            PTControl.appendChild(td)
        }
    }

    let scoretd = document.createElement('td')
    scoretd.colSpan = localStorage.getItem('NumOfPlayers')
    if (localStorage.getItem(`score`) != null) {
        scoretd.innerHTML = localStorage.getItem(`score`) + ' Point'
    } else {
        localStorage.setItem(`score`, '20')
        scoretd.innerHTML = localStorage.getItem(`score`) + ' Point'
    }
    PTScore.appendChild(scoretd)
}
refreshT()
// Functions
back.onclick = () => {
    if (OB.style.display == 'block') {
        gameInterface.style.display = 'block'
        gameOptions.style.direction = 'none'
        OB.style.display = 'none'
        back.style.display = 'none'
    } else if (OCND.style.display == 'block') {
        OB.style.display = 'block'
        OCND.style.display = 'none'
    } else if (OCCD.style.display == 'block') {
        OB.style.display = 'block'
        OCCD.style.display = 'none'
    } else if (control.style.display == 'block') {
        OB.style.display = 'block'
        control.style.display = 'none'
    } else if (score.style.display == 'block') {
        OB.style.display = 'block'
        score.style.display = 'none'
    }
}
    //Interface
function checkSett() {
    for (let i=0; i < localStorage.getItem("NumOfPlayers"); i++) {
        if (localStorage.getItem(`Player ${i+1} color`) == null) {
            alert(`Please Choose A Color For Player ${i+1}`)
            return false
        } else if (localStorage.getItem(`Player ${i+1} control`) == null) {
            alert(`Please Choose A Control Keys For Player ${i+1}`)
            return false
        }
    }
    return true
}
openGame.onclick = () => {
    if (checkSett()) {
        ui.style.display = 'none'
        game.style.display = 'block'
        gameStart()
    }
}
openSettings.onclick = () => {
    gameInterface.style.display = 'none'
    gameOptions.style.display = 'block'
    OB.style.display = 'block'
    if (back.style.display = 'none') {
        back.style.display = 'block'
    }
}
    //Options - Main
OCNB.onclick = () => {
    OB.style.display = 'none'
    OCND.style.display = 'block'
    if (back.style.display = 'none') {
        back.style.display = 'block'
    }
}

OCCB.onclick = () => {
    OB.style.display = 'none'
    OCCD.style.display = 'block'
    if (back.style.display = 'none') {
        back.style.display = 'block'
    }
}
OcontrolB.onclick = () => {
    OB.style.display = 'none'
    control.style.display = 'block'
    if (back.style.display = 'none') {
        back.style.display = 'block'
    }
}

OScoreB.onclick = () => {
    OB.style.display = 'none'
    score.style.display = 'block'
    if (back.style.display = 'none') {
        back.style.display = 'block'
    }
}
    //Options - Change Number
OCNInput.onkeydown = (e) => {
    if (isNaN(parseInt(e.key)) && e.key != 'Backspace') {
        e.preventDefault()
    }
}
OCNSave.onclick = () => {
    if (!isNaN(parseInt(OCNInput.value)) && parseInt(OCNInput.value) <= 5 && parseInt(OCNInput.value) >= 0) {
        localStorage.setItem("NumOfPlayers", parseInt(OCNInput.value))
        alert("Done.")
    } else {
        alert("Please enter a real number (1-5).")
    }
    refreshT()
}
    //Options - Change Color
OCCPlayer.onkeydown = (e) => {
    if (isNaN(parseInt(e.key)) && e.key != 'Backspace') {
        e.preventDefault()
    }
}
OCCSave.onclick = () => {
    if (!isNaN(parseInt(OCCPlayer.value)) && parseInt(OCCPlayer.value) <= localStorage.getItem('NumOfPlayers') && parseInt(OCCPlayer.value) >= 0) {
        for(let i = 0; i < OCCColor.length; i++) {
            if(OCCColor[i].checked) {
                localStorage.setItem(`Player ${OCCPlayer.value} color`, `${OCCColor[i].value}`)
            }
        }
    } else {
        alert(`Please Enter A Valid Player Num (1-${localStorage.getItem('NumOfPlayers')})`)
    }
    refreshT()
}

// Control
controlPlayer.onkeydown = (e) => {
    if (isNaN(parseInt(e.key)) && e.key != 'Backspace') {
        e.preventDefault()
    }
}
for (let i=0;i < controlButtons.length; i++) {
    controlButtons[i].onkeydown = (e) => {
        if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowRight' || e.key == 'ArrowLeft') {
            e.preventDefault
            controlButtons[i].value = e.key
        } else {
            controlButtons[i].value = ''
        }
    }
}

controlSave.onclick = () => {
    if (!isNaN(parseInt(controlPlayer.value)) && parseInt(controlPlayer.value) <= localStorage.getItem('NumOfPlayers') && parseInt(controlPlayer.value) >= 0) {
            localStorage.setItem(`Player ${controlPlayer.value} control`, `${controlButtons[0].value} ${controlButtons[1].value} ${controlButtons[2].value} ${controlButtons[3].value}`)
    } else {
        alert(`Please Enter A Valid Player Num (1-${localStorage.getItem('NumOfPlayers')})`)
    }
    refreshT()
}


// Score
scoreInput.onkeydown = (e) => {
    if (isNaN(parseInt(e.key)) && e.key != 'Backspace') {
        e.preventDefault()
    }
}
scoreSave.onclick = () => {
    if (!isNaN(parseInt(scoreInput.value)) && parseInt(scoreInput.value) >= 0) {
        localStorage.setItem("score", parseInt(scoreInput.value))
        alert("Done.")
    } else {
        alert("Please enter a real number.")
    }
    refreshT()
}