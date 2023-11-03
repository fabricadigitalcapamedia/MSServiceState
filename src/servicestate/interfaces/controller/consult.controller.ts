import { QueryValidationPipe } from './../../application/pipe/queryValidationPipe.pipe';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Query,
  Res,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConsultRequest } from '../../domain/dto/consultRequest.dto';
import { ConsultService } from '../../application/consult.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { SERVICE_PREFIX } from '../../../share/domain/resources/constants';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { ApmInterceptor } from '../../../share/domain/config/apm.interceptor';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('metodoConsulta')
@Controller('metodoConsulta')
@UseInterceptors(ApmInterceptor)
export class ConsultController {
  private readonly logger = new Logger(ConsultController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: ConsultService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Get()
  async servicestate(
    @Res() res: Response,
    @Query() payload: ConsultRequest,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Consult Controller request message', {
        request: payload,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.metodoConsulta(
        payload,
      );
      res.status(HttpStatus.OK).json(serviceResponse);
    } finally {
      this.logger.log(
        `Consumo del servicio ${SERVICE_PREFIX}/servicestate finalizado`,
        {
          totalProcessTime: processTime.end(),
          transactionId: this.transactionId,
        },
      );
    }
  }
}
