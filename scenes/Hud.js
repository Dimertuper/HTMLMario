export default class Hud extends Phaser.Scene{
    constructor() {
        super({ key: 'UIScene', active: true });
        this.score = 0;
        this.coins = 0;
        this.timing = 400;
        this.lives = 3;
    }

    create(){
        this.sys.events.once('shutdown', this.shutdown, this);
        //HUD
        this.scoreText = this.add.text(20, 20, 'MARIO \n0')
        console.log('MAR')
        this.coinsText = this.add.text(window.innerWidth/3, 20, ' \nCOINS x 0')
        this.add.text(window.innerWidth/1.5, 20, 'WORLD \n1-1')
        this.timeText = this.add.text(window.innerWidth-50, 20, 'TIME \n0')

        this.gameOverText = this.add.text(window.innerWidth/2, 180, 'GAME OVER') 
        this.gameOverText.visible = false;

        this.livesText = this.add.text(window.innerWidth/2, 180, 'LIVES x '+ this.lives) 
        this.livesText.visible = false;

        const Game = this.scene.get('game');
        Game.events.once('addScore', this.addScore, this)
        Game.events.once('addCoin', this.addCoin , this)
        
        this.timeToDie;
        Game.events.once('startTimer', this.timeOut, this)
        
        let GameOver = this.scene.get('GameOver');
        GameOver.events.once('gameOver', this.gameOver, this)

    }

    addScore(){
        this.score += 10;
        this.scoreText.setText('MARIO \n' + this.score);
    }

    addCoin(){
        this.coins += 1;
        this.coinsText.setText('\nCOINS x ' + this.coins);
    }

    timeOut(){
        this.timeToDie = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timing --;
                this.timeText.setText('TIME \n' + this.timing)

                if(this.timing == 0){
                    this.lives == 0;
                    this.gameOver();
                }

                //console.log(this.timing)
            },
            callbackScope: this,
            loop: true
        });
    }

    gameOver() {
        this.lives = this.lives-1;
        console.log(this.lives)
        this.score = 0;
        this.coins = 0;
        
        if(this.lives == 0){
            this.gameOverText.visible = true
            this.livesText.visible = false;
            this.score = 0;
            this.coins = 0;
            this.timing = 400;

        }else{
            this.livesText.setText('LIVES x '+ this.lives)
            this.livesText.visible = true;
            this.gameOverText.visible = false
            this.timeToDie.paused = true;
            this.timing = 400;
        }
        this.time.addEvent({
            delay: 3000,
            callback: () => {

                this.livesText.visible = false;
                this.gameOverText.visible = false;
                
                if(this.lives == 0){
                    this.lives = 3;

                    this.timing = 0;
                    this.scene.restart('UIScene')
                    this.events.emit('menu')
                    
                }else{
                    this.scene.restart('UIScene')
                    this.events.emit('gameOn')
                    
                }

                //this.scene.restart()
            },
            loop: false
        })
    }
    
    shutdown(){
        console.log('Jsem zde')

        this.events.off('addScore', this.addScore);
        this.events.off('addCoin', this.addCoin);
        this.events.off('startTimer', this.timeOut);
        this.events.off('gameOver', this.gameOver);

        this.time.removeEvent(this.timeToDie);

        this.registry.destroy();
        //this.events.destroy();
    }
}