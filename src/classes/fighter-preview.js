import * as Phaser from "phaser";
import { SHARED_CONF } from "../utils";

export class FighterPreview extends Phaser.GameObjects.Container {
  constructor(scene, x, y, previewFlip) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.flip = previewFlip;
    this.accessoriesSprites = [];

    if (previewFlip) {
      this.fighter = this.scene.add.sprite(0, 0).setOrigin(1, 0.5);
      this.fighter.setFlipX(true);
      this.fighterName = this.scene.add
        .text(
          -(SHARED_CONF.fighterDimensions.width / 2),
          SHARED_CONF.fighterDimensions.height / 2 + 5,
          "",
          { fontSize: 40 }
        )
        .setOrigin(0.5, 0)
        .setScale(0.3);
    } else {
      this.fighter = this.scene.add.sprite(0, 0).setOrigin(0, 0.5);
      this.fighterName = this.scene.add
        .text(
          SHARED_CONF.fighterDimensions.width / 2,
          SHARED_CONF.fighterDimensions.height / 2 + 5,
          "",
          { fontSize: 40 }
        )
        .setOrigin(0.5, 0)
        .setScale(0.3);
    }

    this.add([this.fighter, this.fighterName]);
    this.setScale(3);
  }

  changePreview(fighterAnimsKey, accessories, fighterName, isStatic, flipConf) {
    this.fighterAnimsKey = fighterAnimsKey;
    if (accessories.length > this.accessoriesSprites.length) {
      this.addSprites(accessories.length - this.accessoriesSprites.length);
    }

    // Configuro los sprites que ya tengo
    this.accessoriesSprites.forEach((accessorySprite, index) => {
      let accessory = accessories[index];
      if (accessory) {
        accessorySprite
          .setX(this.flip ? accessory.x * -1 : accessory.x)
          .setY(accessory.y)
          .setTexture(accessory.texture)
          .setFlipX(this.flip)
          .setScale(accessory.scale)
          .setOrigin(this.flip ? 1 : 0, 0.5)
          .setVisible(true);
      } else {
        accessorySprite.setVisible(false);
      }
    });

    if (!isStatic) {
      this.setFlip(this.fighter, flipConf);
      this.fighter.anims.play(fighterAnimsKey + "Idle");
      this.accessoriesSprites.forEach((accessory) => {
        if (accessory.visible) {
          accessory.anims.play(accessory.texture.key + "Idle");
        }
      });
    } else {
      this.fighter.anims.stop();
      this.fighter.setTexture(fighterAnimsKey);
      this.setFlip(this.fighter, flipConf);
    }

    this.fighterName.setText(fighterName);

    if (!this.visible) {
      this.setVisible(true);
    }
  }

  addSprites(quantity) {
    for (let index = 0; index < quantity; index++) {
      let sprite = this.scene.add.sprite(0, 0);
      this.accessoriesSprites.push(sprite);
      this.add(sprite);
    }
  }

  // Esto es medio feo pero por ahora sirve
  // Falta revisar lo que pasa cuando se vuelve para atras una seleccion
  // se se spamea mucho esc y enter hay veces que el preview desaparece
  // Fijarse de poner transiciones entre pantallas
  setFlip(sprite, flipConf) {
    if (flipConf.onlyFlipOnLeft) {
      sprite.setFlipX(true);
    } else if (flipConf.onlyFlipOnRight) {
      sprite.setFlipX(false);
    } else if (this.flip) {
      sprite.setFlipX(!flipConf.flip);
    } else {
      sprite.setFlipX(flipConf.flip);
    }
  }

  stopPreview() {
    this.fighter.anims.stop();
    this.accessoriesSprites.forEach((accessory) => {
      accessory.anims.stop();
    });
    this.setVisible(false);
  }

  restartPreview() {
    this.fighter.anims.play(this.fighterAnimsKey + "Idle");
    this.accessoriesSprites.forEach((accessory) => {
      if (accessory.visible) {
        accessory.anims.play(accessory.texture.key + "Idle");
      }
    });
  }

  restart() {
    this.fighter.anims.stop();
    this.fighter.setTexture(null);
    this.accessoriesSprites.forEach((accessory) => {
      accessory.anims.stop();
      accessory.setTexture(null);
    });
  }

  completePreview() {
    this.fighter.anims.play(this.fighterAnimsKey + "VictoryPose");
    this.accessoriesSprites.forEach((accessory) => {
      if (accessory.visible) {
        accessory.anims.play(accessory.texture.key + "VictoryPose");
      }
    });
  }
}
