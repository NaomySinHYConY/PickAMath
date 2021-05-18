class Scene_login extends Phaser.Scene {
    constructor() {
        super('Scene_login'); 
    }

    preload() {
        console.log('Scene_login');
        this.load.setPath('./assets/');

        this.load.image('galaxia','galaxia.png');
        this.load.image('play', '/Botones/play.png');
        this.load.image('astro2', 'astro2.png');
        this.load.image('fondo_numeros', 'fondos/numeros.png');
        this.load.image('logo', 'logo.png');
        this.load.image('alien','alien.png');
        this.load.image('back','back.png');
       
        this.load.audio("bback", "/sonidos/glitch-2.mp3");

        this.load.html('introcod', 'txt/introcod.html');
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

        class Usuario{
            constructor(nombre, correo, id, photo) {
                this.nombre = nombre;
                this.correo = correo;
                this.id = id;
                this.photo = photo;
            }
        }

        this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondo_numeros  = this.add.image(500,330,"fondo_numeros").setDepth(1).setScale(1.2);
        this.logo           = this.add.image(100,50,"logo");
        this.back           = this.add.image(50,120,"back").setInteractive().setName('back');

        this.astro2         = this.add.image(500,270,"astro2").setScale(1.3).setDepth(2);
        this.alien          = this.add.image(75,560,"alien").setInteractive();
        this.play           = this.add.image(510,550,"play").setInteractive().setName('play').setDepth(2).setScale(0.8);
        
        
        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'play' || gameObject.name == 'back'){
                gameObject.setScale(1.10);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'play'|| gameObject.name == 'back'){
                gameObject.setScale(1);
            }
        });

        this.back.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)
            this.scene.start('Bootloader');
            this.bback.play();
        });

        this.element = this.add.dom(500, 500).createFromCache('introcod');
        this.element.setDepth(5);

        const sumas = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel1',cod);
            this.next.play();
        }
        
        const restas = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_restas',cod);
            this.next.play();
        }

        const multiplicaciones = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_multiplicaciones',cod);
            this.next.play();
        }
        
        const capacidadYPeso = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel9',cod);
            this.next.play();
        }
        
        const divisiones = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_divisiones',cod);
            this.next.play();
        }
        
        const fraccionesImpropias = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel7',cod);
            this.next.play();
        }
        
        const reglaDeTres = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel8',cod);
            this.next.play();
        }
        
        const fraccionesPropias = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel6',cod);
            this.next.play();
        }
        
        const figuras = (cod) => {
            this.scene.stop(this);
            this.scene.start('Scene_nivel3',cod);
            this.next.play();
        }        

        var categoria = this.add.text(150, 575, 'Code', { color: 'white', fontFamily: 'Sigmar One', fontSize: '20px '});
        categoria.setDepth(5);

        this.play.on(eventos.POINTER_DOWN, () => {
            var codigoClase = document.getElementById('codigoclase').value;
            console.log(codigoClase);
            
            var database = firebase.database();
        
            database.ref().child("grupos").child(codigoClase).get().then(function(snapshot) {
                if (snapshot.exists()) {
                    var rescategoria = snapshot.val().Categoria; 
                    console.log("Categoria: " + rescategoria);
                    if(rescategoria == "Planeta Arcus - Sumas"){
                        sumas(codigoClase);
                    }
                    else if(rescategoria == "Planeta Mudi - Restas"){
                        restas(codigoClase);
                    }
                    else if(rescategoria == "Planeta Teyvat - Multiplicaciones"){
                        multiplicaciones(codigoClase);
                    }
                    else if(rescategoria == "Planeta Tropius - Capacidad y peso"){
                        capacidadYPeso(codigoClase);
                    }
                    else if(rescategoria == "Planeta Krobus - Divisiones"){
                        divisiones(codigoClase);
                    }
                    else if(rescategoria == "Planeta Carvus - Fracciones impropias"){
                        fraccionesImpropias(codigoClase);
                    }
                    else if(rescategoria == "Planeta Durean - Regla de tres"){
                        reglaDeTres(codigoClase);
                    }
                    else if(rescategoria == "Planeta Plusalia - Fracciones propias"){
                        fraccionesPropias(codigoClase);
                    }
                    else if(rescategoria == "Planeta Narmú - Figuras"){
                        figuras(codigoClase);
                    }
                }
                else 
                {
                    console.log("No data available");
                }
            }).catch(function(error) {
                console.error(error);
            });
        });
    }
}
export default Scene_login;