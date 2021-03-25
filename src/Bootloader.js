class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.image('PAM', 'PAM.png');
        this.load.image('PickAMath', 'PickAMath.png');
        this.load.image('play', '/Botones/play.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });
    }

    create() {
        
        this.titulo = this.add.image(100, 500, 'PAM');
        this.scene.start('Scene_mapa');
    }
}
export default Bootloader;