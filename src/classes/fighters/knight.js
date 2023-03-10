import { Fist } from "../attacks/fist.js";
import { HealthBar } from "../health-bar/health-bar.js";
import { Fighter } from "./fighter.js";

export class Knight extends Fighter {
  constructor(scene, x, y, controls, gravity) {
    super(scene, x, y, controls, "knight", 0, 40, 10);

    this.healthBar = new HealthBar(scene, 200, 0, this.healthPoints);
    this.body.setGravityY(gravity);

    //this.fist = new Fist(scene, x - 15, y + 30, "fist", 10, this);
    //this.fist.setCollideWorldBounds(true);

    //this.attackHitbox = scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0.5);
  }

  // POR AHORA LO DEJO ASI, PERO CREO QUE SE TIENE QUE CAMBIAR
  setAnimationsOnMap() {
    this.animationsMap.set("idle", "knightIdle");
    this.animationsMap.set("walking", "knightWalking");
    this.animationsMap.set("jumping", "knightJumping");
    this.animationsMap.set("falling", "knightFalling");
    this.animationsMap.set("attacking", "knightAttacking");
    this.animationsMap.set("defeated", "knightDefeated");
  }
}
