export class Fighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, controls, texture, healthPoints, blockingDefense) {
    if (new.target === Fighter) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.body.setSize(70, 110);
    this.body.setOffset(65, 33);
    this.controls = controls;
    this.healthPoints = healthPoints;
    this.blockingDefense = blockingDefense;
    this.immunity = false;
    this.blocking = false;
    this.attacking = false;
    this.jumping = false;
    this.prevAnim = "";
  }

  // Metodo abstracto
  attack(animation) {
    if (this.canAttack) {
      this.isAttacking = true;
      this.anims.play(animation, true);
    }
  }

  canAttack() {
    return !this.isImmune && !this.isAttacking;
  }

  isAttacking() {
    return this.attacking;
  }

  // Metodo abstracto
  block() {}

  // Metodo abstracto
  fall(animation) {
    if (this.prevAnim !== "fall") {
      this.prevAnim = "fall";
      this.anims.play(animation);
    }
  }

  idle(animation) {
    this.setVelocityX(0);
    if (this.prevAnim !== "idle" && !this.isJumping() && !this.isFalling()) {
      this.prevAnim = "idle";
      this.anims.play(animation);
      console.log(this.prevAnim);
    }
  }

  recieveDamage(damagePoints) {
    if (!this.isImmune()) {
      this.recieveDamageAux(damagePoints);
    }
  }

  recieveDamageAux(damagePoints) {
    if (this.canRecieveFullDamage(damagePoints)) {
      this.calculateDamage(damagePoints);
    } else {
      this.healthPoints = 0;
    }
  }

  canRecieveFullDamage(damagePoints) {
    if (this.isBlocking) {
      return this.healthPoints - (damagePoints - this.blockingDefense) > 0;
    } else {
      return this.healthPoints - damagePoints > 0;
    }
  }

  calculateDamage(damagePoints) {
    if (this.isBlocking()) {
      return this.healthPoints - (damagePoints - this.blockingDefense);
    } else {
      return this.healthPoints - damagePoints;
    }
  }

  isImmune() {
    return this.immunity;
  }

  isBlocking() {
    return this.blocking;
  }

  isJumping() {
    return this.jumping;
  }

  becomeImmune(milliseconds, tint) {
    if (!this.isImmune()) {
      this.immunity = true;
      this.setTint(tint);
      let interval = setInterval(() => {
        this.setTint(tint);
      }, 200);
      let interval2 = setInterval(() => {
        this.clearTint();
      }, 400);
      this.scene.time.delayedCall(
        milliseconds,
        () => {
          clearInterval(interval);
          clearInterval(interval2);
          this.clearTint();
          this.immunity = false;
          console.log("Termino la inmunidad");
        },
        [],
        this.scene
      );
    }
  }

  // Redifinir en clase concreta para poner la animacion especifica
  moveLeft(animation) {
    this.setFlip(true);
    this.setVelocityX(-160);
    if (this.prevAnim !== "left" && !this.isJumping() && !this.isFalling()) {
      this.prevAnim = "left";
      this.anims.play(animation);
    }
  }

  // Redifinir en clase concreta para poner la animacion especifica
  moveRight(animation) {
    this.setFlip(false);
    this.setVelocityX(160);
    if (this.prevAnim !== "right" && !this.isJumping()) {
      this.prevAnim = "right";
      this.anims.play(animation);
    }
  }

  // Redifinir en clase concreta para poner la animacion especifica
  jump(animation) {
    this.setVelocityY(-900);
    if (this.prevAnim !== "jump") {
      this.prevAnim = "jump";
      this.anims.play(animation);
    }
  }

  isFalling() {
    return this.body.velocity.y > 0;
  }

  // Metodo abstracto
  specialAttack() {}

  //Buscar Controles y animaciones mas consistentes
  update() {
    if (this.isFalling()) {
      this.fall();
    } else if (this.controls.left.isDown) {
      this.moveLeft();
    } else if (this.controls.right.isDown) {
      this.moveRight();
    } else {
      this.idle();
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.controls.jump) &&
      !this.isJumping()
    ) {
      this.jumping = true;
      this.jump();
    } else if (this.body.blocked.down) {
      this.jumping = false;
    }
  }
}
