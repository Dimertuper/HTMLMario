export default class GameOver extends Phaser.Scene {
    constructor () {
        super('GameOver')
 
    }

    create() {
        let hud = this.scene.get('UIScene');
        //this.cameras.main.setBackgroundColor('#000');
        //Not ideal solution but works
        this.sys.events.once('shutdown', this.shutdown, this);


        this.events.emit('gameOver'); 

        hud.events.once('menu', this.callMenu, this)
        hud.events.once('gameOn', this.callGame, this)


    }

    callMenu(){
        this.scene.start('menu').stop('GameOver')
        //this.scene.restart('GameOver')
    }

    callGame(){
        console.log('warum ')
        this.scene.start('game').stop('GameOver')
        //this.scene.stop('GameOver')
    }

    shutdown(){
        console.log("Konec mě")
        this.events.off('menu', this.callMenu)
        this.events.off('gameOn', this.callGame)
    }

}