class Scene_detallesCat extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene_detallesCat'
        });
    }

    init(planeta) {
        console.log('Escena de detalles');
        //console.log(planeta);
        this.data.set('planeta', planeta);
    }

    preload() {
        console.log('Scene_detalles');
        this.load.setPath('./assets/mapa/');
        this.load.image(['fondoMapaDet', 'planet1Det', 'planet2Det', 'planet3Det', 'planet4Det',
        'planet5Det', 'planet6Det', 'planet7Det', 'planet8Det', 'planet9Det', 'MAPA', 'PickAMath', 'astro', 'elige', 'yes', 'back']);
        
        this.load.audio("whosh", ["../sonidos/whosh4.mp3"]);
        this.load.audio("next", ["../sonidos/glitch-1.mp3"]);
    }

    create() {
        const eventos = Phaser.Input.Events;
        
        this.musicConf = {
            volume: 0.3,
            loop: false
        };
        this.musicConf2 = {
            volume: 0.7,
            loop: false
        };
        let whosh = this.sound.add("whosh", this.musicConf);
        this.next = this.sound.add("next", this.musicConf2);

       //Carga del fondo
        this.fondo = this.add.image(500, 325, 'fondoMapaDet');
        
        this.Mapa = this.add.image(500,40,'MAPA').setScale(0.4);

        this.instrucciones = this.add.image(900,50,'elige');

        this.astro = this.add.image(40, 50, 'astro').setScale(0.32);
        
        this.planeta = this.add.image(500, 325, this.data.get('planeta'));
        //Botón de avance
        this.btonNext2 = this.add.image(950, 600,'yes').setScale(0.40).setInteractive().setName('next');
        this.btonNext2.on(eventos.POINTER_OVER, function () 
        {  
            this.scaleX += 0.07;
            this.scaleY += 0.07;
        });
        this.btonNext2.on(eventos.POINTER_OUT, function () 
        {  
            this.scaleX -= 0.07;
            this.scaleY -= 0.07;
        });

        this.btonLast2 = this.add.image(50, 600,'back').setScale(1).setInteractive().setName('last');
        this.btonLast2.on(eventos.POINTER_OVER, function () 
        {  
            this.scaleX += 0.07;
            this.scaleY += 0.07;
        });
        this.btonLast2.on(eventos.POINTER_OUT, function () 
        {  
            this.scaleX -= 0.07;
            this.scaleY -= 0.07;
        });


        this.input.on(eventos.GAMEOBJECT_UP, (pointer, gameObject) => {
            if(gameObject.name == 'next' || gameObject.name == 'last')
            {
                this.next.play();
            }
            else
            {
                //Al ser un planeta, debe mostrar la información correspondiente a su categoría
                // this.planetas.children.iterate((planet) =>{
                //     planet.setAlpha(0.6);
                // });
                // gameObject.setAlpha(1);
            }
        });

        this.btonLast2.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Scene_mapa');
            //this.next.play();
        });

        this.btonNext2.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            //Acá se asigna la categoría a un grupo
            this.scene.start('Scene_grupos');
            //this.next.play();
        });

    }
}
export default Scene_detallesCat;