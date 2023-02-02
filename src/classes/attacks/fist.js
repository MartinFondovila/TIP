import { StateMachine } from "../state-machine/state-machine.js";

// IMPLEMENTAR LOGICA DEL FIST
// VELOCITY ES CONSTANTE, GRAVITY TIENE ACELERACION
export class Fist extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, baseDamage, fighter) {
    super(scene, x, y, texture);
    this.baseDamage = baseDamage;
    this.fighter = fighter;
    this.stateMachine = new StateMachine(this);

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);

    //this.setAnimationsOnMap();
    this.controls = this.fighter.controls;

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .setState("idle");
  }

  idleOnEnter() {
    //this.anims.play(this.animationsMap.get("idle"));
  }

  idleOnUpdate() {}

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }
}
