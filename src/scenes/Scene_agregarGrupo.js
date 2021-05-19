class Scene_agregarGrupo extends Phaser.Scene {
    constructor() {
        super('Scene_agregarGrupo'); 
    }

    preload() {
        console.log('Scene_agregarGrupo');
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");

        this.load.image('cancelar', '/Botones/cancelar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('btn_claves','/Grupo/btn_claves.png');
        this.load.image('formularioGrupo','/Grupo/formularioGrupo.png');
        //this.load.image('descargar','/Botones/descargar.png');
        this.load.image('back','back.png');
        this.load.image('tnuevoGrupo','/Grupo/tnuevoGrupo.png');

        this.load.audio("bback", "/sonidos/glitch-2.mp3");

        this.load.html('createCodes', 'txt/createCode.html');
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
        this.btn_claves        = this.add.image(830,600,"btn_claves").setInteractive().setName('btn_claves').setDepth(2);
        this.tnuevoGrupo  = this.add.image(500,45,"tnuevoGrupo").setDepth(2);
        this.logo           = this.add.image(190,600,"logo").setScale(0.80).setDepth(2);
        this.cancelarG       = this.add.image(610,600,"cancelar").setInteractive().setName('cancelarG').setDepth(2);

        this.createCodes = this.add.dom(550, 550).createFromCache('createCodes');
        this.createCodes.setDepth(5);

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'btn_claves' || gameObject.name == 'cancelarG' || gameObject.name == 'back'){
                gameObject.setScale(1.20);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'btn_claves' || gameObject.name == 'cancelarG' || gameObject.name == 'back'){
                gameObject.setScale(1.05);
            }
        });

        this.btn_claves.on(eventos.POINTER_DOWN, () => {
            //Corregir acá
            this.next.play();
        });

        this.cancelarG.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Scene_grupos');
            this.bback.play();
        });

        this.back.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Scene_grupos');
            this.bback.play();
        });
    }
}
export default Scene_agregarGrupo;