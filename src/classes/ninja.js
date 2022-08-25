import { Fighter } from "../classes/fighter.js";

export class Ninja extends Fighter {
  constructor(scene, x, y, controls) {
    super(scene, x, y, controls, "minotaur", 120, 10);
    this.body.setSize(30, 40);
    this.body.setOffset(33.5, 24);
    this.setScale(1.5);
  }

  attack() {
    super.attack("attack");
  }

  fall() {
    this.anims.play("falling", true);
  }

  idle() {
    super.idle("idle");
  }

  // Por definir
  block() {}

  moveLeft() {
    super.moveLeft("walking");
  }

  moveRight() {
    super.moveRight("walking");
  }

  jump() {
    super.jump("jump");
  }

  fall() {
    super.fall("falling");
  }

  // Por definir
  specialAttack() {}
}
