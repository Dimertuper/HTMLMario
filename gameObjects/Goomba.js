

export default class Goomba{
    constructor(scene){
        this.scene = scene
        this.goombas = this.scene.physics.add.group()
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.goombas, this.gameOver, null, this )

        //Get goomba layer
        const goombaObjects = this.scene.map.getObjectLayer('Goombas').objects;

        goombaObjects.forEach((goomba)=>{
            this.goombas.create(goomba.x, goomba.y - goomba.height + 155, 'atlas')
                .setOrigin(0)
                .setDepth(1)
        })

        this.goombas.children.entries.forEach((goomba)=>{
            goomba.direction = 'RIGHT';
            goomba.isDead = false;
        })

        this.scene.physics.add.collider(this.goombas, this.scene.ground);
    }

    update(){
            this.goombas.children.entries.forEach((goomba)=>{
                if(goomba.body.blocked.right){
                    goomba.direction = 'LEFT'
                }

                if(goomba.body.blocked.left){
                    goomba.direction = 'RIGHT';
                }

                if(goomba.direction === 'RIGHT'){
                    goomba.setVelocityX(80);
                } else {
                    goomba.setVelocityX(-80);
                }

                !goomba.isDead && goomba.play('goombaRun', true);
            })
    }

    gameOver(){
        if (this.scene.player.sprite.body.touching.down) {
            this.die();
            return;
        }else{
            this.scene.player.die();
        }
    }

    die(){
        this.goombas.children.entries.forEach((goomba)=>{
            if(goomba.body.touching.up){
                goomba.isDead = true;
                goomba.play('goombaDie', true);
                goomba.on('animationcomplete', function(){ 

                    goomba.destroy();
                   
                });


                this.scene.events.emit('addScore');

                this.scene.player.sprite.setVelocityY(-200);
                this.scene.player.sprite.play('jump')
            }
        })
    }
}