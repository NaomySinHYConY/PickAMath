class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.image('PAM', 'PAM.png');
        this.load.image('PickAMath', 'PickAMath.png');
        this.load.image('fondo','fondo.png');
        this.load.image('cat','cat.png');
        this.load.image('astro','astro.png');
        this.load.image('galaxia','galaxia.png');
        this.load.image('play', '/Botones/play.png');
        this.load.image('registrar','/Botones/btn_registro.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.titulo     = this.add.image(500, 270, 'PAM').setDepth(2);
        this.titulo_2   = this.add.image(500,350,"PickAMath").setDepth(2);
        this.galaxia    = this.add.image(640,330,"galaxia").setScale(0.70).setInteractive().setDepth(0);
        this.fondo      = this.add.image(470,330,"fondo").setDepth(1);
        this.astro      = this.add.image(750,280,"astro").setDepth(2).setInteractive();
        this.play       = this.add.image(500,550,"play").setInteractive().setName('play').setDepth(2);
        this.registrar  = this.add.image(900,50,'registrar').setInteractive().setName('registrar').setDepth(2);

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'play' || gameObject.name == 'registrar'){
                //this.hover.play(this.musicConf2);
                gameObject.setScale(1.10);
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'play' || gameObject.name == 'registrar'){
                //this.hover.play(this.musicConf2);
                gameObject.setScale(1);
            }
        });

        this.play.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)

            this.scene.transition({
                target: 'Scene_login',
                duration: 4000,
                moveBelow: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
        });

        this.registrar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            
            this.scene.transition({
                target: 'Scene_registro',
                duration: 4000,
                moveBelow: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
        });
        /*
        this.tweens2 = this.add.tween({
            targets: this.astro,
            props: {
              alpha: { value: 0}
            },
            yoyo: false,
            repeat: 0,
        });
        */
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}
export default Bootloader;