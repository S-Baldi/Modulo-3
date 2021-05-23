class Sc4 extends Phaser.Scene{
  constructor(){
    super('ayuda');
  }

  preload(){
    this.load.image('fondo', 'assets/cielouno.jpg');
    this.load.image('logo', 'assets/logo.png');

    
    this.load.image('atras', 'assets/atras.png');
    this.load.image('atras2', 'assets/atras2.png'); 
  }


  create(){
    this.add.image(400, 300, 'fondo');
    this.add.image(400, 150, 'logo').setScale(0.5);

    var help = this.add.text (0, 0, 'Usa las flechas del teclado para moverte\n \n Recolecta la mayor cantidad de estrellas\n \n Usa la tecla R para reiniciar el nivel', {font: 'bold 30pt Arial', fontSize: '36px', fill: '#fff', align:'center'});
    Phaser.Display.Align.In.Center(help, this.add.zone (400, 400, 800, 600));

    var botonVolver = this.add.image(700, 550, 'atras').setScale(0.5)
    .setInteractive()
    .on('pointerover', () => this.add.image(700, 550, 'atras2').setScale(0.5))
    .on('pointerout', () => this.add.image(700, 550, 'atras').setScale(0.5))
    .on('pointerdown', () => this.volverMenu()) 
  }

  volverMenu(){
    this.scene.start('menu');
  }

}