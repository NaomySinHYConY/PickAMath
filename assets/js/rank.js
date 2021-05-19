function registrarPuntuacion(codigo, puntuacion, planeta){
    firebase.auth().onAuthStateChanged(function(usuario) {
        if (usuario) {
            var nombre      = usuario.displayName;
            var userId      = usuario.uid;
            firebase.database().ref('puntuacion/'+ codigo + '/' + userId).set({
                nombre : nombre,
                puntaje: puntuacion,
                categoria: planeta
            }, (error) => {
                if (error) {
                    // The write failed...
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                } else {
                    console.log("Puntuación insertada para: " + nombre);
                }
            });
           
        } else {
          console.log("No hay un usuario en sesión");
        }
    });
}
