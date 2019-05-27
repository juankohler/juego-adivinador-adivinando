import $ from 'jquery';

export {
  initGame2,
  agregarACandidatosAnteriores,
  validarCandidato,
  activeGame2,
  numerosCandidatosGame2,
  intentosGame2,
  opcionesGame2,
  numeroCandidatoActual,
  candidatoEncontrado
};

//juego2
var activeGame2;
var numerosCandidatosGame2;
var intentosGame2;
var opcionesGame2 = [];
var numeroCandidatoActual;
var candidatoEncontrado;

//FUNCIÓN para iniciar el juego 1 (la persona adivina el número)
const initGame2 = () => {
  //Vacio los arreglo por si inicia un nuevo juego y reinicio los intentos
  opcionesGame2 = []
  numerosCandidatosGame2 = [];
  intentosGame2 = 1;
  //Lleno el arreglo con todos los numeros posibles de 4 cifras que no se repitan 
  for (let i = 1000; i < 10000; i++) {
    let digito1 = i.toString().charAt(0)
    let digito2 = i.toString().charAt(1)
    let digito3 = i.toString().charAt(2)
    let digito4 = i.toString().charAt(3)
    if (digito1 != digito2 && digito1 != digito3 && digito1 != digito4 && digito2 != digito3 && digito2 != digito4 && digito3 != digito4) {
      opcionesGame2.push(i);
    }
  }
  //Escojo un numero al azar del arreglo para empezar
  numeroCandidatoActual = opcionesGame2[Math.round(Math.random() * (opcionesGame2.length - 1))];
}


//FUNCIÓN para chequear los numeros generados y adivinar el del usuario
const agregarACandidatosAnteriores = (respuestaBien, respuestaRegular, respuestaNumero) => {
  //Subo el numero de intentos
  intentosGame2++;
  // Guardo la respuesta en arreglo
  numerosCandidatosGame2.push({
    numero: respuestaNumero,
    bien: respuestaBien,
    regular: respuestaRegular
  });
  // Quito el numero del arreglo de opciones
  let pos = opcionesGame2.indexOf(parseInt(respuestaNumero));
  if (pos != -1) {
    opcionesGame2.splice(pos, 1);
  }
  candidatoEncontrado = false;
}



//FUNCIÓN para comparar candidatos
const validarCandidato = (candidatoNuevo, candidatosAnteriores) => {
  for (let j = 0; j < candidatosAnteriores.length; j++) {
    let candidatoAnteriorAux = [];
    let candidatoActualAux = [];
    let regularAux = 0;
    let bienAux = 0;
    //separo los candidatos anteriores y los pongo en el arreglo auxiliar
    for (let k = 0; k < 4; k++) {
      candidatoAnteriorAux.push(candidatosAnteriores[j].numero.toString().charAt(k))
    }
    //separo el candidato actual y lo pongo el el arreglo auxiliar
    for (let x = 0; x < 4; x++) {
      candidatoActualAux.push(candidatoNuevo.toString().charAt(x))
    }
    console.log("posible candidato nuevo:" + candidatoNuevo);
    console.log(candidatoAnteriorAux);
    console.log(candidatoActualAux);

    //comparo el candidato nuevo con candidato anterior
    for (let v = 0; v < 4; v++) {
      if (candidatoAnteriorAux.indexOf(candidatoActualAux[v]) != -1) {
        if (candidatoAnteriorAux[v] == candidatoActualAux[v]) {
          bienAux++;
        } else {
          regularAux++;
        }
      }
    }
    // console.log("----------");
    // console.log("candidato anterior:" + candidatoAnteriorAux);
    // console.log("candidato actual:" + candidatoActualAux);
    // console.log("regularAux:" + regularAux + "regular:" + candidatosAnteriores[j].regular);
    // console.log("bienAux:" + bienAux + "bien:" + candidatosAnteriores[j].bien);
    // console.log("----------");

    if (candidatosAnteriores[j].regular != regularAux || candidatosAnteriores[j].bien != bienAux) {
      //Quito el candidato del arreglo de opciones 
      let pos = opcionesGame2.indexOf(parseInt(candidatoNuevo));
      if (pos != -1) {
        opcionesGame2.splice(pos, 1);
      }
      // Busco otro y ejecuto la funcion de nuevo (al hacer el paso recursivo aca se llenaba la pila del navegador, y se colgaba asi que opte por otro opcion) 
      // let nuevoCandidato = opcionesGame2[Math.round(Math.random()*(opcionesGame2.length-1))].toString();
      // validarCandidato(nuevoCandidato);
      // Decidí hacerlo con un variable booleana para solucionar el problema
      candidatoEncontrado = false;
      console.log("candidato encontrado:" + candidatoEncontrado);
      break;

    } else {
      numeroCandidatoActual = candidatoNuevo;
      candidatoEncontrado = true;
      console.log("candidato encontrado:" + candidatoEncontrado);

    }
  }
}