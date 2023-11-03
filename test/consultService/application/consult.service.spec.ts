import { ConsultController } from './../../../src/consultService/interfaces/controller/consult.controller';
import { ConsultService } from './../../../src/consultService/application/consult.service';
import { ConsultRequest } from './../../../src/consultService/domain/dto/consultRequest.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../../src/consultService/infrastructure/oracle/database.service';
import { ConfigModule } from '@nestjs/config';
import config from '../../../src/share/domain/resources/env.config';
import { ProcessTimeService } from '../../../src/share/domain/config/processTime.service';
import { ApmService } from '../../../src/share/domain/config/apm.service';
import { ConsultResponse } from '../../../src/consultService/domain/dto/consultResponse.dto';
import { ApiResponseDto } from '../../../src/share/domain/dto/apiResponse.dto';


jest.mock('../../../src/consultService/infrastructure/oracle/database.service');
describe('New Contract Controller', () => {
  let service: ConsultService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        ConsultService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
        ProcessTimeService,
        ApmService,
      ],
      controllers: [ConsultController],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
    }).compile();

    service = moduleRef.get<ConsultService>(ConsultService);
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  describe('New Contract Service', () => {
    it('consumption towards the procedure', async () => {
      expect(service).toBeDefined();
    });

    it('Must response procedimientoActivacion', async () => {
      const payloadNewContract: ConsultRequest = {
        tipoConsulta: 'string',
        datoBusqueda: 'string',
      };
      jest
        .spyOn(databaseService, 'consult')
        .mockResolvedValue(
          new ConsultResponse('1', '0', '-'),
        );
      await service.consult(payloadNewContract);
      expect(databaseService.consult).toBeCalled();
    });
    it('Must response procedimientoActivacion catch', async () => {
      jest
        .spyOn(databaseService, 'consult')
        .mockImplementation(() => {
          throw new Error('There was an error');
        });
      expect(await service.consult(null)).toEqual(new ApiResponseDto('Service Unavailable', '1', undefined));
    });
  });
});
