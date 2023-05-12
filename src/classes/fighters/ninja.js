import { Fist } from "../attacks/fist.js";
import { Shuriken } from "../attacks/shuriken.js";
import { Fighter } from "./fighter.js";

export class Ninja extends Fighter {
  constructor(scene, x, y, controls, gravity, flipX) {
    super(scene, x, y, controls, "ninja", 0, 40);

    this.body.setGravityY(gravity);
    this.body.setSize(22, 44);
    this.body.setOffset(13, 4);

    this.fist = new Fist(scene, "ninjaFist", 10, 100, this);
    this.fist.setXOffset(14);
    this.fist.setYOffset(22);

    this.shuriken = new Shuriken(scene, 20, this);
    this.shuriken.setXOffset(27);
    this.shuriken.setYOffset(24);

    if (flipX) {
      this.setFlipX(flipX);
    }
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", "ninjaIdle");
    this.animationsMap.set("walking", "ninjaWalking");
    this.animationsMap.set("jumping", "ninjaJumping");
    this.animationsMap.set("falling", "ninjaFalling");
    this.animationsMap.set("attacking", "ninjaAttacking");
    this.animationsMap.set("defeated", "ninjaDefeated");
    this.animationsMap.set("throwFalling", "ninjaThrowFalling");
    this.animationsMap.set("throwJumping", "ninjaThrowJumping");
    this.animationsMap.set("victoryPose", "ninjaVictoryPose");
    this.animationsMap.set("throw", "ninjaThrow");
    this.animationsMap.set("attackingJumping", "ninjaJumpingAttack");
    this.animationsMap.set("attackingFalling", "ninjaFallingAttack");
    this.animationsMap.set("damaged", "ninjaDamaged");
  }

  setScale(scale) {
    super.setScale(scale);
    this.shuriken.setScale(scale - 1);
    this.shuriken.setXOffset(this.shuriken.xOffset * scale - 1);
    this.shuriken.setYOffset(this.shuriken.yOffset * scale) - 1;
  }

  setFlipX(flip) {
    super.setFlipX(flip);
    this.shuriken.setFlipX(flip);
    this.shuriken.flipXOffset();
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
    this.fist.update(deltaTime);
    this.shuriken.update(deltaTime);
  }
}
