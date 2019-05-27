
export { initGame1, checkGame1 };


//Variables
//juego 1
var activeGame1 = false;
var numeroGame1 = [];
var intentosGame1 = 0;

//Elementos del DOM
let gameAdivinador = document.getElementsByClassName("game-adivinador")[0];
let gamePensador = document.getElementsByClassName("game-pensador")[0];
let resultTextAdivinador = document.getElementById("results-text-adivinador");

  
  //funcion para iniciar el juego 1 (la persona adivina el número)
  const initGame1 = () => {
    //se muestra html oculto correspondiente al primer juego
    gameAdivinador.classList.remove("hide");
    gamePensador.classList.add("hide");

    if(activeGame1==true){
      // alert("Comenzó otro juego de 'Adivina mi número'");
      resultTextAdivinador.innerHTML = "COMENZÓ OTRO JUEGO DE 'ADIVINA MI NUMERO'<br> ---------- <br>" + resultTextAdivinador.innerHTML;

    }
    
    activeGame1 = true;

    //Numeros que con los que se puede armar el numero a advinar
    var opciones = ["1","2","3","4","5","6","7","8","9","0"];
    var pos;
    
    //Vacio el arreglo por si inicia un nuevo juego y reinicio los intentos
    numeroGame1 = [];
    intentosGame1 = 0;

    //Armo un arreglo con 4 numeros al azar, que no se repitan 
    for(let i=0; i<4; i++){
      var cifra = opciones[Math.round(Math.random()*(opciones.length-1))];
      pos = opciones.indexOf(cifra);
      if( i == 0 && cifra == 0){
        cifra=1;
      }
      opciones.splice(pos,1);
      numeroGame1.push(cifra);
    }
    console.log("JUEGO 1: " + numeroGame1[0].toString() + numeroGame1[1].toString() + numeroGame1[2].toString() + numeroGame1[3].toString() );

  }



  //funcion para chequear los numeros que se ingresan
  const checkGame1 = (valorIngresado) =>{
    let opcionIngresada = []
    let correctos = 0;
    let regulares = 0;

    //subo variable intentos
    intentosGame1++;

    //verifico que el valor ingresado sea de 4 cifras y mayor a igual 0
    if(valorIngresado.length == 4 & valorIngresado >= 0){

      //Lleno el arreglo con la opcion ingresada.
      for(let j=0; j<4; j++){
        opcionIngresada.push(valorIngresado.charAt(j));
      }

      //Comparo la opcion ingresada con el numero
      if(opcionIngresada.toString() == numeroGame1.toString()){
        if(intentosGame1 == 1){
          resultTextAdivinador.innerHTML = "<strong> GANASTE EN " + intentosGame1 + " INTENTO! <br> EL NUMERO ERA: " + numeroGame1[0].toString() + numeroGame1[1].toString() + numeroGame1[2].toString() + numeroGame1[3].toString()  +  "<br> ---------- <br></strong>" + resultTextAdivinador.innerHTML
          console.log("GANASTE JUEGO 1");
        }else {          
          resultTextAdivinador.innerHTML = "<strong> GANASTE EN " + intentosGame1 + " INTENTOS! <br> EL NUMERO ERA: " + numeroGame1[0].toString() + numeroGame1[1].toString() + numeroGame1[2].toString() + numeroGame1[3].toString()  +  "<br> ---------- <br></strong>" + resultTextAdivinador.innerHTML
          console.log("GANASTE JUEGO 1");
        }
        
      } else {
        for(let j=0; j<4; j++){
          //compruebo si los numeros guardados en el arreglo de la opcion ingresada, estan en el arreglo del numero pensado
          if(numeroGame1.indexOf(opcionIngresada[j]) != -1 ){
            //en caso de que el numero este y ocupe la misma posicion del otro arreglo aumento la variable correctos
            if(numeroGame1[j] == opcionIngresada[j]){
              correctos++;
            }
            //en caso de que el numero este y ocupe una posicion distinta aumento la variable regulares
            else {
              regulares++;
            }
          }
        }

        //muestro en el cuadro resultados
        resultTextAdivinador.innerHTML = "Numero ingresado:" + valorIngresado + "<br>" + correctos +" BIEN Y " + regulares + " REGULAR <br> ---------- <br>" + resultTextAdivinador.innerHTML
  
      }
      return true;
    
    }else {
      alert("Por favor ingresa un numero positivo de 4 cifras");
      return false;
    }

  }