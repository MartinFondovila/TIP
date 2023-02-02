import { StateMachine } from "../state-machine/state-machine.js";

export class Fighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, controls, texture, frame, healthPoints) {
    // Condición para que la clase no se pueda instanciar ya que es abstracta
    if (new.target === Fighter) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(scene, x, y, texture, frame);

    // Agrega los controles con los que se va a manejar el luchador
    this.controls = controls;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);

    this.healthPoints = healthPoints;
    this.stateMachine = new StateMachine(this);
    this.animationsMap = new Map();
    this.setAnimationsOnMap();
    this.immunity = false;

    this.fist;
    //this.positionFist()

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

    this.on("animationcomplete_" + this.animationsMap.get("attacking"), () => {
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
      this.stateMachine.setState("falling");
    }

    if (this.controls.left.isDown || this.controls.right.isDown) {
      this.stateMachine.setState("walking");
      //this.fist.stateMachine.setState("walking");
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
    this.setVelocityY(-500);
    this.anims.play(this.animationsMap.get("jumping"));
  }

  // Ver la posibilidad de pasar al estado attackingMidAir
  jumpingOnUpdate() {
    if (
      Phaser.Input.Keyboard.JustDown(this.controls.attack) &&
      !this.isImmune()
    ) {
      this.stateMachine.setState("attackingMidAir");
    } else if (this.isFalling()) {
      this.stateMachine.setState("falling");
    } else if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown) {
      this.walkLeft();
    } else if (this.controls.right.isDown) {
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
      !this.isImmune()
    ) {
      this.stateMachine.setState("attackingMidAir");
    } else if (this.body.blocked.down) {
      this.stateMachine.setState("idle");
    } else if (this.controls.left.isDown) {
      this.walkLeft();
    } else if (this.controls.right.isDown) {
      this.walkRight();
    }
  }

  // REHACER
  attackingOnEnter() {
    this.anims.play(this.animationsMap.get("attacking"));
  }

  // REHACER
  attackingOnUpdate() {}

  // HACER
  clashOnEnter() {}

  // HACER
  clashOnUpdate() {}

  // HACER
  attackingMidAirOnEnter() {}

  // HACER
  attackingMidAirOnUpdate() {}

  // Efecto rebote
  damagedOnEnter(sourceOfDamage) {
    console.log(sourceOfDamage);
    if (this.canRecieveFullDamage(sourceOfDamage)) {
      this.recieveDamage();
      this.becomeImmune(1000, 0xff0000);
    } else {
      this.recieveDamage(sourceOfDamage);
    }
  }

  // Por aca o en el OnEnter va a tener que estar el efector rebote
  damagedOnUpdate() {
    if (this.isDefeated()) {
      this.stateMachine.setState("defeated");
    } else {
      this.stateMachine.setState("idle");
    }
  }

  defeatedOnEnter() {
    this.anims.play(this.animationsMap.get("defeated"));
  }

  // Metodo abstracto que deben implementar las subclases
  setAnimationsOnMap() {}

  // REACOMODAR LAS BARRAS DE VIDA - PUEDE SER CON EL VIDEO DE YOUTUBE QUE ESTA GUARDADO EN VER MAS TARDE
  recieveDamage(damagePoints) {
    if (!this.isImmune()) {
      console.log("daño: " + damagePoints);
      this.healthPoints = this.healthPoints - damagePoints;
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
    Object.values(this.controls).forEach((control) => (control.enabled = true));
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
          console.log("Termino la inmunidad");
        },
        [],
        this.scene
      );
    }
  }

  walkLeft() {
    this.setFlip(true);
    this.setVelocityX(-160);
  }

  walkRight() {
    this.setFlip(false);
    this.setVelocityX(160);
  }

  isFalling() {
    return this.body.velocity.y > 0;
  }

  // Getters y setters
  getHealthPoints() {
    return this.healthPoints;
  }

  setHealthPoints(points) {
    this.healthPoints = points;
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
    this.fist.update(deltaTime);
  }
}
