// Enemies our player must avoid
class Enemy {
    constructor(x, y){
        this.sprite = 'images/enemy-bug.png'
        this.x = x
        this.y = y
    }

    update(dt) {
        if (this.x >= 505) {
            this.x = 0
        }
        this.x += 40 * dt
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y){
        this.sprite = 'images/char-boy.png'
        this.x = x
        this.y = y
    }

    update(){
        //checking all enemy entities and player coordinates for a collision
        allEnemies.forEach(enemy => {
            if (
                (
                (Math.floor(enemy.x) + 77 > this.x && 
                Math.floor(enemy.x) - 77 < this.x)
                ) && 
                (
                Math.floor(enemy.y) - 60 < this.y &&
                Math.floor(enemy.y) + 60 > this.y)
            ){
                ctx.clearRect(0, 0, 505, 606)
                this.x = 200
                this.y = 400
                allEnemies = [new Enemy(-250, 40), new Enemy(5, 130), new Enemy(-135, 220)]
            }
        });
    }

    handleInput(key){
        //if player reaches blue plate, show alert with a message
        if (this.y < 90) {
            // and apply blur filter
            ctx.filter = 'blur(10px)'
            setTimeout(() => {
                //after blur filter applied show the message
                alert('Congratulations you won the game')
                //then clear the filter and create a new game
                ctx.filter = 'none'
                this.x = 200
                this.y = 400
                allEnemies = [new Enemy(-250, 40), new Enemy(5, 130), 
                              new Enemy(-135, 220)]
            }, 100);
        }
        //switch for key, also checks for boundaries
        switch (key) {
            case 'left':
                if (this.x - 100 < 0) {
                    return
                } else {
                    this.x -= 100
                }
                break;
            case 'right':
                if (this.x + 100 > 405) {
                    return
                } else {
                    this.x += 100
                }
                break;
            case 'up':
                if (this.y - 90 < -100) {
                    return
                } else {
                    this.y -= 90
                }
                break;
            case 'down':
                if (this.y + 90 > 405) {
                    return
                } else {
                    this.y += 90
                }
            default:
                break;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-250, 50), new Enemy(5, 140), new Enemy(-135, 220)]
const player = new Player(200,400)


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
