export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture='mushroom'){
        super(scene, x, y, texture)
        this.scene = scene

        this.scene.add.existing(this).setOrigin(0)
        this.mush = this.scene.physics.add.existing(this)

        this.mush.setVelocityX(80)

        this.scene.physics.add.collider(this.scene.player.sprite, this.mush, this.collectMush, null, this )
        this.scene.physics.add.collider(this.mush, this.scene.ground);

        this.scene.powerUpPopsSound.play()
        //this.scene.events.on('update', this.update, this)
    }

    collectMush(){
        this.scene.player.getBigger()
        this.scene.powerUp.play()
        this.mush.destroy()
    }

}