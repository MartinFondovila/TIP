import * as Phaser from "phaser";
import { StateMachine } from "../state-machine/state-machine.js";

export class Fighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, controls, texture, frame, healthPoints) {
    if (new.target === Fighter) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(scene, x, y, texture, frame);

    this.controls = controls;

    this.enemyHit;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setOrigin(0, 0);

    this.healthPoints = healthPoints;
    this.stateMachine = new StateMachine(this);
    this.animationsMap = new Map();
    this.setAnimationsOnMap();
    this.immunity = false;

    this.weapons = [];

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState("walking", {
        onEnter: this.walkingOnEnter,
        onUpdate: this.walkingOnUpdate,
      })
      .addState("jumping", {
        onEnter: this.jumpingOnEnter,
        onUpdate: this.jumpingOnUpdate,
      })
      .addState("falling", {
        onEnter: this.fallingOnEnter,
        onUpdate: this.fallingOnUpdate,
      })
      .addState("attacking", {
        onEnter: this.attackingOnEnter,
        onUpdate: this.attackingOnUpdate,
      })
      .addState("clash", {
        onEnter: this.clashOnEnter,
        onUpdate: this.clashOnUpdate,
      })
      // Quizas otro nombre
      .addState("attackingMidAir", {
        onEnter: this.attackingMidAirOnEnter,
        onUpdate: this.attackingMidAirOnUpdate,
      })
      .addState("damaged", {
        onEnter: this.damagedOnEnter,
        onUpdate: this.damagedOnUpdate,
        onExit: this.damagedOnExit,
      })
      .addState("defeated", {
        onEnter: this.defeatedOnEnter,
      })
      .setState("idle");

    // Revisar por que funciona :p
    // this.on(
    //   "animationcomplete",
    //   function (anim, frame) {
    //     this.emit("animationcomplete_" + anim.key, anim, frame);
    //   },
    //   this
    // );

    // this.on("animationcomplete_" + this.animationsMap.get("attacking"), () => {
    //   this.stateMachine.setState("idle");
    // });

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
      this.stateMachine.setState("falling");
    }

    if (this.controls.left.isDown || this.controls.right.isDown) {
      this.stateMachine.setState("walking");
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune() &&
      this.fist.canAttack()
    ) {
      this.stateMachine.setState("attacking");
    }

    if (Phaser.Input.Keyboard.JustDown(this.controls.jump)) {
      this.stateMachine.setState("jumping");
    }

    if (this.enemyHit) {
      this.setState("damaged");
    }
  }

  walkingOnEnter() {
    this.anims.play(this.animationsMap.get("walking"));
  }

  walkingOnUpdate() {
    if (this.isFalling()) {
      this.stateMachine.setState("falling");
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
      this.stateMachine.setState("attacking");
    }

    if (Phaser.Input.Keyboard.JustDown(this.controls.jump)) {
      this.stateMachine.setState("jumping");
    }
  }

  jumpingOnEnter() {
    if (!this.isJumping()) {
      this.setVelocityY(-500);
    }
    this.anims.play(this.animationsMap.get("jumping"));
  }

  // Ver la posibilidad de pasar al estado attackingMidAir
  jumpingOnUpdate() {
    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune() &&
      this.fist.canAttack()
    ) {
      this.stateMachine.setState("attackingMidAir");
    } else if (this.isFalling()) {
      this.stateMachine.setState("falling");
    } else if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown && !this.fist.attacking) {
      this.walkLeft();
    } else if (this.controls.right.isDown && !this.fist.attacking) {
      this.walkRight();
    }
  }

  fallingOnEnter() {
    this.anims.play(this.animationsMap.get("falling"));
  }

  // Ver la posibilidad de pasar al estado attacking
  fallingOnUpdate() {
    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune() &&
      this.fist.canAttack()
    ) {
      this.stateMachine.setState("attackingMidAir");
    } else if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown && !this.fist.attacking) {
      this.walkLeft();
    } else if (this.controls.right.isDown && !this.fist.attacking) {
      this.walkRight();
    }

    if (this.enemyHit) {
      this.setState("damaged");
    }
  }

  setScale(scale) {
    super.setScale(scale);
    return this;
  }

  setState(state) {
    this.stateMachine.setState(state);
  }

  // REHACER
  attackingOnEnter() {
    this.anims.play(this.animationsMap.get("attacking"));
    this.setVelocityX(0);
    this.fist.setState("attacking");
  }

  // REHACER
  attackingOnUpdate() {}

  // HACER
  clashOnEnter() {}

  // HACER
  clashOnUpdate() {}

  // HACER
  attackingMidAirOnEnter() {
    if (this.isFalling()) {
      this.anims.play(this.animationsMap.get("attackingFalling"));
    } else {
      this.anims.play(this.animationsMap.get("attackingJumping"));
    }
    this.fist.setState("attacking");
  }

  // Efecto rebote
  damagedOnEnter() {
    this.anims.play(this.animationsMap.get("damaged"));
    if (this.canRecieveFullDamage(this.enemyHit.baseDamage)) {
      this.recieveDamage(this.enemyHit.baseDamage);
      this.becomeImmune(1000, 0xff0000);
    } else {
      this.recieveDamage(this.enemyHit.baseDamage);
    }
    this.bounceOff();
  }

  // Por aca o en el OnEnter va a tener que estar el efector rebote
  damagedOnUpdate() {
    if (this.isDefeated()) {
      this.stateMachine.setState("defeated");
    } else if (this.isFalling()) {
      this.stateMachine.setState("falling");
    } else if (this.isJumping()) {
      this.stateMachine.setState("jumping");
    } else {
      this.stateMachine.setState("idle");
    }
  }

  damagedOnExit() {
    this.enemyHit = null;
  }

  defeatedOnEnter() {
    this.anims.play(this.animationsMap.get("defeated"));
    this.immunity = true;
    this.setVelocityX(0);
    //this.body.enable = false;
  }

  // Metodo abstracto que deben implementar las subclases
  setAnimationsOnMap() {}

  // REACOMODAR LAS BARRAS DE VIDA - PUEDE SER CON EL VIDEO DE YOUTUBE QUE ESTA GUARDADO EN VER MAS TARDE
  recieveDamage(damagePoints) {
    if (!this.isImmune()) {
      this.healthPoints = this.healthPoints - damagePoints;
      this.healthBar.decrease(damagePoints);
    }
  }

  // VER QUE PASA SI SE GOLPEAN AL MISMO TIEMPO
  // DESACTIVAR LAS HITBOX
  // PUEDE HABER EMPATE?
  canRecieveFullDamage(damagePoints) {
    return this.healthPoints - damagePoints > 0;
  }

  disableControls() {
    Object.values(this.controls).forEach(
      (control) => (control.enabled = false)
    );
  }

  enableControls() {
    Object.values(this.controls).forEach((control) => {
      control.reset().enabled = true;
    });
  }

  isDefeated() {
    return this.healthPoints === 0;
  }

  isImmune() {
    return this.immunity;
  }

  // REFACTORIZAR
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
        },
        [],
        this.scene
      );
    }
  }

  walkLeft() {
    if (!this.flipX) this.setFlipX(true);
    this.setVelocityX(-250);
  }

  walkRight() {
    if (this.flipX) this.setFlipX(false);
    this.setVelocityX(250);
  }

  bounceOff() {
    if (this.flipX) {
      this.setVelocityX(200);
      this.setVelocityY(-200);
    } else {
      this.setVelocityX(-200);
      this.setVelocityY(-200);
    }

    setTimeout(() => {
      this.setVelocityX(0);
      this.setVelocityY(0);
    }, 500);
  }

  isFalling() {
    return this.body.velocity.y > 0 && !this.body.blocked.down;
  }

  isJumping() {
    return this.body.velocity.y < 0 && !this.body.blocked.down;
  }

  // Getters y setters
  getHealthPoints() {
    return this.healthPoints;
  }

  setHealthPoints(points) {
    this.healthPoints = points;
  }

  setScale(scale) {
    super.setScale(scale);
    this.fist.setScale(scale - 1);
    this.fist.setXOffset(this.fist.xOffset * scale - 1);
    this.fist.setYOffset(this.fist.yOffset * scale - 1);
  }

  setFlipX(flip) {
    super.setFlipX(flip);
    this.fist.setFlipX(flip);
    this.fist.flipXOffset();
  }
}
