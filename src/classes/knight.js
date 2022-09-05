import { Fighter } from "../classes/fighter.js";

export class Knight extends Fighter {
  constructor(scene, x, y, controls) {
    super(scene, x, y, controls, "adventurer", 40, 10);
    this.setScale(0.5);
    this.body.setSize(70, 110);
    this.body.setOffset(65, 33);

    this.baseDamage = 10;

    this.attackHitbox = scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0.5);
    scene.physics.add.existing(this.attackHitbox);
    this.attackHitbox.body.setAllowGravity(false);
    this.attackHitbox.body.enable = false;
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", "adventureridle");
    this.animationsMap.set("walk", "adventurerwalking");
    this.animationsMap.set("jump", "adventurerjumping");
    this.animationsMap.set("fall", "adventurerfalling");
    this.animationsMap.set("attack", "adventurerattacking");
    this.animationsMap.set("defeated", "adventurerdying");
  }
}
