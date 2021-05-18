class Scene_nivel7 extends Phaser.Scene{
    constructor(){
        super({
            key: "Scene_nivel7" //Nombre interno o clave de referencia
        });
    }
    init() {
        //console.log("Alo soy init con clase uvur");
    } 

    preload(){
        this.load.path = "./assets/nivel7/"; //Ruta de las imgs
        this.load.image(["drop", "p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "FondoR", "fondoWi"]); //Arreglo de imagenes
        this.load.audio("acierto", ["/sonidos/acierto.mp3"]);
        this.load.audio("error", ["/sonidos/error.mp3"]);
        this.load.audio("soundtrack", ["/sonidos/soundtrack.mp3"]);
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
        this.soundtrack.play(musicConf);
    
        this.fondo = this.add.image(0,0,"FondoR").setAlpha(0.99).setScale(1);
        this.fondo.setOrigin(0);
        this.fondo.setDepth(-1);

        this.posX = [310.5, 458.5, 606.5, 739, 869.5, 311, 441, 572, 739.5, 887, 311, 442, 572.5, 739.5, 886, 310.5, 459, 607, 756, 886];
        this.posY = [157, 170, 157, 170, 170, 269, 269, 255.5, 282.5, 268, 394.5, 369, 368.5, 394, 381.5, 493, 480, 480, 493, 493.5];
        this.piezas = [];
        this.drops = [];

        //Cargar piezas
        this.final = this.add.image(0, 0, "fondoWi");
        this.final.setOrigin(0);
        this.final.setVisible(false);

        this.imgPiezas = ["p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19"];

        for(let i = 0; i< 20; i++){
            this.drops[i] = this.add.image(this.posX[i], this.posY[i], "drop").setInteractive();
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
            //console.log("Comenzó drag en "+pointer.x);
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
            //console.log("Finalizó drag en "+pointer.x);
        });

        this.count = [];

        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            //console.log("Drop!");
            if(obj.name == dropzone.name){
                obj.x = dropzone.x;
                obj.y = dropzone.y;
                this.acierto.play(musicConfF);
                if(this.ganar(obj)){
                    //TODO: Guardar puntuación y volver
                    this.final.setVisible(true);
                    this.final.setDepth(21);
                }       
            }
            else{
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
                this.error.play(musicConfF);
            }
            
        });
        
    }

    ganar(obj){
        if(this.count.length<19){
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
    export default Scene_nivel7;