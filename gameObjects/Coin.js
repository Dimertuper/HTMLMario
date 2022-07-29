export default class Coin {
    constructor(scene){
        this.scene = scene;
        this.coins = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false            
        })

        const coinObj = this.scene.map.getObjectLayer('Coins',).objects;
        coinObj.forEach(coin => {
            this.coins.create(coin.x, coin.y+152 , 'atlas')
                .setOrigin(0)
                .setDepth(1)
        });

        this.coins.children.entries.forEach((coin)=>{
            //Play rotate anim
            coin.play('rotate', true)

            //Set collision
            coin.collider = this.scene.physics.add.overlap(coin,this.scene.player.sprite, this.collect, null, this )
        })

    }
    collect(coin){
        this.scene.tweens.add({
            targets: coin,
            ease: 'Cubic',
            scaleX: 0,
            scaleY: 0,
            duration: 100,
            onComplete: () => coin.destroy()
        })
        this.scene.events.emit('addCoin');
        this.scene.events.emit('addScore');
        
        //Play sound
        this.scene.coinSound.play();
        coin.collider.destroy();
    }


    }


