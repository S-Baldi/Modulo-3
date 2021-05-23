class Sc2 extends Phaser.Scene{
  constructor(){
    super('juego');
  }

  create(){
    
    //  Background
    this.add.image(400, 300, 'fondo');

    //  Plataformas
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'suelo');

    platforms.create(5, 400, 'plataformas');
    platforms.create(600, 400, 'plataformas');
    platforms.create(250, 250, 'plataformas');
    platforms.create(500, 100, 'plataformas');

    // Player
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Input Events
    if (cursors =! undefined){
      cursors = this.input.keyboard.createCursorKeys();
      teclaR = this.input.keyboard.addKey('R');
  }

    //  Stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70}
    });

    stars.children.iterate(function (child) {

        //  Rebote
        child.setCollideWorldBounds(true);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //Super estrella
    superstar = this.physics.add.group({
      key: "superstar",
      repeat: 4,
      setXY: {x: 10, y:0, stepX: 150}
    })

    superstar.children.iterate(function (child) {
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-100, 100), 20);
        child.setBounce(1);
        
    })

    bombs = this.physics.add.group();

    //  Textos
    scoreText = this.add.text(672, 3, 'Score\n0', { font: 'bold 30pt Arial', fontSize: '36px', fill: '#fff', align:'center'});
  
    textR = this.add.text (20, 3, 'Presiona R para reiniciar el nivel', { font: 'bold 10pt Arial', fontSize: '36px', fill: '#fff', align:'center'});
  
    //  Colliders
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(superstar, platforms);
    this.physics.add.collider(superstar, superstar);
    this.physics.add.collider(superstar, bombs);
    this.physics.add.collider(bombs, platforms);

    //  Overlap y hit bomb
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.overlap(player, superstar, this.collectSuperStar, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
    score = 0;

    music = this.sound.add('music');
    music.play({volume:0.5});  
    
  }

  update(){    

    if (teclaR.isDown){
      this.scene.restart();
      music.stop();
    }

    if (gameOver){
      return
    }

    if (cursors.left.isDown)
    {
      player.setVelocityX(-200);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(200);

      player.anims.play('right', true);
    }
    else
    {
      player.setVelocityX(0);

      player.anims.play('turn');
    }
    

    if (cursors.up.isDown && player.body.blocked.down)
    {     
      player.setVelocityY(-330);   
      //cont_salto = 0
    }
  }

  collectStar (player, star){

    star.disableBody(true, true);

    //  Sumar puntos
    score += 10;
    scoreText.setText('Score\n' + score);

    //  Sonido
    let sound = this.sound.add('colect');
    sound.play({volume:0.2});

    if (stars.countActive(true) === 0 && superstar.countActive(true) === 0)
    {
      //  Nuevas estrellas
      stars.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      superstar.children.iterate(function(child){
        child.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-100, 100), 20);
        child.setBounce(1);
      })

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

    }
  }

  collectSuperStar (player, superstar){

    superstar.disableBody(true, true);

    score += 15;
    scoreText.setText('Score\n' + score);

    let sound = this.sound.add('colect');
    sound.play({volume:0.2});
  }


  hitBomb (player, bomb)
  {
      this.gameOver()
      let soundDead = this.sound.add('dead');
      soundDead.play({volume:1});
  }


  gameOver() {        
    gameOver = true;
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn'); 
    
    music.stop();

    var gameOverButton = this.add.text(100, 270, 'Has Perdido', { fontFamily: 'Arial', fontSize: 110, color: '#000000', backgroundColor: '#a90000' })
    .setInteractive()
    .on('pointerover', () => this.add.text(100, 270, 'Has Perdido', { fontFamily: 'Arial', fontSize: 110, color: '#ffffff', backgroundColor: '#a90000' }))
    .on('pointerout', () => this.add.text(100, 270, 'Has Perdido', { fontFamily: 'Arial', fontSize: 110, color: '#000000', backgroundColor: '#a90000' }))
    .on('pointerdown', () => this.scene.start('final'));
    
  }

}
