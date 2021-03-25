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
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        //this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondo          = this.add.image(0,0, "FondoRanking").setOrigin(0);
        this.logo           = this.add.image(110,50,"logo");
        this.tituloR        = this.add.image(500,120,"alien_rancking").setScale(0.8);
        this.tabla          = this.add.image(500,400,"tabla").setScale(0.8);
        this.planet         = this.add.image(80,590,"strangePlanet").setScale(0.8);
        this.ufo            = this.add.image(910,80,"ufo").setScale(0.8);
        //this.salir          = this.add.image(50,120,"exit").setInteractive().setName('exit');
    }
}
export default Scene_rancking;