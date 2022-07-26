export default class Coin {
    constructor(scene){
        this.scene = scene;
        this.coins = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false            
        })
    }
}

