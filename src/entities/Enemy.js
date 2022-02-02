


import Phaser from 'phaser';
//import { javascript } from 'webpack';
import collidable from '../mixins/collidable';
import anims from '../mixins/anims';


class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.config = scene.config;

        scene.add.existing(this);
        scene.physics.add.existing(this);


        //mixins
        Object.assign(this, collidable);
        Object.assign(this, anims);

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 500;
        this.speed = 50;
        this.timeFromLastTurn = 0;
        this.maxPatrolDistance = 700;
        this.currentPatrolDistance = 0;


        this.health = 40;
        this.damage = 10;

        this.platformCollidersLayer = null;
        this.rayGraphics = this.scene.add.graphics({lineStyle: {width: 2, color: 0xaa00aa}});
  
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1);
        this.setVelocityX(this.speed);
        
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);//the last this refers to the objects of the sprite.
    }

    update(time) {
        
        if (this.getBounds().bottom > 600) {
            this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
            this.setActive(false);
            this.rayGraphics.clear();
            this.destroy();
            return;
        } 
        this.patrol(time);
    }

    patrol(time) {
        if (!this.body || !this.body.onFloor()) { return; }


        this.currentPatrolDistance += Math.abs(this.body.deltaX());

        const { ray, hasHit } = this.raycast(this.body, this.platformCollidersLayer, {
            raylength: 30, precision: 1, steepness: 0.1});

        if ((!hasHit || this.currentPatrolDistance >=this.maxPatrolDistance ) && 
            this.timeFromLastTurn + 10 < time) {

            this.setFlipX(!this.flipX);
            this.setVelocityX(this.speed = -this.speed);
            this.turnFromLastTurn = time;
            this.currentPatrolDistance = 0;  
        }

        if (this.config.debug && ray) {  //making the ray line invisible
            this.rayGraphics.clear();//makes the first one disappear and shows the next
            this.rayGraphics.strokeLineShape(ray);//displays on screen the ray

        }
    }

    setPlatformColliders(platformCollidersLayer) {
       this.platformCollidersLayer = platformCollidersLayer;
    }
    //Enemy is the source of the damage to the player
    deliversHit() {

    }

    takesHit(source) {
        source.deliversHit(this);
        this.health -= source.damage;
        
        //console.log(this.health);

        if (this.health <= 0) {
            this.setTint(0xff0000);
            this.setVelocity(0, -250);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            this.rotation = -5;

        }

    }

}



export default Enemy;