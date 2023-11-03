
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsultService } from '../../application/consult.service';
import configuration from '../../../share/domain/resources/env.config';
import { ConsultController } from '../controller/consult.controller';

/**
 *  @description clase anotada con un decorador @Module(). El decorador @Module() proporciona
 *  metadatos que Nest utiliza para organizar la estructura de la aplicación.
 *
 *  @author Fabrica Digital
 *
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [ConsultController],
  providers: [ConsultService],
})
export class ConsultModule {}
