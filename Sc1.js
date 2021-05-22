class Sc1 extends Phaser.Scene{
  constructor(){
    super ("menu");
  }

  preload()
  {
    this.load.image('menuprincipal', 'assets/MP.png')
    this.load.image('fondo', 'assets/cielouno.jpg');
    this.load.image('suelo', 'assets/suelouno.png');
    this.load.image('plataformas', 'assets/suelodos.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('superstar', 'assets/estrellauno.png')
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('colect', 'audio/star_1.wav');
  }

  create() {

    //Animaciones Personaje
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    
    var menuprincipal = this.add.image (400, 301, 'menuprincipal')
    menuprincipal.setInteractive()
    menuprincipal.on('pointerdown', () => this.scene.start('juego') );

  }

}