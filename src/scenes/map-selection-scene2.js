import BaseMenuScene from "./base-menu-scene.js";

class MapSelectionScene extends BaseMenuScene {
  constructor() {
    super("MapSelectionScene");
    this.controls;
    this.options = [];
    this.selectedOption;
  }

  init() {}

  preload() {
    this.load.image(
      "theme1",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABBklEQVRoge3SwU6DQBSF4QNjYdthhtolTU3cFq+mLiH1AWjUfUl8AGLjHle+tgMpxk1NGNTV+VZDLvmTgQsQERERERERERER/Q/dWc/Pzt9HtES0yA+tfESrf1uda4VP+tdasfZolXfAtTRQya55MRXC47abRc/j72hv9SHMHyyU+bCXjynWtiyG6dgW6ia+wf6gltBtZHHMZgvP1gJBEbRQrUqQZzBYAveerQTBZiWSF+4vuGcTGhHr2Zq7Vu2WdnNqRe5sprQq9Ke+lX6berRWLeJquKP7Xm8TWhcJ9kMLZTZLJ7Qi3e3XqVX771fXwpW8frXC3TbzaBEREREREREREdFf+gQ5+yFDSnqbkwAAAABJRU5ErkJggg=="
    );

    this.load.image(
      "theme2",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABNElEQVRoge3SQU6DQBgF4AcjtEunTFuWNJi4BUetS7AcgMYLlMQDoI17XHltZyhtVyROo67et4K+5DH95weIiIiIiIiIiIiI/oe00uux+FY//7xLa6n1eFdeycThZDkgxrqmMT7bX+q6msHLXLvKBzubFmK2aV+jGv5+bTORjX9nrEvdy52fVwoi+lLLlzlSVRYmC2r3cyk07eQO252IIbtQYZ8Ei0PsPK8FvMLrIDoxQ54gQgw89enU+R7tiFda54WZjnmP/Ehr1advjw5Vwz16WWOWNhu6QvMc2TBVLsc6d9Xon/qu+RCWLtM6d606TOrjfzTz+jBZsHSqOnWZvdweu1AmgT2a+e2irlDa/Rq6msN+CVVVxQVduNHvpy5/s05M5pk7cNl7IiIiIiIiIiIi+kvfyDslH1Huoh0AAAAASUVORK5CYII="
    );

    this.load.image(
      "theme3",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABM0lEQVRoge3UwW6CMBzH8R904tVSdB4hLtkV7BZ3hLAHwPgCkvkATLM7nvbaawG9maxk8/T7nCD/5JvSNgBERERERERERERE9yGt1ezW+KCOv29pLbW+2QpkKWOHlWWAuNWahjg3f9QSDZLctVW8As+6gQjL5qAq+KdNt67KvRW9yL2fvUcQ6jt63M2xioqh8Vm5tlA30zW2e7GEbIMIp3iysEM/WzqkutYCXu61EK0IkcVQMIW3riVV7NgK4aWJ1lluTsG8K19pHXVTv2gdWzPTqs2lTYdWYJ5VP3Y/R9uym3xpzfvZxx4iHdFKWnMFLt9o9uvLLqoyGzmi9RBie2mhiCd2aWKNczuiFUh7v4ZW3d+viSqVQ+rawpM+Xlt+uYntcOfynyAiIiIiIiIiIqL/9QPC+Sgv2d5Y+QAAAABJRU5ErkJggg=="
    );

    this.load.image(
      "theme4",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABGUlEQVRoge3SO26DQBSF4QMTIKV52S5BjpQWMonsEmQvACsbACkLQLHS02XbuYNxOkcZ8qjOVw264hczDEBERERERERERET0P0Jjs7g6d/X3W1qHWn/RCmKbLysBdb3V/WJrZ9+qn4B73UNF+/4lbuCetuPwtrBuJY9h65aHBCp+T1bPKTZJXZlh3tq30PXBA46tWiMc/ASnzFua4QHWrSWcyhmgBhWhzOT9tZyUzLzIvhXBKXKty0r+gjzHbqx1IrN8sG8tpNXJpS2mli9rE+nk+u3mtBqMq7GVnmemv5rRkv0EzWWPcl5v5/GsPd5EOF5aqDMv/UHLD839mlrddL9mtnCnXz9b7n6bzWgRERERERERERHRX/oAyJEitMDR3yQAAAAASUVORK5CYII="
    );

    this.load.image(
      "theme5",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABOElEQVRoge3SQU+DMBjG8Qe6gceVdnNHyIxewarzCNk+wIhfABI/AHEx8Ujiwa9tm43d0HWJnp7fjbzJPy19ASIiIiIiIiIiIqL/IZ3VbGQa2WFzdssYacxoa6qMOb8FFIAYa13lHqHfWuUFreoRuDMdRLLpXtUO4X7tZnHn39IPsgmLrYZQX/r6ZY6VrtyRJh/bnXcLbRffo27EErKPNPbpdGFnQkrt21ogKIMeohcJihQKS+DZzoKn28LnYK6VIMgzY4rSvoL9VqHdBXegKEVberZmttXavcyPLbej6jAOxt74x5a7zNCan8bCZ8WGVtYj3g13tP/r3c7qBll5QWuSoB5aqNKpO1rWofL9964VSbdfx1Z72K9Ybbx3wrVwY95OrXCzTt3wU/c+LSIiIiIiIiIiIvpL3+DHJudxDOGEAAAAAElFTkSuQmCC"
    );

    this.load.image(
      "theme6",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpbFxcWcnJyjo6O3t7e+vr6qqqqxsbH7WNssAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABOElEQVRoge3SvW7CMBiF4ZMYko74h58xlEpdk5oKxqRwAaDeAEi9gKioe5h627Uh6QaqUdvpPBPok17ZzgcQERERERERERER/Q/pzQaXxnfFy89b1kprL7eOcx1ysgIQF1sax80vtfpDzJrQVvUMPNoaQq3qN71BfFj4WaoCQm3LzOUuLtYGQn+a8as7jalKN+updcixzi3s6/QJ252YQDaJwSHrj9xMzGXw248QlVED0QiFInMvPgGWbhaZ+yrkYL6lEOVTa4vSfQX3X8faWuNbCtMysDVwrb1b2rxtJe63v5zIr+zLtZZfpK41PM96uc+Ft6YN0k13R/deHzjtxE137ClsuxaqrO+Ploxv2fsoT6Tfr7a1P+8XqtMnCG7hwb5/t+LVIvPDVNchLSIiIiIiIiIiIvpLX4mGJlBp+ZbMAAAAAElFTkSuQmCC"
    );
  }

  create() {
    //array of all available themes
    var themes = [];
    themes.push(game.add.sprite(0, 0, "theme1"));
    themes.push(game.add.sprite(0, 0, "theme2"));
    themes.push(game.add.sprite(0, 0, "theme3"));
    themes.push(game.add.sprite(0, 0, "theme4"));
    themes.push(game.add.sprite(0, 0, "theme5"));
    themes.push(game.add.sprite(0, 0, "theme6"));

    //number of themes
    var totalThemes = themes.length;

    //the selected theme
    var prime = 0;

    //speed of moving animation
    var animationSpeed = 200;

    //initial setup; all items on the right side; anchor set to mid;
    themes.forEach(function (item) {
      item.anchor.setTo(0.5, 0.5);
      item.x = game.width + 150;
      item.y = game.height / 2;
      item.inputEnabled = true;
      item.events.onInputDown.add(clickListener, this);
    });

    //initial position of themes on stage based on the selected theme
    function setToPosition(prime) {
      themes[prime].x = game.width / 2;

      //check if there is another theme available to display on the right side; if yes then position it
      if (prime < totalThemes - 1) {
        themes[prime + 1].x = game.width / 2 + 67 + 75;
        themes[prime + 1].scale.setTo(0.5, 0.5);
      }

      //check if there is another theme available to display on the left side; if yes then position it
      if (prime > 0) {
        themes[prime - 1].x = game.width / 2 - 67 - 75;
        themes[prime - 1].scale.setTo(0.5, 0.5);
      }
    }

    //set initial state
    setToPosition(prime);

    //predefined x positions for the 3 visible cards
    var xleft = game.width / 2 - 67 - 75;
    var xprime = game.width / 2;
    var xright = game.width / 2 + 67 + 75;

    //move to next theme
    function nextTheme() {
      //move prime left
      game.add
        .tween(themes[prime])
        .to({ x: xleft }, animationSpeed, null, true);
      game.add
        .tween(themes[prime].scale)
        .to({ x: 0.5, y: 0.5 }, animationSpeed, null, true);
      //move right to prime
      if (prime < 5) {
        game.add
          .tween(themes[prime + 1])
          .to({ x: xprime }, animationSpeed, null, true);
        game.add
          .tween(themes[prime + 1].scale)
          .to({ x: 1, y: 1 }, animationSpeed, null, true);
      }
      //move new to right
      if (prime < 4) {
        themes[prime + 2].x = game.width + 150;
        themes[prime + 2].scale.setTo(0.5, 0.5);
        game.add
          .tween(themes[prime + 2])
          .to({ x: xright }, animationSpeed, null, true);
      }
      //move left out
      if (prime > 0) {
        //themes[prime+1].x = -150;
        themes[prime - 1].scale.setTo(0.5, 0.5);
        game.add
          .tween(themes[prime - 1])
          .to({ x: -150 }, animationSpeed, null, true);
      }
      prime++;
    }

    //move to previous theme
    function previousTheme() {
      //move prime left
      game.add
        .tween(themes[prime])
        .to({ x: xright }, animationSpeed, null, true);
      game.add
        .tween(themes[prime].scale)
        .to({ x: 0.5, y: 0.5 }, animationSpeed, null, true);
      //move left to prime
      if (prime > 0) {
        game.add
          .tween(themes[prime - 1])
          .to({ x: xprime }, animationSpeed, null, true);
        game.add
          .tween(themes[prime - 1].scale)
          .to({ x: 1, y: 1 }, animationSpeed, null, true);
      }
      //move new to left
      if (prime > 1) {
        themes[prime - 2].x = -150;
        themes[prime - 2].scale.setTo(0.5, 0.5);
        game.add
          .tween(themes[prime - 2])
          .to({ x: xleft }, animationSpeed, null, true);
      }
      //move right out
      if (prime < totalThemes - 1) {
        //themes[prime+1].x = -150;
        themes[prime + 1].scale.setTo(0.5, 0.5);
        game.add
          .tween(themes[prime + 1])
          .to({ x: game.width + 150 }, animationSpeed, null, true);
      }
      prime--;
    }

    //click on theme listener
    function clickListener(el) {
      console.log(themes.indexOf(el));
      var clickedPos = themes.indexOf(el);
      if (clickedPos > prime) {
        //move to left
        nextTheme();
      } else if (clickedPos < prime) {
        //move to right
        previousTheme();
      }
    }
  }

  update() {}
}

export default MapSelectionScene;
