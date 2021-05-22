class Sc3 extends Phaser.Scene {
  constructor(){
    super('final');
  }

  preload(){
    this.load.image('logo', 'assets/logo.png')
  }

  create(){
    this.add.image(400, 300, 'fondo')
    this.add.image(400, 100, 'logo').set.Scale(0.5)

    var puntajefinal = this.add.text (0, 0, 'Puntos: ' + score, {font: 'bold 30pt Arial', fontSize: '36px', fill: '#fff', align:'center'});
    Phaser.Display.Align.In.Center(puntajefinal, this.add.zone (400, 300, 800, 600));

    var restartButton = this.add.text(700, 500, 'Reiniciar', { fontFamily: 'Arial', fontSize: 20, color: '#000000' })
      .setInteractive()
      .on('pointerdown', () => this.reiniciar() );
  }

    reiniciar(){
      this.scene.start('juego');
    }
}