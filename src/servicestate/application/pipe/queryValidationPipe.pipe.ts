
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
/**
 *  @description Clase servicio responsable ejecutar las validaciones del servicio
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (this.isEmpty(value.tipoConsulta)) {
      const error = {
        "existeBridge": "0",
        "error": "C001",
        "descripcionError": "El TIPO DE CONSULTA es un campo Obligatorio"
      }
      throw new BadRequestException(error);
    }

    if (this.isEmpty(value.datoBusqueda)) {
      const error = {
        "existeBridge": "0",
        "error": "C002",
        "descripcionError": "El DATO BUSQUEDA es un campo Obligatorio"
      }
      throw new BadRequestException(error);
    }

    return value;
  }
  private isEmpty(value: any) {
    try {
      if (Object.keys(value).length < 1) return true;
    } catch (error) {
      return true;
    }

    return false;
  }
}
