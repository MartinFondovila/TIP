class BaseMenuScene extends Phaser.Scene {
    constructor(sceneName, canReturn) {
      if (new.target === BaseMenuScene) {
        throw new TypeError(
          "No se puede instanciar esta clase porque es abstracta."
        );
      }
      super(sceneName);
      this.canReturn = canReturn;
      this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
      this.inputPointerEvents = Phaser.Input.Events;
      this.animationEvents = Phaser.Animations.Events;
      this.inputKeyboard = Phaser.Input.Keyboard;
      this.inputKeyboardEvents = Phaser.Input.Keyboard.Events;
      this.options = []
    }
  
    init() {
    }
  
    preload() {}
  
    create() {
      this.createControls();
      this.createReturnOption();
    }

    update() {}

    createControls() {
      this.controls = this.input.keyboard.addKeys({
        moveLeft: this.keyCodes.LEFT,
        moveUp: this.keyCodes.UP,
        moveRight: this.keyCodes.RIGHT,
        moveDown: this.keyCodes.DOWN,
        back: this.keyCodes.ESC,
        select: this.keyCodes.ENTER,
      });
    }

    createReturnOption() {
      if(this.canReturn) {
        this.options.push(this.add.text(this.scale.width-10, this.scale.height-10, "Back", {fontSize: 40}).setOrigin(1,1));
      }
    }
  }
  
  export default BaseMenuScene;
  