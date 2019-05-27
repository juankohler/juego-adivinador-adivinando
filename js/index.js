import $ from 'jquery';
import {initGame1, checkGame1} from './game1';
import {initGame2, checkGame2} from '../js/game2';

  
  //Llamado a funciones
  $("#adivinador").click(initGame1);
  $("#send-adivinador").on("click",()=>{
    var valorIngresadoJuego1 = $("#value-adivinador").val().toString();
    checkGame1(valorIngresadoJuego1)    
  });

  $("#pensador").click(initGame2);
  $("#send-pensador").on("click",()=>{
    checkGame2()    
  });
  // $("#send-pensador").click(Game2.checkGame2);
