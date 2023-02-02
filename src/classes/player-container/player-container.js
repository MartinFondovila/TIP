import { StateMachine } from "../state-machine/state-machine.js";

export class PlayerContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children, controls) {
    super(scene, x, y, children);
    this.controls = controls;
    this.stateMachine = new StateMachine(this, "PlayerContainerStateMachine");

    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.body.setGravityY(900);
    this.body.setSize(this.list[0].width, this.list[0].height);
    this.setScale(1.5);

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .setState("idle");
  }

  idleOnEnter() {
    this.list.forEach((children) => {
      this.anims.play(this.animationsMap.get("idle"));
    });
  }
}
