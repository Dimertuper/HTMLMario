export default class Hud extends Phaser.Scene{
    constructor() {
        super({ key: 'UIScene', active: true });
        this.score = 0;
        this.coins = 0;
        this.timing = 0;
        this.lives = 3;
    }

    create(){
        //HUD
        let scoreText = this.add.text(20, 20, 'MARIO \n0')
        let coinsText = this.add.text(window.innerWidth/3, 20, ' \nCOINS x 0')
        this.add.text(window.innerWidth/1.5, 20, 'WORLD \n1-1')
        let timeText = this.add.text(window.innerWidth-50, 20, 'TIME \n0')

        let gameOverText = this.add.text(window.innerWidth/2, 180, 'GAME OVER') 
        gameOverText.visible = false;
        let livesText = this.add.text(window.innerWidth/2, 180, 'LIVES x '+ this.lives) 
        livesText.visible = false;

        let Game = this.scene.get('game');
        Game.events.on('addScore', function (){
            this.score += 10;
            scoreText.setText('MARIO \n' + this.score);
        }, this)
        Game.events.on('addCoin', function (){
            this.coins += 1;
            coinsText.setText('\nCOINS x ' + this.coins);
        }, this)
        
        let timer;
        Game.events.on('startTimer', function(){
            timer = this.time.addEvent({
                delay: 1000,
                callback: function(){
                    this.timing ++;
                    timeText.setText('TIME \n' + this.timing)
                    //console.log(this.timing)
                },
                callbackScope: this,
                loop: true
            });
        }, this)
        
        let GameOver = this.scene.get('GameOver');
        GameOver.events.on('gameOver', function(){
            //console.log(this)
            this.lives = this.lives-1;
            this.score = 0;
            this.coins = 0;
            
            if(this.lives == 0){
                gameOverText.visible = true
            }else{
                livesText.setText('LIVES x '+ this.lives)
                livesText.visible = true;
                timer.paused = true;
            }
            setTimeout(()=>{
                timer.paused = false;
                this.scene.start("game")
            },3000)
        })

    }

}