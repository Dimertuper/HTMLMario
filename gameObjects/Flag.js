export default class Flag {
    constructor(scene){
        this.scene = scene;

        const flagObject = scene.map.getObjectLayer('Flag');
        const flagCoordinates = scene.tileset.texCoordinates[313]; 

        
        this.flag = this.scene.physics.add.sprite(flagObject.objects[0].x, flagObject.objects[0].y + 155, 'flag').setOrigin(0).setDepth(1)
    
        this.flag.body.allowGravity = false;
        this.flag.body.immovable = true;

        //this.flag.body.offset.y = 100
        console.log(this.flag.body.offset.y)
        //this.flag = this.scene.physics.add.staticBody(flagCoordinates.x, flagCoordinates.y)
        this.scene.physics.add.overlap(this.flag,this.scene.player.sprite, this.win, null, this)
    }
    

    win(){
        this.scene.backgroundMusic.stop()
        this.scene.input.keyboard.shutdown();

        this.scene.player.sprite.body.stop();

        this.scene.player.sprite.body.setAllowGravity(false);
        this.scene.player.sprite.setVelocity(0, 100);

        this.scene.winSound.play()

        this.scene.time.addEvent({
            delay:1500,
            callback: function(){
                this.scene.player.sprite.body.setAllowGravity(true);
                this.scene.player.sprite.setVelocity(100, 0);
            },
            callbackScope: this
        })

        this.scene.time.addEvent({
            delay:5500,
            callback: function(){
                this.scene.scene.stop('game').start('menu')
            },
            callbackScope: this
        })
    }
}