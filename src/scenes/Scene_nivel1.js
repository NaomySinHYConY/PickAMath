class Scene_nivel1 extends Phaser.Scene {
    constructor() {
        super('Scene_nivel1'); 
    }

    preload() {
        console.log('Scene_nivel1');
        this.load.setPath('./assets/nivel1');
        this.load.image(['fondo_nivel1', 'titulo', 'tituloPAM', 'IntentosCuadro', 'EliminaEnemigos', 'Mush', 
        'speech', 'btnResp', 'Intentos', 'operacionEjemplo', '169','189', '250']);
        this.load.image('astro', '../astro.png');
        this.load.image('planet', '../Planetas/planet12 2.png');
        this.load.image('Next', '../Botones/next.png');

    }

    create() {
        const eventos = Phaser.Input.Events;

        this.fondo = this.add.image(0, 0, 'fondo_nivel1', 1).setOrigin(0);
        this.intentosCuadro = this.add.image(55, 20, 'IntentosCuadro').setOrigin(0).setScale(0.8);
        this.astro = this.add.image(0, 0, 'astro', 1).setOrigin(0).setInteractive().setScale(0.5);
        this.titulo = this.add.image(500, 30, 'titulo').setScale(0.6);
        this.tituloPAM = this.add.image(500, 58, 'tituloPAM').setScale(0.65);
        this.planet = this.add.image(0, 505, 'planet').setOrigin(0).setScale(0.8);
        this.letrero = this.add.image(750, 10, 'EliminaEnemigos').setOrigin(0).setScale(0.75);
        this.mush = this.add.image(720, 0, 'Mush').setOrigin(0);
        this.speech = this.add.image(500, 260, 'speech').setOrigin(0);
        this.btn_Next = this.add.image(900, 555, 'Next').setOrigin(0).setScale(0.8).setInteractive();
        this.btn_Resp1 = this.add.image(1000, 170, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp1');
        this.btn_Resp2 = this.add.image(0, 300, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp2');
        this.btn_Resp3 = this.add.image(1000, 430, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp3');
        this.Intentos = this.add.image(60, 45, 'Intentos').setOrigin(0).setScale(0.8);
        this.operacion = this.add.image(550, 340, 'operacionEjemplo').setOrigin(0).setScale(0.8);
        this.numResp1 = this.add.image(175, 170, '250').setScale(0.8).setInteractive()
        .setName('numResp1');
        this.numResp2 = this.add.image(385, 300, '189').setScale(0.8).setInteractive()
        .setName('numResp2');
        this.numResp3= this.add.image(175, 430, '169').setScale(0.8).setInteractive()
        .setName('numResp3');
        



        this.txtNumOportunidades = this.add.text(215, 40, "?", 
        {font: '28px Rubik', fill: '#FF8139'});

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'Resp1'){
                gameObject.setTint(0xF46036);
                gameObject.setScale(0.9);
                this.numResp1.setScale(0.9)
            } if (gameObject.name == 'Resp2') {
                gameObject.setTint(0xF46036);
                gameObject.setScale(0.9);
                this.numResp2.setScale(0.9)
            } if (gameObject.name == 'Resp3'){
                gameObject.setTint(0xF46036);
                gameObject.setScale(0.9);
                this.numResp3.setScale(0.9)
            }

                // this.hover_tarjeta.play();
                // this.hover_tarjeta.volume = 1.8; 
        });
        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'Resp1'){
                gameObject.clearTint();
                gameObject.setScale(0.8);
                this.numResp1.setScale(0.8)
            } if (gameObject.name == 'Resp2') {
                gameObject.clearTint();
                gameObject.setScale(0.8);
                this.numResp2.setScale(0.8)
            } if (gameObject.name == 'Resp3'){
                gameObject.clearTint();
                gameObject.setScale(0.8);
                this.numResp3.setScale(0.8)
            }
        });

        this.tweenMush = this.add.tween({
            targets: [this.mush],
            ease: 'Bounce',
            y:330,
            repeat: 0,
            onStart: () => {
               this.mush.setScale(0.7);
            },
            onComplete: () => {
                this.mush.setScale(1);
            },
        });

        this.tweenSpeech = this.add.tween({
            targets: [this.speech, this.operacion],
            ease: 'Linear',
            time:2000,
            repeat: 0,
            onStart: () => {
                this.speech.alpha = 0.1;
                this.operacion.alpha = 0.1;
            },
            onComplete: () => {
                this.speech.alpha = 1;
                this.operacion.alpha = 1;
            },
        });

        this.tweenResps1y3 = this.add.tween({
            targets: [this.btn_Resp1, this.btn_Resp3],
            ease: 'Bounce.Out',
            x: 170,
            onStart: () => {
                this.btn_Resp1.setScale(1);
                this.btn_Resp3.setScale(1);
                this.numResp1.alpha = 0.1;
                this.numResp3.alpha = 0.1;
             },
             onComplete: () => {
                this.btn_Resp1.setScale(0.8);
                this.btn_Resp3.setScale(0.8);
                this.numResp1.alpha = 1;
                this.numResp3.alpha = 1;
             },
        });

        this.tweenResp2 = this.add.tween({
            targets: [this.btn_Resp2],
            ease: 'Bounce.Out',
            x: 380,
            onStart: () => {
                this.btn_Resp2.setScale(1);
                this.numResp2.alpha = 0.1;
             },
             onComplete: () => {
                this.btn_Resp2.setScale(0.8);
                this.numResp2.alpha = 1;
             },
        });
        
       
    }
}
export default Scene_nivel1;