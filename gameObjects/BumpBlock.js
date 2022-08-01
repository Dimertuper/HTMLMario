export default class QuestionBlock {
    constructor(scene){
        this.scene = scene;
        this.questionBlocks = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        })
        this.collider = this.scene.physics.add.collider(this.questionBlocks, this.scene.player.sprite, this.hit, null, this)
        const blockObj = this.scene.map.getObjectLayer('Questions').objects;
        blockObj.forEach((question) => {
            //console.log(question);
            this.questionBlocks.create(question.x, question.y + 152, 'questionBlock')
                .setOrigin(0)
                .setDepth(2)
                .body.offset.y = 2;
                //Fix for uncollectible blocks, not prettiest solution but works
        });

        this.questionBlocks.children.entries.forEach((question)=>{
            question.isCollected = false;
        })
    }

    hit(){
        if(this.scene.player.sprite.body.touching.up){
            this.collect();
            return;
        }
    }

    collect(){
        this.questionBlocks.children.entries.forEach((question)=>{
            if(question.body.touching.down && !question.isCollected){
                question.isCollected = true;
                
                question.setTexture('unquestionBlock')
                this.scene.events.emit('addScore')
                this.scene.coinSound.play();

            }
        })
    }
}