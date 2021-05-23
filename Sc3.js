class Sc3 extends Phaser.Scene{
  constructor(){
    super('final');
  }

  preload(){
    this.load.image('logo', 'assets/logo.png');

    this.load.image('reiniciar', 'assets/reiniciar.png');
    this.load.image('reiniciar2', 'assets/reiniciar2.png'); 
  }

  create(){
    this.add.image(400, 300, 'fondo')
    this.add.image(400, 150, 'logo').setScale(0.5)

    var puntajefinal = this.add.text (0, 0, 'Puntos: ' + score, {font: 'bold 30pt Arial', fontSize: '36px', fill: '#fff', align:'center'});
    Phaser.Display.Align.In.Center(puntajefinal, this.add.zone (400, 330, 800, 600));

    var botonReiniciar = this.add.image(700, 480, 'reiniciar').setScale(0.5)
    .setInteractive()
    .on('pointerover', () => this.add.image(700, 480, 'reiniciar2').setScale(0.5))
    .on('pointerout', () => this.add.image(700, 480, 'reiniciar').setScale(0.5))
    .on('pointerdown', () => this.volverAJugar()) 
  }

  volverAJugar(){
    this.scene.start('juego');
  }
}