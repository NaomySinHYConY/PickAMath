class Scene_rancking extends Phaser.Scene {
    constructor() {
        super('Scene_rancking'); 
    }

    preload() {
        console.log('Scene_rancking');
        this.load.setPath('./assets/');

        this.load.image('galaxia','galaxia.png');
        this.load.image('exit', '/Botones/eliminar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('alienR','alien_rancking.png');
        this.load.image('tabla','tabla.png');
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.logo           = this.add.image(100,50,"logo");
        this.tituloR        = this.add.image(500,80,"alienR");
        this.tabla          = this.add.image(500,325,"tabla");
        this.salir          = this.add.image(50,120,"exit").setInteractive().setName('exit');
    }
}
export default Scene_rancking;