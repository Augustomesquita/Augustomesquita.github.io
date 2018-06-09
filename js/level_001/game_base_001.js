/**
 * Função chamada antes do create, onde indicamos os recursos
 * que iremos utilizar e suas 'keys', as quais serão usadas para
 * resgastar estes recursos posteriormente na função create.
 */
function preload() {
  this.load.audio("audioBackground", "audio/background.wav");
  this.load.audio("audioCoin", "audio/coin.wav");
  this.load.audio("audioJump", "audio/jump.wav");
  this.load.image("imageBackgroundSky", "img/sky.png");
  this.load.image("imagePlatform", "img/platform.png");
  this.load.spritesheet("spriteDude", "img/dude.png", 32, 48);
  this.load.spritesheet("spriteCoin", "img/coin_sheet.png", 24, 24);
}

/**
 * Aqui é a função chamada antes de entrar no game loop (função update)
 */
function create() {
  // Define o sistema de física.
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Outras configurações
  configSound();
  configKeys();
  configImagesAndSprites();

  coins = game.add.group();
  coins.enableBody = true;

  for (var i = 0; i < 12; i++) {
    var coin = coins.create(i * 70, 0, "spriteCoin");
    coin.body.gravity.y = 300;
    coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    coin.animations.add("animationCoin", [0, 1, 2, 3], 10, true);
    coin.animations.play("animationCoin");
  }

  player = game.add.sprite(50, game.world.height - 150, "spriteDude");
  game.physics.arcade.enable(player);
  player.body.gravity.y = 1000;
  player.body.bounce.y = 0.2;
  player.body.collideWorldBounds = true;
  player.animations.add("left", [0, 1, 2, 3], 10, true);
  player.animations.add("right", [5, 6, 7, 8], 10, true);

  txtScore = game.add.text(16, 24, "SCORE: 0", {
    fontSize: "32px",
    fill: "#fff"
  });

  game.add.text(250, 580, "Augusto Mesquita - Javascript Game", {
    fontSize: "16px",
    fill: "#FFF"
  });
}

/**
 * Game loop.
 */
function update() {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.overlap(player, coins, collectCoin);

  player.body.velocity.x = 0;
  if (keys.left.isDown || keyA.isDown) {
    player.body.velocity.x = -150;
    player.animations.play("left");
  } else if (keys.right.isDown || keyD.isDown) {
    player.body.velocity.x = 150;
    player.animations.play("right");
  } else {
    player.animations.stop();
    player.frame = 4;
  }

  if ((keys.up.isDown || keyW.isDown) && player.body.touching.down) {
    player.body.velocity.y = -580;
    audioJump.play();
  }
}

function collectCoin(player, coin) {
  audioCoin.play();

  coin.kill();
  score += 10;
  txtScore.text = "SCORE: " + score;
}
