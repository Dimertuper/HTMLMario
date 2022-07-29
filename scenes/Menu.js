export default class Menu extends Phaser.Scene {
    constructor(data) {
      super('menu')
      this.maxScore = 0;
      this.audioSwitch = "ON";
    }
  
    preload() {
  

        this.load.image('title', './assets/menu/title.png');
        this.load.image('pointer', './assets/menu/Supermushroom.png');
        //background
        this.load.image('background', './assets/menu/background.png')
    }

    create() {


        this.add.image(700, 230, 'background')

        this.add.image(window.innerWidth/2, 100, 'title');
        this.add.text(window.innerWidth/2, 190, '© FILIP CHODURA')

        const Button = this.add.text(window.innerWidth/2 - 60, 240, 'ONE PLAYER GAME', {fontSize: '20px'})
        Button.setInteractive();



        const soundBtn = this.add.text(20, 70, 'MUSIC ' + this.audioSwitch);
        soundBtn.setInteractive();
        soundBtn.on('pointerdown', () => {
            if(this.audioSwitch == "ON"){
                this.audioSwitch = 'OFF'
                soundBtn.setText('MUSIC ' + this.audioSwitch)
            }else{
                this.audioSwitch = 'ON'
                soundBtn.setText('MUSIC ' + this.audioSwitch)
            }
        });
        
        Button.on('pointerdown', () => { this.scene.start('game', {audioSwitch: this.audioSwitch}); });

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