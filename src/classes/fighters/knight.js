import { Fist } from "../attacks/fist.js";
import { Fighter } from "./fighter.js";

export class Knight extends Fighter {
  constructor(scene, x, y, controls, gravity, flipX) {
    super(scene, x, y, controls, "knight", 0, 40);

    this.body.setGravityY(gravity);
    this.body.setSize(25, 37);
    this.body.setOffset(12, 11);

    this.fist = new Fist(scene, "knightFist", 10, 100, this);
    this.fist.setXOffset(10);
    this.fist.setYOffset(26);

    if (flipX) {
      this.setFlipX(flipX);
    }
  }

  // POR AHORA LO DEJO ASI, PERO CREO QUE SE TIENE QUE CAMBIAR
  setAnimationsOnMap() {
    this.animationsMap.set("idle", "knightIdle");
    this.animationsMap.set("walking", "knightWalking");
    this.animationsMap.set("jumping", "knightJumping");
    this.animationsMap.set("falling", "knightFalling");
    this.animationsMap.set("attacking", "knightAttacking");
    this.animationsMap.set("defeated", "knightDefeated");
    this.animationsMap.set("fallingBlocking", "knightFallingBlock");
    this.animationsMap.set("jumpingBlocking", "knightJumpingBlock");
    this.animationsMap.set("victoryPose", "knightVictoryPose");
    this.animationsMap.set("blocking", "knightBlocking");
    this.animationsMap.set("attackingJumping", "knightJumpingAttack");
    this.animationsMap.set("attackingFalling", "knightFallingAttack");
    this.animationsMap.set("damaged", "knightDamaged");
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
    this.fist.update(deltaTime);
  }
}
