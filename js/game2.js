import $ from 'jquery';

export {
  initGame2,
  checkGame2
};

//juego2
var activeGame2 = false;
var numerosCandidatosGame2;
var intentosGame2 = 0;
//Arreglo para posibles numeros(1000 a 9999)
var opcionesGame2 = [];
var numeroCandidatoActual;
var candidatoEncontrado;

//Elementos del DOM
let gameAdivinador = document.getElementsByClassName("game-adivinador")[0];
let gamePensador = document.getElementsByClassName("game-pensador")[0];

//funcion para iniciar el juego 1 (la persona adivina el número)
const initGame2 = () => {
  
  if (activeGame2 == true) {
    // alert("Comenzó otro juego de 'Te adivinare el número'");
    let htmlActual = $("#results-text-pensador").html();
    $("#results-text-pensador").html("COMENZO OTRO JUEGO DE 'TE ADIVINARE EL NÚMERO'<br> ---------- <br>" + htmlActual);
  }
  activeGame2 = true;

  //Vacio el arreglo por si inicia un nuevo juego y reinicio los intentos
  numerosCandidatosGame2 = [];
  intentosGame2 = 0;

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
  $("#answer-pensador").html(numeroCandidatoActual);
  console.log("JUEGO 2 candidato: " + numeroCandidatoActual);
  let htmlActual = $("#results-text-pensador").html();
  $("#results-text-pensador").html("Posible candidato: " + numeroCandidatoActual + "<br>" + htmlActual);
}

//funcion para chequear los numeros generados y adivinar el del usuario
const checkGame2 = () => {

  //Subo el numero de intentos
  intentosGame2++;

  var respuestaBien = $("#bien-pensador").val();
  var roundRespuestaBien = Math.round(respuestaBien);
  var respuestaRegular = $("#regular-pensador").val();
  var roundRespuestaRegular = Math.round(respuestaRegular);
  var respuestaNumero = $("#answer-pensador").html();

  // console.log(respuestaBien + "," + respuestaRegular + "," + respuestaNumero);
  // console.log(roundRespuestaBien + "," + roundRespuestaRegular); 

  if (respuestaBien != "" && respuestaRegular != "" && roundRespuestaBien >= 0 && roundRespuestaBien <= 4 && roundRespuestaRegular >= 0 && roundRespuestaRegular <= 4) {
    //vacio los inputs
    $("#regular-pensador").val("");
    $("#bien-pensador").val("");

    //Termina el juego se adivina el numero
    if (respuestaBien == 4) {
      if (intentosGame2 == 1) {
        let htmlActual = $("#results-text-pensador").html();
        $("#results-text-pensador").html("<strong> ADIVINE TU NUMERO EN " + intentosGame2 + " INTENTO! <br> EL NUMERO ES " + respuestaNumero + "<br> ---------- <br></strong>" + htmlActual);
        console.log("GANASTE JUEGO 2");
      } else {
        let htmlActual = $("#results-text-pensador").html();
        $("#results-text-pensador").html("<strong> ADIVINE TU NUMERO EN " + intentosGame2 + " INTENTOS! <br> EL NUMERO ES " + respuestaNumero + "<br> ---------- <br></strong>" + htmlActual);
        console.log("GANASTE JUEGO 2");
      }
    } else {

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

      while (candidatoEncontrado == false) {
        // Busco otro numero del arreglo

        //En caso de error humano, el arreglo se vacia y muestro este mensaje
        if (opcionesGame2.length == 0) {
          let htmlActual = $("#results-text-pensador").html();
          $("#results-text-pensador").html("No pude encontrar tu numero, por favor toca el boton de 'Te adivinare tu numero' nuevamente para iniciar otro juego! " + "<br>" + "----------<br>" + htmlActual);
          return false;
        } else {
          let nuevoCandidato = opcionesGame2[Math.round(Math.random() * (opcionesGame2.length - 1))].toString();
          // Compruebo que el candidato encontrado verifica los anteriores
          compararCandidatos(nuevoCandidato);

        }

      }

      //Pregunto con nuevo candidato
      let htmlActual = $("#results-text-pensador").html();
      $("#results-text-pensador").html("Posible candidato: " + numeroCandidatoActual + "<br>" + "----------<br>" + "Bien: " + roundRespuestaBien + ", Regular: " + roundRespuestaRegular + "<br>" + htmlActual);
      $("#answer-pensador").html(numeroCandidatoActual);
      console.log("candidato: " + numeroCandidatoActual);

    }



  } else {
    alert("Por favor ingresa un numero de 0 a 4 en bien y regular.");
  }
}


//funcion para comparar candidatos
const compararCandidatos = (candidatoNuevo) => {
  for (let j = 0; j < numerosCandidatosGame2.length; j++) {
    let candidatoAnteriorAux = [];
    let candidatoActualAux = [];
    let regularAux = 0;
    let bienAux = 0;
    //separo los candidatos anteriores y los pongo en el arreglo auxiliar
    for (let k = 0; k < 4; k++) {
      candidatoAnteriorAux.push(numerosCandidatosGame2[j].numero.charAt(k))
    }
    //separo el candidato actual y lo pongo el el arreglo auxiliar
    for (let x = 0; x < 4; x++) {
      candidatoActualAux.push(candidatoNuevo.charAt(x))
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
    // console.log("regularAux:" + regularAux + "regular:" + numerosCandidatosGame2[j].regular);
    // console.log("bienAux:" + bienAux + "bien:" + numerosCandidatosGame2[j].bien);
    // console.log("----------");

    if (numerosCandidatosGame2[j].regular != regularAux || numerosCandidatosGame2[j].bien != bienAux) {
      //Quito el candidato del arreglo de opciones 
      let pos = opcionesGame2.indexOf(parseInt(candidatoNuevo));
      if (pos != -1) {
        opcionesGame2.splice(pos, 1);
      }

      // Busco otro y ejecuto la funcion de nuevo (al hacer el paso recursivo aca se llenaba la pila del navegador, y se colgaba asi que opte por otro opcion) 
      // let nuevoCandidato = opcionesGame2[Math.round(Math.random()*(opcionesGame2.length-1))].toString();
      // compararCandidatos(nuevoCandidato);


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