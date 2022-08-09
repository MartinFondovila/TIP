export class Fighter extends Phaser.Physics.Arcade.Sprite {
  // Se tendria que agregar un valor para saber en que direccion enta mirando el jugador
  constructor(scene, x, y, controls, texture) {
    super(scene, x, y, texture); // The frame is optional
    this.controls = controls;
    scene.physics.world.enable(this);
  }

  attack() {}

  block() {}

  moveLeft() {
    this.setFlip(true);
    this.setVelocityX(-160);
  }

  moveRight() {
    this.setFlip(false);
    console.log("flipendo");
    this.setVelocityX(160);
  }

  jump() {
    this.setVelocityY(-330);
  }

  specialAttack() {}

  update() {
    if (this.controls.left.isDown) {
      this.moveLeft();
    } else if (this.controls.right.isDown) {
      this.moveRight();
    } else {
      this.setVelocityX(0);
    }
    if (this.controls.jump.isDown) {
      this.jump();
    }
  }
}
