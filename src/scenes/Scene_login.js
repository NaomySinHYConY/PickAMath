class Scene_login extends Phaser.Scene {
    constructor() {
        super('Scene_login'); 
    }

    preload() {
        console.log('Scene_login');
        this.load.setPath('./assets/');

        this.load.image('galaxia','galaxia.png');
        this.load.image('play', '/Botones/play.png');
        this.load.image('astro2', 'astro2.png');
        this.load.image('fondo_numeros', 'numeros.png');
        this.load.image('logo', 'logo.png');
        this.load.image('alien','alien.png');
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondo_numeros  = this.add.image(490,330,"fondo_numeros").setDepth(1).setScale(1.2);
        this.logo           = this.add.image(100,50,"logo");
        this.astro2         = this.add.image(500,270,"astro2").setScale(1.3).setDepth(2);
        this.registrar      = this.add.image(900,50,'registrar').setInteractive().setName('registrar').setDepth(2);
        this.alien          = this.add.image(80,560,"alien").setInteractive();
        this.play           = this.add.image(510,550,"play").setInteractive().setName('play').setDepth(2);

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
                target: 'Scene_mapa',
                duration: 100,
                moveBelow: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
        });

        this.registrar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            
            this.scene.transition({
                target: 'Scene_registro',
                duration: 100,
                moveBelow: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
        });
    }
}
export default Scene_login;