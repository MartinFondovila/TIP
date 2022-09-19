import { StateMachine } from "../stateMachine/stateMachine.js";

export class Fighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, controls, texture, healthPoints, blockingDefense) {
    if (new.target === Fighter) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    this.controls = controls;
    this.healthPoints = healthPoints;
    this.healthBar;
    this.enemy;
    this.blockingDefense = blockingDefense;
    this.stateMachine = new StateMachine(this);
    this.animationsMap = new Map();
    this.setAnimationsOnMap();
    this.immunity = false;
    this.blocking = false;
    this.attackHitbox;

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState("walk", {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .addState("jump", {
        onEnter: this.jumpOnEnter,
        onUpdate: this.jumpOnUpdate,
      })
      .addState("fall", {
        onEnter: this.fallOnEnter,
        onUpdate: this.fallOnUpdate,
      })
      .addState("attack", {
        onEnter: this.attackOnEnter,
        onUpdate: this.attackOnUpdate,
      })
      .addState("hit", {
        onEnter: this.hitOnEnter,
        onUpdate: this.hitOnUpdate,
      })
      .addState("defeated", {
        onEnter: this.defeatedOnEnter,
      })
      .setState("idle");

    // Revisar por que funciona :p
    this.on(
      "animationcomplete",
      function (anim, frame) {
        this.emit("animationcomplete_" + anim.key, anim, frame);
      },
      this
    );

    this.on("animationcomplete_" + this.animationsMap.get("attack"), () => {
      this.stateMachine.setState("idle");
    });

    // this.on("animationstart_" + this.animationsMap.get("attack"), () => {
    //   this.attackHitbox.body.enable = true;
    //   this.attackHitbox.body.enable = false;
    // });
  }

  idleOnEnter() {
    this.setVelocityX(0);
    this.anims.play(this.animationsMap.get("idle"));
  }

  idleOnUpdate() {
    if (this.isFalling()) {
      this.stateMachine.setState("fall");
    }

    if (this.controls.left.isDown || this.controls.right.isDown) {
      this.stateMachine.setState("walk");
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune()
    ) {
      this.stateMachine.setState("attack");
    }

    if (Phaser.Input.Keyboard.JustDown(this.controls.jump)) {
      this.stateMachine.setState("jump");
    }
  }

  walkOnEnter() {
    this.anims.play(this.animationsMap.get("walk"));
  }

  walkOnUpdate() {
    if (this.isFalling()) {
      this.stateMachine.setState("fall");
    }

    if (this.controls.left.isDown) {
      this.walkLeft();
    } else if (this.controls.right.isDown) {
      this.walkRight();
    } else {
      this.stateMachine.setState("idle");
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune()
    ) {
      this.stateMachine.setState("attack");
    }

    if (Phaser.Input.Keyboard.JustDown(this.controls.jump)) {
      this.stateMachine.setState("jump");
    }
  }

  hitOnEnter() {
    this.attackHitbox.body.enable = false;
    this.recieveDamage(this.enemy.attackHitbox.baseDamage);
    this.becomeImmune(1000, 0xff0000);
  }

  hitOnUpdate() {
    this.stateMachine.setState("idle");
  }

  fallOnEnter() {
    this.anims.play(this.animationsMap.get("fall"));
  }

  defeatedOnEnter() {
    this.anims.play(this.animationsMap.get("defeated"));
  }

  fallOnUpdate() {
    if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown) {
      this.walkLeft();
    } else if (this.controls.right.isDown) {
      this.walkRight();
    }
  }

  attackOnEnter() {
    this.setVelocityX(0);
    this.anims.play(this.animationsMap.get("attack"));
    this.attackHitbox.body.x = !this.flipX
      ? this.body.x + this.width * 0.2
      : this.body.x - this.width * 0.2;
    this.attackHitbox.body.y = this.body.y;
    this.scene.physics.world.enableBody(this.attackHitbox);
  }

  // Revisar bien cuando deshabilitar la hitbox del ataque
  attackOnUpdate() {
    this.attackHitbox.body.enable = false;
  }

  jumpOnEnter() {
    this.setVelocityY(-500);
    this.anims.play(this.animationsMap.get("jump"));
  }

  jumpOnUpdate() {
    if (this.isFalling()) {
      this.stateMachine.setState("fall");
    }

    if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown) {
      this.walkLeft();
    } else if (this.controls.right.isDown) {
      this.walkRight();
    }
  }

  // Metodo abstracto que deben implementar las subclases
  setAnimationsOnMap() {}

  // Metodo abstracto
  block() {}

  recieveDamage(damagePoints) {
    if (!this.isImmune()) {
      console.log("daño: " + damagePoints);
      this.recieveDamageAux(damagePoints);
      this.healthBar.decrease(this.calculateDamage(damagePoints));
    }
  }

  recieveDamageAux(damagePoints) {
    if (this.canRecieveFullDamage(damagePoints)) {
      this.healthPoints -= this.calculateDamage(damagePoints);
    } else {
      this.healthPoints = 0;
    }

    if (this.isDefeated()) {
      console.log("muerto");
      this.stateMachine.setState("defeated");
    }
  }

  disableControls() {
    Object.values(this.controls).forEach(
      (control) => (control.enabled = false)
    );
  }

  enableControls() {
    Object.values(this.controls).forEach((control) => (control.enabled = true));
  }

  isDefeated() {
    return this.healthPoints === 0;
  }

  // VER QUE PASA SI SE GOLPEAN AL MISMO TIEMPO
  // DESACTIVAR LAS HITBOX
  // PUEDE HABER EMPATE?
  canRecieveFullDamage(damagePoints) {
    if (this.isBlocking) {
      return this.healthPoints - (damagePoints - this.blockingDefense) > 0;
    } else {
      return this.healthPoints - damagePoints > 0;
    }
  }

  calculateDamage(damagePoints) {
    if (this.isBlocking()) {
      return damagePoints - this.blockingDefense;
    } else {
      return damagePoints;
    }
  }

  isImmune() {
    return this.immunity;
  }

  isBlocking() {
    return this.blocking;
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
  walkLeft() {
    this.setFlip(true);
    this.setVelocityX(-160);
  }

  // Redifinir en clase concreta para poner la animacion especifica
  walkRight() {
    this.setFlip(false);
    this.setVelocityX(160);
  }

  idle() {
    this.setVelocityX(0);
    this.anims.play(this.animationsMap.get("idle"));
  }

  isFalling() {
    return this.body.velocity.y > 0;
  }

  // Metodo abstracto
  specialAttack() {}

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }
}
