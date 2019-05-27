import * as Game1 from '../js/game1'

describe('JUEGO 1: "Adivina mi número"', ()=> {
  describe('metodo initGame1', ()=> {
    it('El numero ganador generado es de 4 digitos ',()=>{
      let resultadoInitGame1 = Game1.initGame1();
      expect(4).toEqual(Game1.numeroGanador.length);
    })
  })

  describe('metodo checkGame1', ()=> {
    let numeroGanador = ["1","2","3","4"];
    let numeroIngresado = "1234";
    let resultadoCheckGame1 = Game1.checkGame1(numeroIngresado,numeroGanador);
  
    it('Los digitos correctos("BIEN") son 4 ',()=>{
      expect(4).toEqual(resultadoCheckGame1.correctos);
    })
    it('Los digitos regulares("REGULARES") son 0 ',()=>{
      expect(0).toEqual(resultadoCheckGame1.regulares);
    })
    it('La opcion ingresada tiene 4 digitos ',()=>{
      expect(true).toEqual(resultadoCheckGame1.valido);
    })
  })
})