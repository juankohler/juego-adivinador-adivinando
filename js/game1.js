export {
  initGame1,
  checkGame1,
  activeGame1,
  intentosGame1,
  numeroGanador,
  numeroGame1
};

//Variables
var activeGame1;
var numeroGame1 = [];
var numeroGanador;
var intentosGame1 = 0;

//funcion para iniciar el juego 1 (la persona adivina el número)
const initGame1 = () => {
  //Vacio el arreglo por si inicia un nuevo juego y reinicio los intentos
  numeroGame1 = [];
  intentosGame1 = 0;
  //Numeros que con los que se puede armar el numero a advinar
  var opciones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var pos;
  //Armo un arreglo con 4 numeros al azar, que no se repitan 
  for (let i = 0; i < 4; i++) {
    var cifra = opciones[Math.round(Math.random() * (opciones.length - 1))];
    pos = opciones.indexOf(cifra);
    if (i == 0 && cifra == 0) {
      cifra = 1;
    }
    opciones.splice(pos, 1);
    numeroGame1.push(cifra);
  }
  numeroGanador = numeroGame1[0].toString() + numeroGame1[1].toString() + numeroGame1[2].toString() + numeroGame1[3].toString()
}


//funcion para chequear los numeros que se ingresan (BIEN, REGULAR)
const checkGame1 = (valorIngresado,numeroGanadorGame1) => {
  let opcionIngresada = []
  let numeroIngresado = {
    numero : valorIngresado,
    correctos: 0,
    regulares: 0,
    valido: false
  }
  //subo variable intentos
  intentosGame1++;
  //verifico que el valor ingresado sea de 4 cifras y mayor a igual 0
  if (valorIngresado.length == 4 & valorIngresado >= 0) {
    numeroIngresado.valido = true;
    //Lleno el arreglo con la opcion ingresada.
    for (let j = 0; j < 4; j++) {
      opcionIngresada.push(valorIngresado.charAt(j));
    }
    //comparo numeros
    for (let j = 0; j < 4; j++) {
      //compruebo si los numeros guardados en el arreglo de la opcion ingresada, estan en el arreglo del numero pensado
      if (numeroGanadorGame1.indexOf(opcionIngresada[j]) != -1) {
        //en caso de que el numero este y ocupe la misma posicion del otro arreglo aumento la variable correctos
        if (numeroGanadorGame1[j] == opcionIngresada[j]) {
          numeroIngresado.correctos++;
        }
        //en caso de que el numero este y ocupe una posicion distinta aumento la variable regulares
        else {
          numeroIngresado.regulares++;
        }
      }
    }
  } else {
    numeroIngresado.valido = false;
  }
  return numeroIngresado

}