export default class Hud extends Phaser.Scene{
    constructor() {
        super({ key: 'UIScene', active: true });
        this.score = 0;
        this.coins = 0;
        this.timing = 0;
    }

    create(){
        //HUD
        let scoreText = this.add.text(20, 20, 'MARIO \n0')
        let coinsText = this.add.text(window.innerWidth/3, 20, ' \nCOINS x 0')
        this.add.text(window.innerWidth/1.5, 20, 'WORLD \n1-1')
        let timeText = this.add.text(window.innerWidth-50, 20, 'TIME \n0')

        let Game = this.scene.get('game');
        Game.events.on('addScore', function (){
            this.score += 10;
            scoreText.setText('MARIO \n' + this.score);
        }, this)
        Game.events.on('addCoin', function (){
            this.coins += 1;
            coinsText.setText('\nCOINS x ' + this.coins);
        }, this)
        
        Game.events.on('startTimer', function(){
            let timer = this.time.addEvent({
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



    }

}