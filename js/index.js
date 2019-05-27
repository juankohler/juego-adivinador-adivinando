import $ from 'jquery';
import * as Game1 from '../js/game1'
import * as Game2 from '../js/game2';

  //Elementos del DOM
    //JUEGO 1
    let gameAdivinador = $(".game-adivinador");
    let resultTextAdivinador = $("#results-text-adivinador");  
    //JUEGO 2
    let gamePensador = $(".game-pensador");
    let resultTextPensador = $("#results-text-pensador");
  
  //EVENTOS JUEGO 1
  //Inicia el juego
  $("#adivinador").click(()=>{
    //se muestra html oculto correspondiente al primer juego
    gameAdivinador.removeClass("hide");
    gamePensador.addClass("hide");
    //funcion para generar el numero 
    Game1.initGame1();
    //En caso de que haya un juego activo y se inicie otro
    if(Game1.activeGame1 == true){
      resultTextAdivinador.html("COMENZÓ OTRO JUEGO DE 'ADIVINA MI NÚMERO'<br> ---------- <br>" + resultTextAdivinador.html());
    }
    Game1.activeGame1 = true
    //Muestro en consola numero ganador
    console.log("JUEGO 1: " + Game1.numeroGanador);
  });

  //Verificar la opcion ingresada
  $("#send-adivinador").click(()=>{
    //funcion para chequear el valor ingresado con el numero ganador
    let valorIngresadoAdivinador = $("#value-adivinador").val().toString();
    let numeroAnalizado = Game1.checkGame1(valorIngresadoAdivinador,Game1.numeroGame1);
    if(numeroAnalizado.valido == true){
      if(numeroAnalizado.correctos == 4){
        resultTextAdivinador.html("<strong> GANASTE! EL NÚMERO ERA: " + Game1.numeroGanador + " <br> INTENTOS: " + Game1.intentosGame1 + "<br> ---------- <br></strong>" + resultTextAdivinador.html())
      }else{
        resultTextAdivinador.html("Número ingresado:" + numeroAnalizado.numero + "<br>" + numeroAnalizado.correctos + " BIEN Y " + numeroAnalizado.regulares + " REGULAR <br> ---------- <br>" + resultTextAdivinador.html())
      }
    }else{
      alert("Por favor ingresa un número positivo de 4 cifras");
    }
  });


  //EVENTOS JUEGO 2

  //Inicia el juego
  $("#pensador").click(()=>{
    //se muestra html oculto correspondiente al segundo juego
    gameAdivinador.addClass("hide");
    gamePensador.removeClass("hide");
    //funcion para iniciar segundo juego, se genera un numero aleatorio de 4 cifras distintas
    Game2.initGame2();
    //En caso de que haya un juego activo y se inicie otro
    if(Game2.activeGame2 == true){
      resultTextPensador.html("COMENZÓ OTRO JUEGO DE 'ADIVINARÉ TU NÚMERO'<br> ---------- <br>" + resultTextPensador.html());
    }
    Game2.activeGame2 = true
    //Muestro el candidato actual y lleno resultados
    $("#answer-pensador").html(Game2.numeroCandidatoActual);
    console.log("JUEGO 2 candidato: " + Game2.numeroCandidatoActual);
    resultTextPensador.html("Posible candidato: " + Game2.numeroCandidatoActual + "<br>" + resultTextPensador.html())
  });


  //Verifica las opciones ingresadas
  $("#send-pensador").click(()=>{
    let respuestaBien = $("#bien-pensador").val();
    let respuestaRegular = $("#regular-pensador").val();
    let respuestaNumero = $("#answer-pensador").html();
    let roundRespuestaBien = Math.round(respuestaBien);
    let roundRespuestaRegular = Math.round(respuestaRegular);
    let sumaRespuestas = roundRespuestaBien + roundRespuestaRegular
    //Control sobre los campos de respuesta bien y regular
    if (respuestaBien != "" && respuestaRegular != "" && roundRespuestaBien >= 0 && roundRespuestaBien <= 4 && roundRespuestaRegular >= 0 && roundRespuestaRegular <= 4 && sumaRespuestas >= 0 && sumaRespuestas <= 4) {
      //vacio los inputs
      $("#bien-pensador").val("")
      $("#regular-pensador").val("");

      if (respuestaBien == 4) {
        resultTextPensador.html("<strong> TU NUMERO ES: " + respuestaNumero +"<br>INTENTOS: "+ Game2.intentosGame2 + "<br> ---------- <br></strong>" + resultTextPensador.html());
      } else{
        Game2.agregarACandidatosAnteriores(respuestaBien,respuestaRegular,respuestaNumero);
        // Busco otro numero del arreglo
        while (Game2.candidatoEncontrado == false) {
          //En caso de error humano, el arreglo se vacia y muestro este mensaje
          if (Game2.opcionesGame2.length == 0) {
            resultTextPensador.html("No pude encontrar tu numero, por favor toca el boton de 'Adivinaré tu número nuevamente para iniciar otro juego! " + "<br>" + "----------<br>" + resultTextPensador.html());
            return false;
          } else {
            let nuevoCandidato = Game2.opcionesGame2[Math.round(Math.random() * (Game2.opcionesGame2.length - 1))].toString();
            // Compruebo que el candidato encontrado verifica los anteriores
            Game2.validarCandidato(nuevoCandidato,Game2.numerosCandidatosGame2);
          }
        }
        //Pregunto con nuevo candidato
        resultTextPensador.html("Posible candidato: " + Game2.numeroCandidatoActual + "<br>" + "----------<br>" + "Bien: " + roundRespuestaBien + ", Regular: " + roundRespuestaRegular + "<br>" + resultTextPensador.html());
        $("#answer-pensador").html(Game2.numeroCandidatoActual);
        console.log("candidato: " + Game2.numeroCandidatoActual);
      }
    } else { 
      alert("Por favor ingresa un numero de 0 a 4 en bien y regular.");
    }
    
  });
