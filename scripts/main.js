import Menu from '../scenes/Menu.js'
import Game from '../scenes/Game.js'
import Hud from '../scenes/Hud.js'

new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    pixelArt: true,
    width: window.innerWidth,
    height: 360,
    backgroundColor: '#63ADFF',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 500
            }
            }
        },
    scene: [Menu, Game, Hud]
});
