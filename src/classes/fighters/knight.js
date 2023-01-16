import { Attack } from "../attack/attack.js";
import { HealthBar } from "../healthBar/HealthBar.js";
import { Fighter } from "./fighter.js";

export class Knight extends Fighter {
  constructor(scene, x, y, controls) {
    super(scene, x, y, controls, "knight", 40, 10);
    //this.setScale(0.5);
    //this.body.setSize(70, 110);
    //this.body.setOffset(65, 33);
    //this.setOrigin(0.5, 1);

    this.healthBar = new HealthBar(scene, 200, 0, this.healthPoints);

    this.attackHitbox = new Attack(scene, 0, 0, 32, 64, 10, this);

    //this.attackHitbox = scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0.5);

    scene.physics.add.existing(this.attackHitbox);
    this.attackHitbox.body.setAllowGravity(false);
    this.attackHitbox.body.enable = false;
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", "knightIdle");
    this.animationsMap.set("walk", "knightWalking");
    this.animationsMap.set("jump", "jumpingKnight");
    this.animationsMap.set("fall", "fallingKnight");
    this.animationsMap.set("attack", "attackingKnight");
    this.animationsMap.set("defeated", "knightIdle");
  }
}
