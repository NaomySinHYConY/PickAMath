class Scene_nivel8 extends Phaser.Scene{
    constructor(){
        super({
            key: "Scene_nivel8" //Nombre interno o clave de referencia
        });
    }
    init(code) {
        var categoria = this.add.text(150, 575, 'Please login to play', { color: 'white', fontFamily: 'Sigmar One', fontSize: '20px '});
        categoria.setDepth(5);
        
        var database = firebase.database();
        database.ref().child("grupos").child(code).get().then(function(snapshot) {
            if (snapshot.exists()) {
                var rescategoria = snapshot.val().Categoria;
                categoria.setText("Categoria: " + rescategoria);
            }
            else {
              console.log("No data available");
            }
        }).catch(function(error) {
            console.error(error);
        });
        this.data.set('coderank', code);
    } 


    preload(){
        this.load.path = "./assets/nivel8/"; //Ruta de las imgs
        this.load.image(["drop", "p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "fondoR8", "fondoWi", "titulo8", "tituloPAM", "planet8"]); //Arreglo de imagenes
        this.load.image('astro', '../astro.png');
        this.load.audio("acierto", ["/sonidos/acierto.mp3"]);
        this.load.audio("error", ["/sonidos/error.mp3"]);
        this.load.audio("soundtrack", ["/sonidos/soundtrack.mp3"]);
        this.load.audio("hoverSound", "../sonidos/whosh4.mp3");
        this.load.audio("backSound", "../sonidos/glitch-2.mp3");
        //console.log("Holi, soy preload, con clase 7u7r");
    }

    create() {
        const eventos = Phaser.Input.Events;
        this.soundtrack = this.sound.add("soundtrack");
        this.acierto = this.sound.add("acierto");
        this.error = this.sound.add("error");
        var musicConfF = {
            mute: false,
            volume: 0.5,
            loop: false
        }
        var musicConf = {
            mute: false,
            volume: 0.2,
            loop: true
        }
        this.musicConf1 = {
            volume: 0.7,
            loop: false
        };
        
        this.musicConf4 = {
            volume: 0.3,
            loop: false
        };
        this.hoverSound = this.sound.add("hoverSound", this.musicConf4);
        this.backSound = this.sound.add("backSound", this.musicConf1);
        this.soundtrack.play(musicConf);
    
        // this.fondo = this.add.image(0,0,"fondoR").setAlpha(0.99).setScale(1);
        // this.fondo.setOrigin(0);
        // this.fondo.setDepth(-1);

        this.posX = [312.5, 499.5, 688, 876,312.5, 499.5, 688, 876,312.5, 499.5, 688, 876];
        this.posY = [171.5, 171.5, 171.5, 171.5, 322, 322, 322, 322, 472.5, 472.5, 472.5, 472.5];
        this.piezas = [];
        this.drops = [];

        this.addDataGen(eventos);

        //Cargar piezas
        this.final = this.add.image(0, 0, "fondoWi");
        this.final.setOrigin(0);
        this.final.setVisible(false);

        this.imgPiezas = ["p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11"];

        for(let i = 0; i< 12; i++){
            this.drops[i] = this.add.image(this.posX[i], this.posY[i], "drop").setInteractive().setScale(1.6);
            this.drops[i].setDepth(-1);
            this.drops[i].setAlpha(0.01);
            this.drops[i].input.dropZone = true;
            this.drops[i].name = this.imgPiezas[i];

            this.piezas[i] = this.add.image(Phaser.Math.Between(90, 150), Phaser.Math.Between(150, 500), this.imgPiezas[i]).setInteractive();

            this.piezas[i].setScale(0.9);
            //this.piezas[i].input.enableDrag =true;
            this.input.setDraggable(this.piezas[i]);
            //console.log(this.piezas[i]);
            this.piezas[i].name = this.imgPiezas[i];
            this.piezas[i].setDepth(Phaser.Math.Between(0,20));
        }
            //console.log(this.piezas[i].depth);
            // this.piezas[i].on(eventos.POINTER_OVER, function(){
            //     this.setTint(0x00FFFF);
            // });
            // this.piezas[i].on(eventos.POINTER_OUT, function(){
            //     this.clearTint();
            // });
        // this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject) => {
        //     console.log(pointer);
        //     console.log(gameObject);
        // });

        this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => {
            obj.setScale(0.95);
            obj.x = pointer.x;
            obj.y = pointer.y;
            //console.log("Comenz?? drag en "+pointer.x);
        });

        this.input.on(eventos.DRAG, (pointer, obj, dragX, dragY) => {
            obj.x = pointer.x;
            obj.y = pointer.y;
            //console.log("Pointer x= "+pointer.x);
        });

        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {
            if ( !dropzone ) {
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
                }
            obj.setScale(1.0);
            obj.clearTint();
            //console.log("Finaliz?? drag en "+pointer.x);
        });

        this.count = [];

        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            //console.log("Drop!");
            if(obj.name == dropzone.name){
                obj.x = dropzone.x;
                obj.y = dropzone.y;
                this.acierto.play(musicConfF);
                if(this.ganar(obj)){
                    //TODO: Guardar puntuaci??n y volver
                    this.final.setVisible(true);
                    this.final.setDepth(21);
                    registrarPuntuacion(this.data.list.coderank, 10, "Planeta Durean - Regla de tres");
                    this.scene.stop(this);
                    this.scene.start('Scene_rancking',{score: 10,code: this.data.list.coderank});
                }       
            }
            else{
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
                this.error.play(musicConfF);
            }
            
        });
        
    }
    
    addDataGen(eventos){
        this.fondo = this.add.image(0, 0, "fondoR8");
        this.fondo.setOrigin(0);
        //this.fondo.setScale(1);
        this.titulo = this.add.image(500, 40, 'titulo8').setScale(0.3);
        this.tituloPAM = this.add.image(500, 80, 'tituloPAM').setScale(1);
        var nombreAlumno = this.add.text(150, 550, 'Please login to play', { color: 'white', fontFamily: 'Sigmar One', fontSize: '20px '});
        
        firebase.auth().onAuthStateChanged(function(usuario) {
            if (usuario) {
                var nombre      = usuario.displayName;
                console.log(nombre);
                nombreAlumno.setText(nombre);
            }
        });
        this.planet = this.add.image(0, 485, 'planet8').setOrigin(0);
        this.astro = this.add.image(0, 0, 'astro', 1).setOrigin(0).setInteractive().setScale(0.5);
        
        this.astro.on(eventos.POINTER_OVER, ()  =>
        {  
            this.hoverSound.play();
            this.astro.setScale(0.6);
        });
        this.astro.on(eventos.POINTER_OUT, () => 
        {  
            this.astro.setScale(0.5);
        });

        this.astro.on(eventos.POINTER_DOWN, () => 
        {
            this.backSound.play();
            this.scene.stop(this);
            this.soundtrack.stop();
            this.scene.start('Scene_login');
        });
    }


    ganar(obj){
        if(this.count.length<11){
            if(!this.count.includes(obj.name)){
                this.count.push(obj.name);
                //console.log(obj.name);
            }
            return false;
        }
        else return true;
    }

    update(time, delta){
       
    }
}
    export default Scene_nivel8;