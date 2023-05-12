import * as Phaser from "phaser";
import { StateMachine } from "../state-machine/state-machine.js";
import { SHARED_CONF } from "../../utils.js";

export class Shuriken extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, baseDamage, fighter) {
    super(scene, fighter.x, fighter.y, "shuriken");
    this.baseDamage = baseDamage;
    this.fighter = fighter;
    this.stateMachine = new StateMachine(this);
    this.animationsMap = new Map();
    this.conf = SHARED_CONF;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    //this.body.allowGravity = false;
    this.setGravityY(0);
    //this.body.setEnable(false);

    this.setAnimationsOnMap();
    this.setOrigin(0, 0);

    this.controls = this.fighter.controls;
    this.setFlipX(this.fighter.flipX);

    this.xOffset = 0;
    this.yOffset = 0;

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .setState("idle");
  }

  idleOnEnter() {
    this.anims.play(this.animationsMap.get("idle"));
    //this.body.setEnable(true);
  }

  idleOnUpdate() {
    this.y = this.fighter.y + this.yOffset;
    this.x = this.fighter.x + this.xOffset;
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", this.texture.key + "Idle");
    this.animationsMap.set("victory", this.texture.key + "VictoryPose");
    this.animationsMap.set("damaged", this.texture.key + "Damaged");
  }

  setBodySize() {}

  setState(state) {
    this.stateMachine.setState(state);
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }

  setXOffset(xOffset) {
    this.xOffset = xOffset;
  }

  setYOffset(yOffset) {
    this.yOffset = yOffset;
  }

  canAttack() {
    return !this.attacking && !this.returning;
  }

  setFighter(fighter) {
    this.fighter = fighter;
    this.controls = this.fighter.controls;
    this.setFlipX(this.fighter.flipX);
  }

  flipXOffset() {
    this.setXOffset(
      this.fighter.displayWidth - this.xOffset - this.displayWidth
    );
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }
}
