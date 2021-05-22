var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 350 },
        debug: true
      }
  },
  scene:[Sc1, Sc2, Sc3]
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
