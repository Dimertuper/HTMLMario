import Menu from '../scenes/Menu.js'
import Game from '../scenes/Game.js'
import Hud from '../scenes/Hud.js'
import GameOver from '../scenes/GameOver.js'

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
                y: 600
            }
            }
        },
    scene: [Menu, Game, GameOver, Hud]
});
