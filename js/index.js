import $ from 'jquery';
window.$ = $;
window.jQuery = $;


(() => {
  
  var activeGame1 = false;
  var activeGame2 = false;
  var numero= [];
  var intentos=0;

  let initGame1 = () => {
    activeGame1 = true;
    $(".instructions-container, .results-container").removeClass("hide");
    var opciones = ["1","2","3","4","5","6","7","8","9"];
    var pos;

    //Vacio el arreglo
    numero = []
    //Armo un arreglo con 4 numeros al azar, que no se repitan
    for(var i=0; i<4; i++){
      var cifra = opciones[Math.round(Math.random()*(opciones.length-1))];
      pos = opciones.indexOf(cifra);
      opciones.splice(pos,1);
      numero.push(cifra);
    }
    console.log(numero);

  }

  let checkNumber = () =>{
    let valor = $("#value").val().toString();
    //Declaro un arreglo para la opcion ingresada
    let opcion = []
    let correctos = 0;
    let regular = 0;

    //subo variable intentos
    intentos++;

    if(valor.length == 4 & valor.length >= 0){

      //Lleno el arreglo con la opcion ingresada
      for(var j=0; j<4; j++){
        opcion.push(valor.charAt(j));
      }
      //Compara la opcion ingresada con el numero
      if(opcion.toString() == numero.toString()){
        if(intentos == 1){
          let htmlActual = $("#results-text").html();
          $("#results-text").html(htmlActual + "GANASTE EN " + intentos + " INTENTO! <br>");
          console.log("GANASTE");
        }else {          
        let htmlActual = $("#results-text").html();
        $("#results-text").html(htmlActual + "GANASTE EN " + intentos + " INTENTOS! <br>");
        console.log("GANASTE");
        }
        
      } else {
        for(var j=0; j<4; j++){
          if(numero.indexOf(opcion[j]) != -1 ){
            if(numero[j] == opcion[j]){
              correctos++;
            }else {
              regular++;
            }
          }
        }

        let htmlActual = $("#results-text").html();
        $("#results-text").html(htmlActual + "Bien:" + correctos + " , Regular: " + regular + "<br>");
        
      }

    }else {
      alert("Por favor ingresa un numero positivo de 4 cifras");
    }

  }

  
  $("#adivinador").click(initGame1);
  $("#send").click(checkNumber);
})();
