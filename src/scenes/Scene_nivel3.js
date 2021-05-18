class Scene_nivel3 extends Phaser.Scene{
    constructor(){
        super({
            key: "Scene_nivel3" //Nombre interno o clave de referencia
        });
    }
    init() {
        
    } 

    preload(){
        this.load.path = "./assets/nivel3/"; //Ruta de las imgs
        this.load.image(["fondo", "dorsoTarjeta", "titulo", "circulo", "pentagono", "hexagono", "elipse", "cuadrilatero", "cuadrado", "rectangulo", "trapecio", "triangulo", "estrella", "rombo", "octagono", "fondoWin"]);
        this.load.audio("soundtrack", ["/sonidos/soundtrack.mp3"]);
        this.load.audio("flip", ["/sonidos/flip.mp3"]);
        
        this.load.audio("clic", ["/sonidos/clic.mp3"]);
        this.load.audio("win", ["/sonidos/win.mp3"]);
        this.load.audio("error", ["/sonidos/error.mp3"]);
        this.load.audio("acierto", ["/sonidos/acierto.mp3"]);
    }


    create() {
        const eventos = Phaser.Input.Events;
        this.flip = this.sound.add("flip");
        let clic = this.sound.add("clic");
        this.win = this.sound.add("win");
        this.error = this.sound.add("error");
        this.acierto = this.sound.add("acierto");
        
        this.soundtrack = this.sound.add("soundtrack");

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
        
        this.fondo = this.add.image(0, 0, "fondo");
        this.fondo.setOrigin(0.015);
        this.fondo.setScale(1.4);

        this.titulo = this.add.image(500, 70 , "titulo");
        this.titulo.setScale(0.4);

        this.posiciones = [];

        for (let i = 0; i<24; i++){
            this.posiciones[i] = i;
        }

        this.baraja = [];
        this.personajes = ["circulo", "pentagono", "hexagono", "elipse", "cuadrilatero", "cuadrado", "rectangulo", "trapecio", "triangulo", "estrella", "rombo", "octagono"];
        this.dorsoTarjeta = [];
        let posiX = 0;
        let posiY;
        this.i = 0;

        while(this.posiciones.length>0){

            this.posicionRand = Math.floor(Math.random()*(this.posiciones.length)); 
            this.posicionElegida = this.posiciones[this.posicionRand]; //Numero que usaré

            if(this.posicionElegida<8){
                posiY = 200;
            }

            if(this.posicionElegida<16 && this.posicionElegida>7){
                posiY = 330;
            }

            if(this.posicionElegida>15){
                posiY = 460;
            }

            posiX = 140 + 100*(this.posicionElegida%8);

            if(this.i<12){
                
                this.baraja[(this.i)] = this.add.image(posiX, posiY, this.personajes[this.i]).setScale(0.6);
                this.dorsoTarjeta[this.i] = this.add.image(posiX, posiY, "dorsoTarjeta").setInteractive().setScale(0.6);
                this.dorsoTarjeta[this.i].name = this.personajes[this.i]; 
            }
            else{
                this.baraja[(this.i)] = this.add.image(posiX , posiY, this.personajes[(this.i-12)]).setScale(0.6);
                this.dorsoTarjeta[this.i] = this.add.image(posiX, posiY, "dorsoTarjeta").setInteractive().setScale(0.6);
                this.dorsoTarjeta[this.i].name = this.personajes[(this.i-12)]; 
            }
            this.posiciones.splice(this.posicionRand, 1);
            this.i++;
        }

        for (let step = 0; step < 24; step++){
            this.dorsoTarjeta[step].on(eventos.POINTER_OVER, function() {
                this.setTint(0xa4effc);
                clic.play();
                });
            this.dorsoTarjeta[step].on(eventos.POINTER_OUT, function() {
                this.clearTint();
                });
        }

        let par = [];
        
        let parejas = 0;
        this.fondoWin = this.add.image(0, 0, "fondoWin");
        this.fondoWin.setOrigin(0).setScale(1);
        this.fondoWin.setVisible(false);
        let contador = 0;

        this.input.on(eventos.GAMEOBJECT_UP, (pointer, gameObject) => {
            if(contador<3){
                contador++;
                //console.log(contador);
                this.flip.play(musicConfF);
                if(par.length<1){
                    par[0] = gameObject;
                    gameObject.setVisible(false);
                }
                else{
                    if(par[0].name == (gameObject.name)|| par[0].name == (gameObject.name)){   
                        this.acierto.play(musicConfF);
                        par = [];
                        gameObject.setVisible(false);
                        parejas++;
                        if(parejas == 12){
                            this.win.play(musicConfF);
                            this.time.delayedCall(300, function(){
                                this.fondoWin.setVisible(true);
                            }, [], this);
                        }
                    }
                    else{
                        gameObject.setVisible(false);
                        this.error.play(musicConfF);
                        this.time.delayedCall(200, function(){
                            par[0].setVisible(true);
                            gameObject.setVisible(true);
                            par = [];
                        }, [], this);
                    }
                    contador = 0;
                }
            }
        });
        
    }


    update(time, delta){
    }
}
    export default Scene_nivel3;