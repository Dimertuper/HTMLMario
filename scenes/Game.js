//Gameobjects
import Player from '../gameObjects/Player.js'
import Coin from '../gameObjects/Coin.js'
import Goomba from '../gameObjects/Goomba.js'

//Animations
import loadAnimations from '../gameObjects/animation/animations.js'

export default class Game extends Phaser.Scene {
    constructor() {
      super({key: 'game'})
    }

    preload() {
      //Player graphics  
      this.load.atlas('atlas', './assets/sprites/atlases/mario-atlas.png', './assets/sprites/atlases/mario-atlas.json');

      //Tileset
      this.load.image('tiles', './assets/tilesets/tileset_gutter.png');
      this.load.tilemapTiledJSON('map', './assets/tilemaps/mario.json');

      //Loading aniations
      this.load.on('complete', () => {
        loadAnimations(this);
      });
    }
  
    create() {
        console.log('HH')
        //this.scene.restart();
        //Getting map and tileset
        this.map = this.make.tilemap({key: 'map'})
        this.tileset = this.map.addTilesetImage('tileset_gutter', 'tiles')

        //Map layers
        this.map.createLayer('Background Color', this.tileset, 0, 152);
        this.map.createLayer('Graphics Layer', this.tileset, 0, 152)
        
        // Ground layer
        this.ground = this.map.createLayer('Platform Layer', this.tileset, 0, 152);
        this.ground.setCollisionByExclusion(-1, true);

        //importing player
        this.player = new Player(this, 100, 200)
        this.inputs = this.input.keyboard.createCursorKeys();

        //Start hud timer
        this.events.emit('startTimer')

        //init Coin object
        this.coins = new Coin(this);
        //Init Goombas
        this.goombas = new Goomba(this);


    }
    update(){
      this.player.update(this.inputs);
      this.goombas.update();
    }

  }