import { ConsultRequest } from './../../../../src/consultService/domain/dto/consultRequest.dto';
import { DatabaseService } from './../../../../src/consultService/infrastructure/oracle/database.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as oracledb from 'oracledb';
import { OracleService } from '../../../../src/share/infrastructure/oracle/oracle.service';
import { ConfigModule } from '@nestjs/config';
import config from '../../../../src/share/domain/resources/env.config';
import { ApmService } from '../../../../src/share/domain/config/apm.service';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';

jest.mock('../../../../src/share/infrastructure/oracle/oracle.service');

describe('Database Service', () => {
  let databaseService: DatabaseService;
  let oracleService: OracleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
      providers: [
        OracleService,  
        ApmService,    
        DatabaseService,
        ProcessTimeService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
      ],
    }).compile();
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
    oracleService = moduleRef.get<OracleService>(OracleService);
  });

  describe('Database Service', () => {
    const payloadNewContract: ConsultRequest = {
      tipoConsulta: 'string',
      datoBusqueda: 'string'
    };

    
    it('Must response DatabaseService 1', async () => {
      const oracleConnectionFake = {
        execute: function () {
          return {
            outBinds: {},
          };
        },
        close: function () {
          //
        },
      } as any as oracledb.Connection;

      jest
        .spyOn(oracleService, 'getConnection')
        .mockResolvedValue(oracleConnectionFake);
      const oracleExecuteFake = {
        outBinds: {},
      } as any as oracledb.Result<unknown>;

      jest.spyOn(oracleService, 'execute').mockResolvedValue(oracleExecuteFake);

      await databaseService.consult(payloadNewContract);
      expect(oracleService.execute).toBeCalled();
    });

    it('Must response DatabaseService 2', async () => {
      jest
        .spyOn(oracleService, 'getConnection')
        .mockRejectedValue('GetConnection Error');

      expect(
        databaseService.consult(payloadNewContract),
      ).rejects.toThrowError();
    });
  });
});
