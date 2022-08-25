import { Fighter } from "../classes/fighter.js";

export class Knight extends Fighter {
  constructor(scene, x, y, controls) {
    super(scene, x, y, controls, "adventurer", 120, 10);
    this.setScale(0.5);
    this.body.setSize(70, 110);
    this.body.setOffset(65, 33);
  }

  attack() {
    super.attack("adventurerattacking");
  }

  fall() {
    this.anims.play("adventurerfalling", true);
  }

  idle() {
    super.idle("adventureridle");
  }

  // Por definir
  block() {}

  moveLeft() {
    super.moveLeft("adventurerwalking");
  }

  moveRight() {
    super.moveRight("adventurerwalking");
  }

  jump() {
    super.jump("adventurerjumping");
  }

  fall() {
    super.fall("adventurerfalling");
  }

  // Por definir
  specialAttack() {}
}
