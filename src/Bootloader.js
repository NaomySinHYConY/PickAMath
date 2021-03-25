class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
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
    }
}
export default Bootloader;