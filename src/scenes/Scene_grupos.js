class Scene_grupos extends Phaser.Scene {
    constructor() {
        super('Scene_grupos'); 
    }

    init(){
        console.log('Scene_grupos');
    }

    preload() {
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");

        //this.load.image('galaxia','galaxia.png');
        this.load.image('eliminar', '/Botones/eliminar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('menu','menu.png');
        this.load.image('btn_actividades','actividades.png');
        this.load.image('plus','/Botones/plus.png');
        this.load.image('back','back.png');
        this.load.image('tgrupos','tgrupos.png');
        this.load.image('pperfil','astro_foto.png');

        this.load.audio("bback", "/sonidos/glitch-2.mp3");
        this.load.html('showCodes', 'txt/showCodes.html');
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

        this.back           = this.add.image(50,120,"back").setInteractive().setName('back').setDepth(2);
        this.pperfil        = this.add.image(150,250,"pperfil").setDepth(1).setScale(0.85);
        this.agregar        = this.add.image(950,600,"plus").setInteractive().setName('agregar').setDepth(2);
        this.tgrupos        = this.add.image(640,50,"tgrupos").setDepth(2);
        this.logo           = this.add.image(135,610,"logo").setScale(0.80).setDepth(2);
        this.btn_actividades = this.add.image(150,500,"btn_actividades").setInteractive().setName('btn_actividades').setDepth(2);

        this.showCodes = this.add.dom(550, 300).createFromCache('showCodes');
        this.showCodes.setDepth(5).setScale(0.50);
        
        function mostrarCodigos(){
            var db = firebase.database();
            var ref = db.ref("grupos");

            var cantDatos = 0;
            
            ref.once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                cantDatos = cantDatos + 1;
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log("Código: " + childKey);
                console.log("Categoria: " + childData.Categoria);

                var item = "itemG"+cantDatos;

                const divItem = document.createElement("div"); 
                divItem.className = item; 

                const divCard = document.createElement("div"); 
                divCard.className = "cardG";

                const divImage = document.createElement("div");
                divImage.className = "card-image";

                const divText = document.createElement("div");
                divText.className = "card-textG";

                const h2N = document.createElement('H2');
                const nombreH2 = document.createTextNode(childKey);
                h2N.appendChild(nombreH2);

                const pP = document.createElement('p');
                const puntajeP = document.createTextNode(childData.Categoria);
                pP.appendChild(puntajeP);

                const divCardStats = document.createElement("div");
                divCardStats.className = "card-stats";

                const divStat = document.createElement("div");
                divStat.className = "stat";

                const divValue = document.createElement("div");
                divValue.className = "value";

                const wrapper2 = document.getElementById("wrapper2");
                wrapper2.appendChild(divItem);

                //document.getElementById("wrapper").innerHTML= divItem;
                //document.body.appendChild(divWrapper);
                //divWrapper.appendChild(divItem);

                divItem.appendChild(divCard);
                divCard.appendChild(divImage);
                divCard.appendChild(divText);
                divText.appendChild(h2N);
                divText.appendChild(pP);
                divCardStats.appendChild(divStat);
                divStat.appendChild(divValue);
                });
                console.log("Total de datos: " + cantDatos);
            });
        }

        mostrarCodigos();

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'agregar' || gameObject.name == 'eliminar' || gameObject.name == 'back' || gameObject.name == 'btn_actividades'){
                gameObject.setScale(1.30);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'agregar' || gameObject.name == 'eliminar' || gameObject.name == 'back' || gameObject.name == 'btn_actividades'){
                gameObject.setScale(1.20);
            }
        });

        this.agregar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Scene_agregarGrupo');
            this.next.play();
        });

        this.btn_actividades.on(eventos.POINTER_UP, () => {
            this.scene.stop(this);
            this.scene.start('Scene_mapa');
            this.next.play();
        });

        this.back.on(eventos.POINTER_DOWN, () => {
            signOut();
            this.scene.stop(this);
            this.scene.start('Scene_loginProfesor');
            this.bback.play();
        });

    }
}
export default Scene_grupos;