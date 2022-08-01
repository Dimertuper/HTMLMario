//Gameobjects
import Player from '../gameObjects/Player.js'
import Coin from '../gameObjects/Coin.js'
import Goomba from '../gameObjects/Goomba.js'
import Flag from '../gameObjects/Flag.js'
import QuestionBlock from '../gameObjects/BumpBlock.js'


//Animations
import loadAnimations from '../gameObjects/animation/animations.js'

export default class Game extends Phaser.Scene {
    constructor() {
      super({key: 'game'})
    }

    init(data){
      if(data){
        this.audioSwitch = data.audioSwitch;
      }
    }
    preload() {
      //Player graphics  
      this.load.atlas('atlas', './assets/sprites/atlases/mario-atlas.png', './assets/sprites/atlases/mario-atlas.json');

      //Flag
      this.load.image('flag', './assets/sprites/Flag.png')
      
      //Queston block
      this.load.image('questionBlock', './assets/sprites/questionBlock.png')
      this.load.image('unquestionBlock', './assets/sprites/unquestionBlock.png')

      //Tileset
      this.load.image('tiles', './assets/tilesets/tileset_gutter.png');
      this.load.tilemapTiledJSON('map', './assets/tilemaps/mario.json');

      //Load mushroom 
      this.load.image('mushroom', './assets/sprites/mushroom.png')

      //Loading aniations
      this.load.on('complete', () => {
        loadAnimations(this);
      });

      //Sounds
      this.load.audio('coin', './assets/sounds/Coin.wav')
      this.load.audio('die', './assets/sounds/Die.wav')
      this.load.audio('gameOver', './assets/sounds/GameOver.wav')
      this.load.audio('jump', './assets/sounds/Jump.wav')
      this.load.audio('kick', './assets/sounds/Kick.wav')
      this.load.audio('win', './assets/sounds/Win.wav')
      this.load.audio('background_music', './assets/sounds/MainSong.mp3')
      this.load.audio('powerUp', './assets/sounds/PowerUp.mp3')
      this.load.audio('damage', './assets/sounds/Damage.wav')
      this.load.audio('powerupAppears', './assets/sounds/PowerupAppears.wav')
    }
  
    create() {
        //Sounds
        this.coinSound = this.sound.add('coin');
        this.deathSound = this.sound.add('die');
        this.gameOverSound = this.sound.add('gameOver');
        this.jumpSound = this.sound.add('jump');
        this.kickSound = this.sound.add('kick');
        this.winSound = this.sound.add('win');
        this.backgroundMusic = this.sound.add('background_music');
        this.powerUp = this.sound.add('powerUp')
        this.damageSound = this.sound.add('damage') 
        this.powerUpPopsSound = this.sound.add('powerupAppears')
        
        if(this.audioSwitch == 'ON'){
          this.backgroundMusic.play({
            loop: true
          });
        }

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
        //Init flag
        this.flag = new Flag(this);
        //Init question blocks
        this.questionBlock = new QuestionBlock(this, [0,6,9]);


    }
    update(){
      this.player.update(this.inputs);
      this.goombas.update();
    }

  }