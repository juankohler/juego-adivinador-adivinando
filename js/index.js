import $ from 'jquery';
import * as Game1 from '../js/game1'
import {initGame2, checkGame2} from '../js/game2';

  //Elementos del DOM
    //JUEGO 1
    let gameAdivinador = $(".game-adivinador");
    let resultTextAdivinador = $("#results-text-adivinador");  
    //JUEGO 2
    let gamePensador = $(".game-pensador");

  
  //EVENTOS JUEGO 1
  //Inicia el juego
  $("#adivinador").click(()=>{
    //se muestra html oculto correspondiente al primer juego
    gameAdivinador.removeClass("hide");
    gamePensador.addClass("hide");
    //funcion para generar el numero 
    Game1.initGame1();
    //En caso de que haya un juego activo y se inicie otro
    console.log(Game1.activeGame1)
    if(Game1.activeGame1 == true){
      resultTextAdivinador.html("COMENZÓ OTRO JUEGO DE 'ADIVINA MI NUMERO'<br> ---------- <br>" + resultTextAdivinador.html());
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
        resultTextAdivinador.html("<strong> GANASTE! EL NUMERO ERA: " + Game1.numeroGanador + " <br> INTENTOS: " + Game1.intentosGame1 + "<br> ---------- <br></strong>" + resultTextAdivinador.html())
      }else{
        resultTextAdivinador.html("Numero ingresado:" + numeroAnalizado.numero + "<br>" + numeroAnalizado.correctos + " BIEN Y " + numeroAnalizado.regulares + " REGULAR <br> ---------- <br>" + resultTextAdivinador.html())
      }
    }else{
      alert("Por favor ingresa un numero positivo de 4 cifras");
    }
  });


  //EVENTOS JUEGO 2
  $("#pensador").click(()=>{
    //se muestra html oculto correspondiente al segundo juego
    gameAdivinador.addClass("hide");
    gamePensador.removeClass("hide");
    //funcion para iniciar segundo juego, se genera un numero aleatorio de 4 cifras distintas
    initGame2();
  });
  $("#send-pensador").click(()=>{
    checkGame2()    
  });
