import Mushroom from './Mushroom.js'

export default class QuestionBlock {
    constructor(scene, mushroomBlocks){
        this.scene = scene;
        this.mushroomBlocks = mushroomBlocks;
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
        let idVar = 0;
        this.questionBlocks.children.entries.forEach((question)=>{
            question.isCollected = false;
            question.id = idVar;
            idVar++;
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
                //spawn mushroom if has right id
                this.mushroomBlocks.forEach((block) =>{
                    if(block == question.id){
                        //console.log('spawn mush')
                        new Mushroom(this.scene, question.x, question.y - 18)
                        question.isCollected = true;
                    }
                })
                if(!question.isCollected){
                    this.scene.events.emit('addScore')
                    this.scene.coinSound.play();
                    question.isCollected = true;
                }
                //console.log(question)
                
                question.setTexture('unquestionBlock')


            }
        })
    }
}