



import Phaser from 'phaser';


class Collectable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

     scene.add.existing(this);
     
     this.score = 1;

     this.setOrigin(0, 1);

     scene.tweens.add({
         targets: this,  //targeting the Collectable here with the 'this'
         y: this.y -25,
         duration: Phaser.Math.Between(1500, 2500),
         repeat: -1,
         easy: 'linear',     //always the same speed with this command
         yoyo: true
     })


    }   
}



export default Collectable;