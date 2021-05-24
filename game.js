var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false
      }
  },
  scene:[Sc1, Sc2, Sc3, Sc4]
};

var game = new Phaser.Game(config);

var player;
var stars;
var superstar;
var bombs;
var platforms;
var cursors;
var score;
var gameOver;
var scoreText;
var teclaR;
var textR;
var music;
