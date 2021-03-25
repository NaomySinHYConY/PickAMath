class Scene_grupos extends Phaser.Scene {
    constructor() {
        super('Scene_grupos'); 
    }

    preload() {
        console.log('Scene_grupos');
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");

        //this.load.image('galaxia','galaxia.png');
        this.load.image('eliminar', '/Botones/eliminar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('tabla_grupos','tabla_grupos.png');
        this.load.image('menu','menu.png');
        //this.load.image('btn_actividades','actividades.png');
        this.load.image('plus','/Botones/plus.png');
        this.load.image('back','back.png');
        this.load.image('tgrupos','tgrupos.png');

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

        this.back           = this.add.image(50,120,"back").setInteractive().setName('back').setDepth(2);
        this.menu           = this.add.image(500,330,"menu").setDepth(1).setScale(1.2); 
        this.agregar        = this.add.image(950,600,"plus");
        this.tgrupos        = this.add.image(700,50,"tgrupos");
        this.logo           = this.add.image(100,550,"logo");

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'agregar' || gameObject.name == 'eliminar' || gameObject.name == 'modificar'){
                gameObject.setScale(1.10);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'agregar' || gameObject.name == 'eliminar' || gameObject.name == 'modificar'){
                gameObject.setScale(1);
            }
        });

        this.agregar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)
            this.scene.start('Scene_agregarGrupos');
            this.next.play();
        });

    }
}
export default Scene_grupos;