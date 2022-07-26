export default class GameOver extends Phaser.Scene {
    constructor () {
        super('GameOver')
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        
        this.events.emit('gameOver');
    }
}