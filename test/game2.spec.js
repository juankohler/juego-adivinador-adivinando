import * as Game2 from '../js/game2'

describe('JUEGO 2: "Adivinaré mi número"', ()=> {
  
  describe('metodo initGame2', ()=> {
    it('El posible candidato generado es de 4 digitos ',()=>{
      Game2.initGame2();
      expect(4).toEqual(Game2.numeroCandidatoActual.toString().length);
    })
  })
  
  describe('metodo agregarACandidatosAnteriores', ()=> {
    it('Los numero es borrado del arreglo opcionesGame2 ',()=>{
      Game2.initGame2();
      let bien = 2;
      let regular = 2;
      let numero = 1234;
      Game2.agregarACandidatosAnteriores(bien,regular,numero);
      expect(Game2.opcionesGame2).not.toContain(numero);
    })
  })

  describe('metodo validarCandidato', ()=> {
    it('Verifica que el candidato nuevo SI cumple con las validaciones (Bien:2, Regular:2, CandidatoAnterior:1234, CandidatoNuevo: 1243)',()=>{
      Game2.initGame2();
      let candidatoInicial = 1234
      let candidatoNuevo = 1243
      let bien = 2;
      let regular = 2;
      Game2.agregarACandidatosAnteriores(bien,regular,candidatoInicial);
      Game2.validarCandidato(candidatoNuevo,Game2.numerosCandidatosGame2)
      let candidatoFinal = Game2.numeroCandidatoActual
      expect(candidatoNuevo).toEqual(candidatoFinal);
    })
    it('Verifica que el candidato nuevo NO cumple con las validaciones (Bien:2, Regular:2, CandidatoAnterior:1234, CandidatoNuevo: 1235)',()=>{
      Game2.initGame2();
      let candidatoInicial = 1234
      let candidatoNuevo = 1235
      let bien = 2;
      let regular = 2;
      Game2.agregarACandidatosAnteriores(bien,regular,candidatoInicial);
      Game2.validarCandidato(candidatoNuevo,Game2.numerosCandidatosGame2)
      let candidatoFinal = Game2.numeroCandidatoActual
      expect(candidatoNuevo).not.toEqual(candidatoFinal);
    })
  })
})
//   describe('metodo checkGame1', ()=> {
//     let numeroGanador = ["1","2","3","4"];
//     let numeroIngresado = "1234";
//     let resultadoCheckGame1 = Game1.checkGame1(numeroIngresado,numeroGanador);
  
//       expect(4).toEqual(resultadoCheckGame1.correctos);
//     })
//     it('Los digitos regulares("REGULARES") son 0 ',()=>{
//       expect(0).toEqual(resultadoCheckGame1.regulares);
//     })
//     it('La opcion ingresada tiene 4 digitos ',()=>{
//       expect(true).toEqual(resultadoCheckGame1.valido);
//     })
//   })