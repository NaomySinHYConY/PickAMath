class Scene_registro extends Phaser.Scene {
    constructor() {
        super('Scene_registro'); 
    }

    preload() {
        console.log('Scene_registro');
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");

        this.load.image('guardar', '/Botones/guardar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('formulario','/Registro/formulario.png');
        this.load.image('cancelar','/Botones/cancelar.png');
        this.load.image('back','back.png');
        this.load.image('tnuevoUsuario','/Registro/tnuevoUsuario.png');
       

        this.load.audio("bback", "/sonidos/glitch-2.mp3");
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.musicConf = {
            volume: 0.3,
            loop: false
        };
        this.musicConf2 = {
            volume: 0.7,
            loop: false
        };
        this.whosh = this.sound.add("whosh", this.musicConf);
        this.next = this.sound.add("next", this.musicConf2);
        this.bback = this.sound.add("bback", this.musicConf2);

        this.back           = this.add.image(50,600,"back").setInteractive().setName('back').setDepth(2);
        this.formulario     = this.add.image(500,330,"formulario").setDepth(1).setScale(1.2); 
        this.guardar        = this.add.image(830,600,"guardar").setInteractive().setName('guardar').setDepth(2);
        this.tnuevoUsuario  = this.add.image(500,45,"tnuevoUsuario").setDepth(2);
        this.logo           = this.add.image(110,45,"logo").setScale(0.80).setDepth(2);
        this.cancelar       = this.add.image(610,600,"cancelar").setInteractive().setName('cancelar').setDepth(2);


        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'guardar' || gameObject.name == 'cancelar' || gameObject.name == 'back'){
                gameObject.setScale(1.20);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'guardar' || gameObject.name == 'cancelar' || gameObject.name == 'back'){
                gameObject.setScale(1.05);
            }
        });

        this.guardar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Bootloader');
            this.next.play();
        });

        this.cancelar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Bootloader');
            this.next.play();
        });

        this.back.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Bootloader');
            this.bback.play();
        });
    }
}
export default Scene_registro;