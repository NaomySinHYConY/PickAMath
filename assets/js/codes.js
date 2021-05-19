function crearCodigo(){
    var category = document.getElementById("categoriaPl");
    var grado = document.getElementById("grado");
    var grupo = document.getElementById("grupo");

    //Aqui va el espacio para generar el codigo 
    var aleatorio = Math.random();

    
    firebase.auth().onAuthStateChanged(function(usuario) {
        if (usuario) {
            var userId      = usuario.uid;
            firebase.database().ref('grupos/'+ codigo).set({
                Categoria : category,
                Grado: grado,
                Grupo: grupo,
                Docente:userId
            }, (error) => {
                if (error) {
                    // The write failed...
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                } else {
                    console.log("Código guardado correctamente");
                }
            });
           
        } else {
          console.log("No hay un usuario en sesión");
        }
    });
}

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