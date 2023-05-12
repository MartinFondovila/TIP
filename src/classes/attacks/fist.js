import * as Phaser from "phaser";
import { StateMachine } from "../state-machine/state-machine.js";
import { SHARED_CONF } from "../../utils.js";

// IMPLEMENTAR LOGICA DEL FIST
// VELOCITY ES CONSTANTE, GRAVITY TIENE ACELERACION
export class Fist extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, texture, baseDamage, range, fighter) {
    super(scene, fighter.x, fighter.y, texture);
    this.baseDamage = baseDamage;
    this.range = range;
    this.fighter = fighter;
    this.attacking = false;
    this.returning = false;
    this.stateMachine = new StateMachine(this);
    this.animationsMap = new Map();
    this.conf = SHARED_CONF;

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    //this.body.allowGravity = false;
    this.setGravityY(0);
    //this.body.setEnable(false);

    this.setAnimationsOnMap();
    this.setBodySize(19, 28);
    this.setOrigin(0, 0);

    this.controls = this.fighter.controls;
    this.setFlipX(this.fighter.flipX);

    this.xOffset = 0;
    this.yOffset = 0;

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState("attacking", {
        onEnter: this.attackingOnEnter,
        onUpdate: this.attackingOnUpdate,
        onExit: this.attackingOnExit,
      })
      .addState("returning", {
        onEnter: this.returningOnEnter,
        onUpdate: this.returningOnUpdate,
        onExit: this.returningOnExit,
      })
      .setState("idle");
  }

  idleOnEnter() {
    this.anims.play(this.animationsMap.get("idle"));
    //this.body.setEnable(true);
  }

  idleOnUpdate() {
    this.y = this.fighter.y + this.yOffset;
    this.x = this.fighter.x + this.xOffset;
  }

  attackingOnEnter() {
    this.anims.stop();
    this.xBeforeAttack = this.x;
    this.attacking = true;
  }

  // VER CASO EN EL QUE TE ATACAN ESTANDO ATACANDO
  // Cambiar el calculo del rango si estas saltando y moviendote
  // Hacer algo si todavia estas atacando mientras caes y tocas el suelo
  attackingOnUpdate() {
    if (this.flipX) {
      this.setVelocityX(-400);
      if (this.x <= this.xBeforeAttack - this.range) {
        this.setState("returning");
      }
    } else {
      this.setVelocityX(400);
      if (this.x >= this.xBeforeAttack + this.range) {
        this.setState("returning");
      }
    }
    this.y = this.fighter.y + this.yOffset;
    if (this.body.onWall()) {
      this.setState("returning");
    }
  }

  attackingOnExit() {
    //this.body.setEnable(false);
    this.setVelocityX(0);
    this.attacking = false;
  }

  // VER CASO EN EL QUE TE ATACAN MIENTRAS EL FIST VUELVE
  returningOnEnter() {
    // Fijarse si el fighter esta cayendo o no
    if (this.fighter.isFalling()) {
      this.fighter.setState("falling");
    } else if (this.fighter.isJumping()) {
      this.fighter.setState("jumping");
    } else {
      this.fighter.setState("idle");
    }
    this.returning = true;
  }

  // ARREGLAR ESTO
  returningOnUpdate() {
    if (this.x < this.fighter.x + this.xOffset) {
      this.setVelocityX(600);
    } else {
      this.setVelocityX(-600);
    }
    if (
      this.x >= this.fighter.x + this.xOffset - 10 &&
      this.x <= this.fighter.x + this.xOffset + 10
    ) {
      this.setState("idle");
    }
    this.y = this.fighter.y + this.yOffset;
  }

  returningOnExit() {
    this.setVelocityX(0);
    this.returning = false;
  }

  setAnimationsOnMap() {
    this.animationsMap.set("idle", this.texture.key + "Idle");
    this.animationsMap.set("victory", this.texture.key + "VictoryPose");
    this.animationsMap.set("damaged", this.texture.key + "Damaged");
  }

  setBodySize() {
    this.body.setSize(
      this.conf.fistDimensions.sprite.width,
      this.conf.fistDimensions.sprite.height
    );
  }

  setState(state) {
    this.stateMachine.setState(state);
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }

  setXOffset(xOffset) {
    this.xOffset = xOffset;
  }

  setYOffset(yOffset) {
    this.yOffset = yOffset;
  }

  flipXOffset() {
    this.setXOffset(
      this.fighter.displayWidth - this.xOffset - this.displayWidth
    );
  }

  canAttack() {
    return !this.attacking && !this.returning;
  }

  setFighter(fighter) {
    this.fighter = fighter;
    this.controls = this.fighter.controls;
    this.setFlipX(this.fighter.flipX);
  }

  update(deltaTime) {
    this.stateMachine.update(deltaTime);
  }
}
