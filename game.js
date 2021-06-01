function gameStart() {
    // Var
    let game = document.getElementById('game')
    game.innerHTML = '<div class="score"></div><div class="box" id="food"></div>'

    let score = document.querySelector('#game .score')

    // Global Object
    function item(shape, x, y) {
        this.shape = shape
        this.x = x
        this.y = y

        this.shape.style.left = x + 'px'
        this.shape.style.top = y + 'px'
    }
    // Objects
    function player(shape, x, y) {
        item.call(this, shape, x, y)

        this.moveUp = function () {
            this.y -= 20
            this.shape.style.top = this.y + 'px'
        }

        this.moveDown = function () {
            this.y += 20
            this.shape.style.top = this.y + 'px'
        }

        this.moveRight = function () {
            this.x += 20
            this.shape.style.left = this.x + 'px'
        }

        this.moveLeft = function () {
            this.x -= 20
            this.shape.style.left = this.x + 'px'
        }
    }

    function food(shape, x, y) {
        item.call(this, shape, x, y)
    }


    // Create Objects         // Finished
    
    let myPlayers = [] 
    let myFoodEle = document.getElementById('food')

    for (let i=0; i < localStorage.getItem('NumOfPlayers'); i++) {
        myPlayers[i] = document.createElement('div')
        myPlayers[i].classList.add(`snake`, `player${i+1}`)
        snakehead = document.createElement('div')
        snakehead.classList.add("box", "head")

        myPlayers[i].appendChild(snakehead)

        snakeScore = document.createElement('div')
        snakeScore.classList.add('sscore', `player${i+1}`)
        snakeScore.innerHTML = '0'
        score.appendChild(snakeScore)
        game.appendChild(myPlayers[i])
        if (i != localStorage.getItem('NumOfPlayers') - 1) {
            score.append("-")
        }
        for(let j=0; j < myPlayers[i].children.length; j++) {
            myPlayers[i].children[j].style.backgroundColor = localStorage.getItem(`Player ${i+1} color`)
        }
    }

    let myBranchs = document.querySelectorAll('#game .snake')

    function cP(dir) {     // Create Posion
        let myP = Math.round(Math.random()*dir)
        return myP - myP%20
    }

    let mySnakes = []
    for (let i=0; i < localStorage.getItem('NumOfPlayers'); i++) {
        mySnakes[i] = new player(myPlayers[i].children[0], cP(window.innerWidth -20), cP(window.innerHeight - 20))
    }

    let myFood = new food(myFoodEle, cP(window.innerWidth - 20), cP(window.innerHeight - 20))

    // Branches          // Finished
    function branchmove() {
        for (let l=0; l < localStorage.getItem('NumOfPlayers'); l++) {
            let ele = myBranchs[l].children
            for (let i = 0; i < ele.length - 1; i++) {
                j = ele.length - i -1
                let k = j - 1
                if(ele[j].classList.contains('branch')) {
                    ele[j].style.left = parseInt(ele[k].style.left.split('px').join('')) +'px'
                    ele[j].style.top = parseInt(ele[k].style.top.split('px').join('')) +'px'
                }
            }
        }
    }
    // Eat
    let points = []

    function addPoint(i) {
        myFood.x = cP(window.innerWidth)
        myFood.y = cP(window.innerHeight)

        myFood.shape.style.left = myFood.x + 'px'
        myFood.shape.style.top = myFood.y + 'px'

        let newBranch = document.createElement('div')
        newBranch.classList.add('box', 'branch')
        newBranch.style.backgroundColor = localStorage.getItem(`Player ${i+1} color`)
        myPlayers[i].appendChild(newBranch)
        
        if (points[i] == undefined) {
            points[i] = 1
        } else {
            points[i] += 1
        }
        document.getElementsByClassName('score')[0].children[i].innerHTML = points[i]

        if (points[i] == localStorage.getItem(`score`)) {
            clearInterval(myMove)
            game.innerHTML = `<div class="finish">Player ${i+1} Win.<button class="again">Again</button></div>`
            let againbtn = document.querySelector('#game .finish button')
            againbtn.onclick = () => {
                ui.style.display = 'block'
                game.style.display = 'none'
            }
        }
    }

    // On Play
    myy = window.innerHeight
    myy = myy - myy%20

    myx = window.innerWidth
    myx = myx - myx%20

    let dir = ['right', 'right', 'right', 'right', 'right']

    window.addEventListener('keydown', (e) =>{
        
            // Player Move
        for(let i = 0; i < localStorage.getItem("NumOfPlayers"); i++) {
            let keys = localStorage.getItem(`Player ${i+1} control`).split(" ")
            switch (e.key) {
                case keys[0]:
                    if (dir[i] != 'down') {
                        dir[i] = 'up'
                    }
                    break
                case keys[1]:
                    if (dir[i] != 'up') {
                        dir[i] = 'down'
                    }
                    break
                case keys[2]:
                    if (dir[i] != 'right') {
                        dir[i] = 'left'
                    }
                    break
                case keys[3]:
                    if (dir[i] != 'left') {
                        dir[i] = 'right'
                    }
                    break
            }
        }
    })


    // Auto Move
    let myMove = setInterval(function () {
            // Branch
            branchmove()

        // move

        for(let i = 0; i < localStorage.getItem("NumOfPlayers"); i++) {
            switch (dir[i]) {
                case 'right':
                    if (mySnakes[i].x >= myx) {
                        mySnakes[i].x = 0
                        mySnakes[i].shape.style.left = mySnakes[i].x + 'px'
                    } else {
                        mySnakes[i].moveRight()
                    }
                    break
    
                case 'left':
                    if (mySnakes[i].x <= 0) {
                        mySnakes[i].x = myx
                        mySnakes[i].shape.style.left = mySnakes[i].x + 'px'
                    } else {
                        mySnakes[i].moveLeft()
                    }
                    break
                case 'up':
                    if (mySnakes[i].y <= 0) {
                        mySnakes[i].y = myy
                        mySnakes[i].shape.style.top = mySnakes[i].y + 'px'
                    } else{
                        mySnakes[i].moveUp()
                    }
                    break
    
                case 'down':
                    if (mySnakes[i].y >= myy) {
                        mySnakes[i].y = 0
                        mySnakes[i].shape.style.top = mySnakes[i].y + 'px'
                    } else {
                        mySnakes[i].moveDown()
                    }
                    break
    
            }
        }
        

        // Eat
        for (let i = 0; i < localStorage.getItem("NumOfPlayers"); i++) {
            if (mySnakes[i].x == myFood.x && mySnakes[i].y == myFood.y) {
                addPoint(i)
            }
        }

        

        // Pause
    }, 60)}