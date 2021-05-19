function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function crearCodigo(){
    var category = document.getElementById("categoriaPl").value;
    var grado = document.getElementById("grado").value;
    var grupo = document.getElementById("grupo").value;

    //Aqui va el espacio para generar el codigo 
    var cadena = makeid(6);
    var nuevoCodigo = cadena;
    console.log("Este es el código generado: " + nuevoCodigo);

    firebase.auth().onAuthStateChanged(function(usuario) {
        if (usuario) {
            var userId      = usuario.uid;
            var database = firebase.database();

            database.ref().child("usuario").child(userId).get().then(function(snapshot) {
                if (snapshot.exists()) {
                    var nombreDocente = snapshot.val().name;
                    firebase.database().ref('grupos/'+ nuevoCodigo).set({
                        Categoria : category,
                        Grado: grado,
                        Grupo: grupo,
                        Docente:nombreDocente
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
                }
                else {
                console.log("No se encontró al docente");
                }
            }).catch(function(error) {
                console.error(error);
            });
           
        } else {
          console.log("No hay un usuario en sesión");
        }
    });
}
