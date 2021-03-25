class Scene_rancking extends Phaser.Scene {
    constructor() {
        super('Scene_rancking'); 
    }

    preload() {
        console.log('Scene_rancking');
        this.load.setPath('./assets/');

        //this.load.image('galaxia','galaxia.png');
        this.load.image(['FondoRanking', 'logo', 'alien_rancking', 'tabla', 'strangePlanet', 'ufo']);
        this.load.image('exit', '/Botones/eliminar.png');

        this.load.audio("exitSound", "/sonidos/glitch-2.mp3");
        this.load.audio("hoverSound", "/sonidos/whosh4.mp3");
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.musicConf1 = {
            volume: 0.7,
            loop: false
        };

        this.musicConf2 = {
            volume: 0.3,
            loop: false
        };

        this.exitSound = this.sound.add("exitSound", this.musicConf1);
        this.whosh = this.sound.add("hoverSound", this.musicConf2);

        //this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondo          = this.add.image(0,0, "FondoRanking").setOrigin(0);
        this.logo           = this.add.image(110,50,"logo");
        this.tituloR        = this.add.image(500,120,"alien_rancking").setScale(0.8);
        this.tabla          = this.add.image(500,400,"tabla").setScale(0.8);
        this.planet         = this.add.image(80,590,"strangePlanet").setScale(0.8);
        this.ufo            = this.add.image(910,80,"ufo").setScale(0.8);
        this.salir          = this.add.image(80,120,"exit").setInteractive().setName('exit').setScale(0.15);


        this.salir.on(eventos.POINTER_DOWN, () =>{
            this.exitSound.play();
            this.scene.stop(this);
            this.scene.start('Scene_nivel1');
        });

        this.salir.on(eventos.POINTER_OVER, () => {
            this.salir.setScale(0.2);
            this.whosh.play();
        });

        this.salir.on(eventos.POINTER_OUT, () => {
            this.salir.setScale(0.15);
        });
    }
}
export default Scene_rancking;