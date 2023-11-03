/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Celula Azure
 *
 */
export class ConsultResponse {
  VCEXISTEBRIDGE: string;
  VCERROR: string;
  VCDESCRIPCIONERROR: string;
  constructor(VCEXISTEBRIDGE: string, VCERROR: string, VCDESCRIPCIONERROR: string) {
    this.VCEXISTEBRIDGE = VCEXISTEBRIDGE;
    this.VCERROR = VCERROR;
    this.VCDESCRIPCIONERROR = VCDESCRIPCIONERROR;
  }
}
