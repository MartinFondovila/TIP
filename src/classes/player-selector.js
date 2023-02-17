export class PlayerSelector {
  constructor(playerKey, tint) {
    this.playerKey = playerKey;
    this.tint = tint;
    this.fighterSelected;
    this.fighterRow;
    this.selectionComplete = false;
  }

  handleSelect(fighterSelected, fighterRow) {
    this.fighterSelected = fighterSelected;
    this.fighterRow, fighterRow;
    fighterSelected.handleSelect(this);
  }

  setSelectionComplete(complete) {
    this.selectionComplete = complete;
  }
}
