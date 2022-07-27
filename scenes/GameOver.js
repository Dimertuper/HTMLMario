export default class GameOver extends Phaser.Scene {
    constructor () {
        super('GameOver')
 
    }

    create() {
        let hud = this.scene.get('UIScene');
        //this.cameras.main.setBackgroundColor('#000');
        //Not ideal solution but works

        this.events.emit('gameOver'); 

        hud.events.on('menu', function(){
            this.scene.stop('game').stop('GameOver').start('menu')
        }, this)
        hud.events.on('gameOn', function(){
            console.log('warum ')
            this.scene.stop('GameOver').start('game')
        }, this)


    }
}