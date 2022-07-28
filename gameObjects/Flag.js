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
        this.scene.physics.add.overlap(this.flag,this.scene.player.sprite, this.win, null, this )
    }
    

    win(){
        this.scene.scene.start('menu').stop('game')
    }
}