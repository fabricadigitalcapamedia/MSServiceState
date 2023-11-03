import { ApiProperty } from '@nestjs/swagger';
import { StringDecoder } from 'string_decoder';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
export class ApiResponseDto {
  @ApiProperty()
  tiempo_respuesta: String;

  @ApiProperty()
  respuesta: string;
  constructor(tiempo_respuesta: string,respuesta: string) {
    this.tiempo_respuesta = tiempo_respuesta;
    this.respuesta = respuesta;
  }
}
