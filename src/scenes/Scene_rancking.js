class Scene_rancking extends Phaser.Scene {
    constructor() {
        super('Scene_rancking'); 
    }

    init(score,codigo){
        var puntaje = this.add.text(296, 195, 'Tu puntaje: ' + score, { color: 'white', fontFamily: 'Sigmar One', fontSize: '50px '});
        puntaje.setDepth(5);
        this.data.set('codeRank', codigo);
        puntajes(codigo);
        console.log("Código del juego desde Scene_rancking: " + this.data.list.codeRank);
    }

    preload() {
        console.log('Scene_rancking');
        this.load.setPath('./assets/');

        //this.load.image('galaxia','galaxia.png');
        this.load.image(['logo', 'alien_rancking', 'strangePlanet', 'ufo']);
        this.load.image('exit', '/Botones/eliminar.png');
        this.load.image('fondoRan','/fondos/46270.jpg');

        this.load.audio("exitSound", "/sonidos/glitch-2.mp3");
        this.load.audio("hoverSound", "/sonidos/whosh4.mp3");
        this.load.html('ranktarget', 'txt/ranktarget.html');
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
        this.fondoRan       = this.add.image(500,325,"fondoRan").setDepth(0).setScale(0.19);
        this.logo           = this.add.image(110,50,"logo").setDepth(5);
        this.tituloR        = this.add.image(500,120,"alien_rancking").setScale(0.8).setDepth(5);
        this.planet         = this.add.image(80,590,"strangePlanet").setScale(0.8).setDepth(5);
        this.ufo            = this.add.image(910,80,"ufo").setScale(0.8).setDepth(5);
        this.salir          = this.add.image(80,120,"exit").setInteractive().setName('exit').setScale(0.15).setDepth(5);

        this.ranktarget = this.add.dom(425, 500).createFromCache('ranktarget');
        this.ranktarget.setDepth(5).setScale(0.90);

        this.salir.on(eventos.POINTER_DOWN, () =>{
            this.exitSound.play();
            signOut();
            this.scene.stop(this);
            this.scene.start('Bootloader');
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