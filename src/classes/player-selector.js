import { FighterPreview } from "./fighter-preview-container.js";

export class PlayerSelector {
  constructor(scene, playerKey, tint, previewX, previewY, previewFlip) {
    this.playerKey = playerKey;
    this.tint = tint;
    this.fighterRow;
    this.selectionComplete = false;
    this.fighterPreview = new FighterPreview(
      scene,
      previewX,
      previewY,
      previewFlip
    );
  }

  handleSelect(fighterRow) {
    this.fighterRow = fighterRow;
    this.fighterSelected.handleSelect(this);
  }

  handleChangeFighterSelected(fighterSelected) {
    this.fighterSelected = fighterSelected;
    this.fighterPreview.changeFighterAnimsKey(
      this.fighterSelected.fighterAnimsKey
    );
  }

  stopPreview() {
    this.fighterPreview.stopPreview();
  }

  setSelectionComplete(complete) {
    this.selectionComplete = complete;
    if (complete) {
      this.fighterPreview.completePreview();
    } else {
      // Ver como hacer para que no lo haga hasta que se termina de cambiar la pantalla
      this.handleChangeFighterSelected(this.fighterSelected);
    }
  }
}
