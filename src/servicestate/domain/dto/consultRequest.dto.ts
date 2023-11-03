import { ApiProperty } from '@nestjs/swagger';

/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Celula Azure
 *
 */
export class ConsultRequest {
  
  @ApiProperty({ description: 'duración de la llamada' })
  microservicio: string;

  @ApiProperty({ description: 'NUM_DOC de usuario' })
  metodo: string;

  @ApiProperty({ description: 'NUM_DOC de usuario' })
  ambiente: string;
}
