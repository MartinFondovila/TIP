import { FighterPreview } from "./fighter-preview.js";

export class PlayerSelector {
  constructor(scene, playerKey, tint, previewX, previewY, previewFlip) {
    this.playerKey = playerKey;
    this.tint = tint;
    this.fighterSelected;
    this.selectionComplete = false;
    this.fighterPreview = new FighterPreview(
      scene,
      previewX,
      previewY,
      previewFlip
    );
  }

  handleSelect() {
    this.fighterSelected.handleSelect(this);
    if (this.fighterSelected.canBeSelected()) {
      this.selectionComplete = true;
      this.fighterPreview.completePreview();
    }
  }

  setFighterSelected(fighterSelected) {
    this.fighterSelected = fighterSelected;
    this.fighterPreview.changePreview(
      this.fighterSelected.fighterAnimsKey,
      this.fighterSelected.accessories,
      this.fighterSelected.fighterKey,
      this.fighterSelected.static,
      this.fighterSelected.flipConf
    );
  }

  restartPreview() {
    this.fighterPreview.restartPreview();
  }

  restart() {
    this.selectionComplete = false;
    this.fighterSelected?.restart();
    this.fighterPreview.restart();
  }

  stopPreview() {
    this.fighterPreview.stopPreview();
  }

  // Getters y Setters
  setPlayerKey(playerKey) {
    this.playerKey = playerKey;
  }

  getPlayerKey() {
    return this.playerKey;
  }

  setTint(tint) {
    this.tint = tint;
  }

  getTint() {
    return this.tint;
  }

  getFighterSelected() {
    return this.fighterSelected;
  }

  setSelectionComplete(selectionComplete) {
    this.selectionComplete = selectionComplete;
  }

  isSelectionComplete() {
    return this.selectionComplete;
  }
}
