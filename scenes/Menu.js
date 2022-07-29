export default class Menu extends Phaser.Scene {
    constructor(data) {
      super('menu')
      this.maxScore = 0;
    }
  
    preload() {
        this.load.audio('background_music', './assets/sounds/MainSong.mp3')

        this.load.image('title', './assets/menu/title.png');
        this.load.image('pointer', './assets/menu/Supermushroom.png');
        //background
        this.load.image('background', './assets/menu/background.png')
    }

    create() {
        let bakgroundMusic = this.sound.add('background_music');
        bakgroundMusic.play({
            loop: true
        });

        this.add.image(700, 230, 'background')

        this.add.image(window.innerWidth/2, 100, 'title');
        this.add.text(window.innerWidth/2, 190, '© FILIP CHODURA')

        const Button = this.add.text(window.innerWidth/2 - 60, 240, 'ONE PLAYER GAME', {fontSize: '20px'})
        Button.setInteractive();

        
        Button.on('pointerdown', () => { this.scene.start('game'); });


        let pointer = this.add.image(window.innerWidth/2 - 80, 248, 'pointer');
        pointer.visible = false;

        Button.on('pointerover', () => { 
            pointer.visible = true;
        });

        Button.on('pointerout', ()=> {
            pointer.visible = false;
        })


        let maxScoreTxt = this.add.text(window.innerWidth/2 - 120, 240, 'MAX SCORE:\n' + this.maxScore)
        maxScoreTxt.visible = false;

        //Max score
        if(this.maxScore == 0){
            maxScoreTxt.visible = false;
        }else{
            maxScoreTxt.visible = true;
        }

    }
  }