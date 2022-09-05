import { Fighter } from "../classes/fighter.js";

export class Ninja extends Fighter {
  constructor(scene, x, y, controls) {
    super(scene, x, y, controls, "minotaur", 30, 10);
    this.body.setSize(30, 40);
    this.body.setOffset(33.5, 24);
    this.setScale(1.5);

    this.baseDamage = 10;

    this.attackHitbox = scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0.5);
    scene.physics.add.existing(this.attackHitbox);
    this.attackHitbox.body.setAllowGravity(false);
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", "idle");
    this.animationsMap.set("walk", "walking");
    this.animationsMap.set("jump", "jump");
    this.animationsMap.set("fall", "falling");
    this.animationsMap.set("attack", "attack");
    this.animationsMap.set("defeated", "dying");
  }

  attackOnEnter() {
    this.setVelocityX(0);
    this.anims.play(this.animationsMap.get("attack"));
    this.attackHitbox.body.x = !this.flipX
      ? this.body.x + this.width * 0.4
      : this.body.x - this.width * 0.4;
    this.attackHitbox.body.y = this.body.y;
    this.scene.physics.world.enableBody(this.attackHitbox);
    //this.once("animationcomplete", () => this.stateMachine.setState("idle"));
  }
}
