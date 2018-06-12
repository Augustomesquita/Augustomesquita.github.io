var conf = {
  width: 800,
  height: 600,
  renderer: Phaser.AUTO,
  parent: null,
  transparent: true,
  antialias: false,
  scaleMode: Phaser.ScaleManager.EXACT_FIT
};

var game = new Phaser.Game(conf);

var gameTitle = {
  preload: function() {
    game.load.script("gameCommons", "js/game_commons.js");
    game.load.script("gameConfig", "js/game_config.js");
    game.load.script("gameLevel_001", "js/level_001/game_level_001.js");

    game.load.audio("audioBackground", "audio/background.wav");
    game.load.image("imageBackgroundTitle", "img/title.png");
  },

  create: function() {
    configKeys();
    game.state.add("stateGameLevel001", gameLevel_001);
    game.add.sprite(0, 0, "imageBackgroundTitle");
    
    var titleCopyright = game.add.text(150, 500, "Augusto Mesquita - Javascript Game");
    titleCopyright.font = 'Arial Black';
    titleCopyright.fontSize = "24px";
    titleCopyright.fontWeight = 'bold';
    titleCopyright.fill = "#FFF";
    titleCopyright.stroke = '#000';
    titleCopyright.strokeThickness = 8;

    var subtitleCopyright = game.add.text(100, 580, "@MesquitaGame Copyright - https://github.com/augustomesquita");
    subtitleCopyright.font = 'Arial Black';
    subtitleCopyright.fontSize = "16px";
    subtitleCopyright.fontWeight = 'bold';
    subtitleCopyright.fill = "#000";
    subtitleCopyright.stroke = '#FFF';
    subtitleCopyright.strokeThickness = 2;

    configBackgroundSound("audioBackground");
  },

  update: function() {
    if (keySpaceBar.isDown) {
      game.state.start("stateGameLevel001");
    }
  }
};

game.state.add("stateGameTitle", gameTitle);
game.state.start("stateGameTitle");
