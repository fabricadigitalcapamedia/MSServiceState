import { ConsultService } from './../../../../src/consultService/application/consult.service';
import { ConsultController } from './../../../../src/consultService/interfaces/controller/consult.controller';
import { ConsultRequest } from './../../../../src/consultService/domain/dto/consultRequest.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponseDto } from '../../../../src/share/domain/dto/apiResponse.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';
import { TransaccionIdProvider } from '../../../../src/share/domain/config/transactionId.provider';
import { ApmService } from '../../../../src/share/domain/config/apm.service';

jest.mock('../../../../src/consultService/application/consult.service');
describe('ConsultService', () => {
  let service: ConsultService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ConsultController],
      providers: [
        ConsultService,
        TransaccionIdProvider,
        ProcessTimeService,
        ApmService,
      ],
    }).compile();

    service = moduleRef.get<ConsultService>(ConsultService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('New Contract Controller', () => {
    it('Initialize - Success', async () => {
      expect(app).toBeDefined();
    });

    it('Must response OK', async () => {
      const payloadNewContract: ConsultRequest = {
        tipoConsulta: 'string',
        datoBusqueda: 'string',
      };

      const mockApiResponse = new ApiResponseDto(
        "200",
        'OK',
        "",
      );

      jest
        .spyOn(service, 'consult')
        .mockResolvedValue(mockApiResponse);

      return request(app.getHttpServer())
        .get('/Consult?datoBusqueda=' + payloadNewContract.datoBusqueda + '&tipoConsulta=' + payloadNewContract.tipoConsulta)
        .send()
        .expect(200)
        .expect((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.existeBridge).toEqual(mockApiResponse.existeBridge);
          expect(response.body.error).toEqual(mockApiResponse.error);
          expect(service.consult).toBeCalledWith(payloadNewContract);
        });
    });
  });
});
