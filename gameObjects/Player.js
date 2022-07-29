class Player {
    constructor(scene, x, y){
        this.scene = scene
        
        this.sprite = scene.physics.add.sprite(x, y, 'atlas').setScale(1.2)
        this.sprite.setCollideWorldBounds(true);
        this.sprite.isDead = false;

        scene.cameras.main
        .setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
        .startFollow(this.sprite);

        this.collider = scene.physics.add.collider(this.sprite, scene.ground);
    }

    update(input){
        if((input.up.isDown || input.space.isDown) && this.sprite.body.onFloor()){
            this.sprite.setVelocityY(-300)
            this.scene.jumpSound.play()
        }
        if(input.left.isDown){
            this.sprite.setVelocityX(-150).setFlipX(true);
            this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('run', true);
            this.scene.cameras.main.stopFollow(this.sprite);
        } else if(input.right.isDown){
            this.sprite.setVelocityX(150).setFlipX(false);
            this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('run', true); 
            this.reFollowPlayer();  
        }else{
            //player.setVelocityY(0);
            this.sprite.setVelocityX(0);
            //Play idle if on floor
            this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('idle', true);
        }
        !this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('jump', true)
    }

    reFollowPlayer(){
        this.scene.physics.world.bounds.setPosition(this.scene.cameras.main.worldView.x, 0);

        if (this.sprite.body.position.x + this.sprite.body.width / 2 > this.scene.cameras.main.midPoint.x &&
            !this.scene.cameras.main._follow) {
                this.scene.cameras.main.startFollow(this.sprite);
        }       
    }

    die(){
        if(!this.sprite.isDead){
            this.scene.input.keyboard.shutdown();
            this.scene.physics.world.removeCollider(this.collider);

            this.sprite.isDead = true;
            this.sprite.setVelocity(0, -350);
            this.sprite.play('die', true);
            this.sprite.setCollideWorldBounds(false);

            this.scene.deathSound.play()
            
            //console.log('death')
            this.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.scene.scene.stop('game').start('GameOver')
                },
                callbackScope: this
            })
        }
    }
}

export default Player;