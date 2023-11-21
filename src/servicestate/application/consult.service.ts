import { ProcessTimeService } from './../../share/domain/config/processTime.service';
import {
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { ConsultRequest } from '../domain/dto/consultRequest.dto';
import axios, { AxiosRequestConfig } from 'axios';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class ConsultService {
  private readonly logger = new Logger(ConsultService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  public async metodoConsulta(
    consultRequest: ConsultRequest,
  ): Promise<ApiResponseDto> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Consult request', {
        request: consultRequest,
        transactionId: this.transactionId,
      });
      let response: any;
      let curlCommand;
      switch (consultRequest.microservicio) {
        
        case 'mscomunicationsaleforce':

            switch (consultRequest.metodo) {  
              case 'IpmonSmilestone':

                switch(consultRequest.ambiente){
                  case 'dev':
                    response = await this.getService('curl --location "http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/IpmonSmilestone" ' +
                    '--header "accept: application/json" ' +
                    '--header "Content-Type: application/json" ' +
                    '--header "Cookie: 170751ca5dbdd2fc7b788ea00752648c=6e130ba0d9658c2589ef247ec1ec03ae" ' +
                    '--data \'{' +
                    '"orderOmsId": "64c2c41a2c132396cae64d09",' +
                    '"orderSapId": "64b6a3c12c132396ca91b33e",' +
                    '"orderProductItem": {' +
                    '"status": "READY_FOR_PICKUP",' +
                    '"deliveryOrderId": "F23071861004",' +
                    '"serials": "571234567890",' +
                    '"productType": "TV0003"' +
                    '}' +
                    '}\'', 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/IpmonSmilestone');
                    break;
                  
                  case 'qa':
                    response = await this.getService('curl --location "http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/IpmonSmilestone" ' +
                    '--header "accept: application/json" ' +
                    '--header "Content-Type: application/json" ' +
                    '--header "Cookie: 170751ca5dbdd2fc7b788ea00752648c=6e130ba0d9658c2589ef247ec1ec03ae" ' +
                    '--data \'{' +
                    '"orderOmsId": "64c2c41a2c132396cae64d09",' +
                    '"orderSapId": "64b6a3c12c132396ca91b33e",' +
                    '"orderProductItem": {' +
                    '"status": "READY_FOR_PICKUP",' +
                    '"deliveryOrderId": "F23071861004",' +
                    '"serials": "571234567890",' +
                    '"productType": "TV0003"' +
                    '}' +
                    '}\'', 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/IpmonSmilestone');
                    break;
                }
               
                break;
              
              case 'Reversepaymentsvtas':
                  switch(consultRequest.ambiente){
                    case 'dev':
                      response = await this.getService(`curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/ReversePaymentSvtas' \
                      --header 'accept: application/json' \
                      --header 'Content-Type: application/json' \
                      --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; 170751ca5dbdd2fc7b788ea00752648c=deb5a270f24adacf7f3f54597b28addd' \
                      --data '{"PaymentConfirmation":[{"CaseNumber": "00001015","paymentId": "123456788","companyId": "SICACOM","status": "Cerrado","SubState": "Dinero entregado","OrderPaymentInformation":[{"paymentMethod": "1","amount": 10.0,"dateTime": "2021-04-16T00:00:00.000Z"}]}]}'`,
                      'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/ReversePaymentSvtas');
                    break;

                    case 'qa':
                      response = await this.getService(`http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/ReversePaymentSvtas' \ --header 'accept: application/json' \ --header 'Content-Type: application/json' \ --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; 170751ca5dbdd2fc7b788ea00752648c=deb5a270f24adacf7f3f54597b28addd' \ --data '{     \"PaymentConfirmation\": [         {             \"CaseNumber\": \"00001015\",             \"paymentId\": \"123456788\",             \"companyId\": \"SICACOM\",             \"status\": \"Cerrado\",             \"SubState\": \"Dinero entregado\",             \"OrderPaymentInformation\": [                 {                     \"paymentMethod\": \"1\",                     \"amount\": 10.0,                     \"dateTime\": \"2021-04-16T00:00:00.000Z\"                 }             ]         }     ] }' '`,
                      'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/ReversePaymentSvtas');
                    break;
                  }
                break;
                
              case 'VerifyOrderPayment':
                 switch(consultRequest.ambiente){
                    case 'dev':
                      response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                      --header 'accept: application/json' \
                      --header 'Content-Type: application/json' \
                      --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; 4478bc089c9d48de53802e305b954148=f974750df5a07f3d74c5b4bdab5c4f55' \
                      --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment');
                      break;
                    case 'qa':
                      response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                      --header 'accept: application/json' \
                      --header 'Content-Type: application/json' \
                      --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; 4478bc089c9d48de53802e305b954148=f974750df5a07f3d74c5b4bdab5c4f55' \
                      --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment');
                      break;
                      case 'prod':
                        response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                        --header 'accept: application/json' \
                        --header 'Content-Type: application/json' \
                        --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; 4478bc089c9d48de53802e305b954148=f974750df5a07f3d74c5b4bdab5c4f55' \
                        --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/VerifyOrderPayment');
                        break;      
                }
                break;

              case 'GetOrderPayment':
                switch(consultRequest.ambiente){
                  case 'dev':
                    response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c' \
                    --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment');
                    break;
                  case 'qa':
                    response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c' \
                    --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment');
                    break;
                    case 'prod':
                      response = await this.getService("curl --location 'http://mscomunicationsaleforce-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment?identificationType=CC&identificationNumber=1030588316' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c' \
                    --data ''", 'curl', 'http://mscomunicationsaleforce-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MSComunicationSaleforce/PaymentService/V1.0/GetOrderPayment');
                    break;  
              }
                break; 
            }
          break;
          case 'ImeiV2.0':
            switch (consultRequest.metodo) {
              case 'bdoNegativo':
                response = await this.getService("curl --location --globoff 'http://100.126.21.189:7777/Imei/V2.0/Rest/Get/bdoNegativo/{ \"imei\" : \"354632880007697\"}?transactionId=string&system=string&target=string&user=string&requestDate=2018-03-01T17%3A04%3A08.867&ipApplication=string&traceabilityId=string'","curl",
                "http://100.126.21.189:7777/Imei/V2.0/Rest/Get");
                break;
              case 'cambioTitularidad':
                response = await this.getService(`curl --location --globoff --request POST 'http://100.126.21.189:7777/Imei/V2.0/Rest/Post/cambioTitularidad/{"mensajeRegPositivo":{"tipoUsuarioAutorizado":"1","tipoUsuarioPropietario":"2","barrio":0,"ciudad":0,"departamento":0,"telefonoValidado":0,"direccionValidada":0,"idCCid":0,"tipoLinea":0,"origenPago":0,"spCode":0,"tmCode":0,"proceso":0,"direccionIP":0,"equipoTraido":0,"minExcluido":0,"customerId":0,"coId":0,"custCode":0,"tipoDocAutorizado":"1","telContactoPropietario":"3119462235","telContactoAutorizado":"6758495860","numIdAutorizado":"102030","nombrePropietario":"ComunicaciÃ³n Celular S.A. Comcel.S.A","nombreAutorizado":"Flavia Paiolaa","direccionPropietario":"CR 106 No.15-25","direccionAutorizado":"CALLE 7  # 2 8 BLOQUE 8 APARTAMENTO 9A","msisdn":"","imsi":"123456789012345","numIdPropietario":"901153108-1","tipoDocPropietario":"2","imei":"869426042465663"}}?transactionId=1&system=1&target=1&user=1&requestDate=2020-07-28T00%3A00%3A00&ipApplication=1&traceabilityId=1 HTTP/1.1'`, "curl", "");
                break;
              case 'bdoPositivo':
                response = await this.getService("curl --location --globoff 'http://100.126.21.189:7777/Imei/V2.0/Rest/Get/bdaPositivo/{\"imei\":\"354436055536591\",\"tipoIdentificacion\": \"1\",\"identificacion\":\"1032424022\"}?transactionId=string&system=string&target=string&user=string&requestDate=2018-03-01T17%3A04%3A08.867&ipApplication=string&traceabilityId=string%20'",
                      "curl",
                      "http://100.126.21.189:7777/Imei/V2.0/Rest/Get")
                break;
              case 'bdaPositivo':
                response = await this.getService("curl --location --globoff 'http://100.126.21.189:7777/Imei/V2.0/Rest/Get/bdaPositivo/{\"imei\":\"354436055536591\",\"tipoIdentificacion\": \"1\",\"identificacion\":\"1032424022\"}?transactionId=string&system=string&target=string&user=string&requestDate=2018-03-01T17%3A04%3A08.867&ipApplication=string&traceabilityId=string%20'",
                "curl","http://100.126.21.189:7777/Imei/V2.0/Rest/Get")
                break;
              case 'RegistroImei':
                 'no tiene para pruebas'
                break;
              default:
                break;
            }
            break;
            case 'AddressV2.1':
              switch (consultRequest.metodo) {
                case 'consultaDireccionGeneral':
                  response = await this.getService("curl --location --globoff 'http://100.126.21.189:7777/Imei/V2.0/Rest/Get/bdaPositivo/{\"imei\":\"354436055536591\",\"tipoIdentificacion\": \"1\",\"identificacion\":\"1032424022\"}?transactionId=string&system=string&target=string&user=string&requestDate=2018-03-01T17%3A04%3A08.867&ipApplication=string&traceabilityId=string%20'",
                    "http://100.126.21.189:7777/Address/V2.1/Rest/consultaDireccionGeneral",
                    "curl")
                  break;
                case 'consultaDireccion':
                  curlCommand = `curl --location --request PUT 'http://100.126.21.189:7777/Address/V2.1/Rest/consultaDireccion' \
                                      --header 'Content-Type: application/json' \
                                      --data '{
                                        "headerRequest":{"transactionId":"transactionId1","system":"system2","target":"target","user":"user3",
                                                         "password":"password4", "requestDate":"2018-01-05T15:22:40.408","ipApplication":"ipApplication5",
                                                          "traceabilityId":"traceabilityId6" },"idDireccion":"15218692", "segmento":"residencial","proyecto":"P_INS"}'`;
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/Address/V2.1/Rest/consultaDireccion", "curl")
                  break;
                case 'construirDireccionHhpp':
                  curlCommand = `curl --location --request PUT 'http://100.126.21.189:7777/Address/V2.1/Rest/construirDireccionHhpp' \
                                --header 'Content-Type: application/json' \
                                --data '{"headerRequest":{"transactionId":"transactionId1","system":"system2","user":"user3","password":"password4",
                                "requestDate":"2018-01-05T15:22:40.408","ipApplication":"ipApplication5","traceabilityId":"traceabilityId6"},
                                  "drDireccion":{"idTipoDireccion":"CK"},"direccionStr":"Avenida Calle 26 # 59-51","comunidad":"11001000","tipoAdicion":"N","idUsuario":"hitss"}'`;
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/Address/V2.1/Rest/consultaDireccion", "curl")
                  break;
                case 'obtenerConfiguracionComponenteDireccion':
                  curlCommand = `curl --location --request PUT 'http://100.126.21.189:7777/Address/V2.1/Rest/obtenerConfiguracionComponenteDireccion' \
                                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \ --header 'Content-Type: application/json' \--data '{"headerRequest" : {"transactionId" : "string","system":"string","target":"string","user":"string","password" : "string",
                                "requestDate" : "2008-09-28T20:49:45", "ipApplication" : "string","traceabilityId" : "string"},"user" : "villamilc","sourceAplication":"TCRM","destinationAplication":"MGL",
                                "drDireccion" : {"barrio" : "BOLIVIA REAL","barrioTxtBM" : "","bisViaGeneradora" : "","bisViaPrincipal" : "","cpTipoNivel1" : "","cpTipoNivel2" : "","cpTipoNivel3" : "","cpTipoNivel4" : "", "cpTipoNivel5" : "", "cpTipoNivel6" : "",
                                "cpValorNivel1" : "","cpValorNivel2" : "","cpValorNivel3" : "","cpValorNivel4" : "","cpValorNivel5" : "", "cpValorNivel6" : "","cuadViaGeneradora" : "","cuadViaPrincipal" : "","dirEstado" : "","dirPrincAlt" : "","estadoDirGeo" : "",
                                "estadoRegistro" : "","estrato" : "","fechaCreacion" : "","fechaEdicion" : "","id" : "","idDirCatastro" : "","idSolicitud" : "",  "idTipoDireccion" : "","itTipoPlaca":"","itValorPlaca":"","letra3G":"","ltViaGeneradora":"","ltViaPrincipal":"","mzTipoNivel1":"",
                                "mzTipoNivel2":"","mzTipoNivel3":"","mzTipoNivel4":"","mzTipoNivel5":"","mzTipoNivel6":"","mzValorNivel1":"","mzValorNivel2":"","mzValorNivel3":"","mzValorNivel4":"","mzValorNivel5":"","mzValorNivel6":"","nlPostViaG":"","nlPostViaP":"","numViaGeneradora":"",
                                "numViaPrincipal":"","perfilCreacion":"","perfilEdicion":"","placaDireccion":"","tipoViaGeneradora":"","tipoViaPrincipal":"","usuarioCreacion":"","usuarioEdicion":""},
                                "direccionStr":"KR 102 83","comunidad":"73001000","barrio":"BOLIVIA REAL","tipoAdicion":"","tipoNivel":"","valorNivel":"","idUsuario":"80203774"}'`;
     
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/Address/V2.1/Rest/obtenerConfiguracionComponenteDireccion", "curl")
                  break;
                case 'obtenerBarrioListHhpp':
     
                  curlCommand = `curl --location --request PUT 'http://100.126.21.189:7777/Address/V2.1/Rest/obtenerBarrioListHhpp' \--header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                              --header 'Content-Type: application/json' \--data '{"headerRequest" : {"transactionId":"string","system":"string","target":"string","user":"string","password":"string","requestDate":"2008-09-28T20:49:45","ipApplication":"string","traceabilityId":"string"},"user":"villamilc","sourceAplication":"TCRM",
                              "destinationAplication":"MGL","drDireccion":{"barrio":"BOLIVIA REAL","barrioTxtBM":"","bisViaGeneradora":"","bisViaPrincipal":"","cpTipoNivel1":"","cpTipoNivel2":"","cpTipoNivel3":"","cpTipoNivel4":"","cpTipoNivel5":"","cpTipoNivel6":"","cpValorNivel1":"","cpValorNivel2":"","cpValorNivel3":"","cpValorNivel4":"",
                              "cpValorNivel5":"","cpValorNivel6":"","cuadViaGeneradora":"","cuadViaPrincipal":"","dirEstado":"","dirPrincAlt":"","estadoDirGeo":"","estadoRegistro":"","estrato":"","fechaCreacion":"","fechaEdicion":"","id":"","idDirCatastro":"","idSolicitud":"","idTipoDireccion":"","itTipoPlaca":"","itValorPlaca":"","letra3G":"","ltViaGeneradora":"",
                              "ltViaPrincipal":"","mzTipoNivel1" : "","mzTipoNivel2" : "","mzTipoNivel3" : "","mzTipoNivel4" : "","mzTipoNivel5" : "","mzTipoNivel6" : "","mzValorNivel1" : "","mzValorNivel2" : "","mzValorNivel3" : "","mzValorNivel4" : "","mzValorNivel5" : "","mzValorNivel6" : "","nlPostViaG" : "","nlPostViaP" : "","numViaGeneradora" : "","numViaPrincipal" : "","perfilCreacion" : "","perfilEdicion" : "","placaDireccion" : "","tipoViaGeneradora" : "","tipoViaPrincipal" : "","usuarioCreacion" : "","usuarioEdicion" : ""},
                              "direccionStr" : "KR 102 83","comunidad" : "73001000","barrio" : "BOLIVIA REAL","tipoAdicion" : "","tipoNivel" : "", "valorNivel" : "","idUsuario" : "80203774"}'`;
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/Address/V2.1/Rest/obtenerBarrioListHhpp'", "curl")
                  break;
                default:
                  break;
              }
            break;
          case 'WSIMEIDualSIM':
            switch (consultRequest.metodo) {
              case 'ConsultaIMEIDualSIM':
                response = await this.getService(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.dualsim.claro.com/"><soapenv:Header/><soapenv:Body>      <ser:ConsultaIMEIDualSIM>         <ConsultaIMEIDualSIMRequest>            <canal>USSD</canal>            <imei>358461425303486</imei>         </ConsultaIMEIDualSIMRequest>      </ser:ConsultaIMEIDualSIM>   </soapenv:Body></soapenv:Envelope>`, 'SOAP', 'http://172.24.208.39:8100/WSIMEIDualSIM/WSIMEIDualSIMService')
                break;
              default:
                break;
            }
            break;
            case 'UnifiedListsV1.0':
              switch (consultRequest.metodo) {
                case 'UnifiedLists':
                  curlCommand = `curl --location --request PUT 'http://100.126.21.189:7777/UnifiedLists/V1.0/Rest/UnifiedLists' \
                                 --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \ --header 'Content-Type: application/json' \
                                 --data-raw '{"headerRequest": {"transactionId": "123456789","system": "SalesForce","target": "CAV","user": "prueba","password": "test","requestDate": "2008-09-28T20:49:45","ipApplication": "1","traceabilityId": "1"},
                                  "channel": "PRESENCIAL","typeProcess": "PROMOCIONES","document": {"typeDocument": "CC","numberDocument": "79885057"},"phone": {"areaCode": "057","phone": "3168538765"},
                                "typeIdentification": "CC","mail": "123@prueba.com","identification": "1","name": "omar","punctuation": "100","observations": "prueba","lists": "ONU|OFAC","dv": "1"}'`;
     
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/UnifiedLists/V1.0/Rest/UnifiedLists", "curl")
                  break;
                default:
                  break;
              }
              break;
          case 'WSParadocServicesV1.0':
            switch (consultRequest.metodo) {
              case 'Validate':
                break;
              default:
                break;
            }
            break;
            case 'ReconocerV1.0':
              switch (consultRequest.metodo) {
                case 'getInformacion':
                  curlCommand = `curl --location 'http://100.126.21.189:7777/Reconocer/V1.0/Rest/getInformacion?transactionId=string&system=string&requestDate=2020-06-07T20%3A30%3A45&tipoDocumento=1&numDocumento=38666213&usuarioConsulta=ECM4644E&primerApellido=VELEZ&target=string&user=string&password=string&ipApplication=string&traceabilityId=string' \--header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB'`;
                  response = await this.getService(curlCommand, "http://100.126.21.189:7777/Reconocer/V1.0/Rest/getInformacion?transactionId=string&system=string&requestDate=2020-06-07T20%3A30%3A45&tipoDocumento=1&numDocumento=38666213&usuarioConsulta=ECM4644E&primerApellido=VELEZ&target=string&user=string&password=string&ipApplication=string&traceabilityId=string", "curl")
                  break;
                default:
                  break;
              }
              break;
          case 'msnotificationcuschannel':
            switch (consultRequest.metodo) {
              case 'V1':
                response = await this.getService(`curl --location --request PUT 'https://msnotificationcuschannel-compnotif-dev.apps.r05oof71.eastus2.aroapp.io/MS/COM/BusinessInteraction/RSNotificationCustomerChannel/V1' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --header 'Cookie: a42a2eec9116499bf80dc44681b4391d=1868f06da181585565d61a269b3a1226' \
                --data-raw '{
                    "messageType": "SMTP",
                    "description": "",
                    "sendTimes": 1,
                    "state": "Active",
                    "subject": "test",
                    "tryTimes": 3,
                    "pushType": "SINGLE",
                    "communicationType": "COMERCIAL",
                    "communicationOrigin": "TCRM",
                    "deliveryReceipts": "N",
                    "contentType": "MESSAGE",
                    "content": "Estimado cliente, Claro le informa que su pin de pago es el 12345678 por valor de 100000 con fecha límite 20/04/2023 10:00, puede pagar en bancos ó por el siguiente link de pagos https://onx.la/2b8c2",
                    "profileId": "SALESFORCE",
                    "receiver": [
                        {
                            "mail": "correo@claro.com.co"
                        }
                    ],
                    "attachment":[]
                }'`, '', '');
                    
                break;
              default:
                break;
            }
            break;
          case 'msdcpoffeschedul':
            switch (consultRequest.metodo) {
              case 'queryOrderSchedule':
                  response = await this.getService(`curl --location 'http://msdcpoffeschedul-omndev.apps.r05oof71.eastus2.aroapp.io/queryOrderSchedule' \
                  --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                  --header 'Content-Type: application/json' \
                  --header 'Cookie: e4db23ad432b76537785c793f6339359=a41970f6beec821938b65ebe4cb767cb' \
                  --data '{
                      "channelCode": "EC_B2C",
                      "deliveryAddrId": "11001",
                      "productList": [
                          {
                              "productCode": "7009147",
                              "channelProdCode": "7009156",
                              "quantity": "1",
                              "groupId": "",
                              "scheduleProdType": "",
                              "price": "",
                              "storeId": "C108H001",
                              "prodDelivMethod": "",
                              "addrIdForPickup": "",
                              "isPreSale": "",
                              "preOrderFullfillDate": "",
                              "salesProcess": "",
                              "salesType": ""
                          }
                      ]
                  }'`, '', '');
                break;
              case 'ProductListPromise':
                response = await this.getService(`curl --location 'http://msdcpoffeschedul-omndev.apps.r05oof71.eastus2.aroapp.io/ProductListPromise' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --header 'Cookie: e4db23ad432b76537785c793f6339359=a41970f6beec821938b65ebe4cb767cb' \
                --data '{
                    "channelCode": "EC_B2C",
                    "storeId": "C108H001",
                    "delivMethod": "",
                    "deliveryAddrId": "11001",
                    "productList": [
                        {
                            "channelProdCode": "7009156",
                            "isPreSale": "N",
                            "preorderFullfillDate": "",
                            "salesProcess": "",
                            "salesType": ""
                        },
                        {
                            "channelProdCode": "70044192",
                            "isPreSale": "N",
                            "preorderFullfillDate": "",
                            "salesProcess": "",
                            "salesType": ""
                        }
                    ]
                }'`, '', '')
                break;
              default:
                break;
            }
            break;
          case 'mscustomerorderdelivery':
            switch (consultRequest.metodo) {
              case 'order':
                response = await this.getService(`curl --location 'http://mscustomerorderdelivery-omndev.apps.r05oof71.eastus2.aroapp.io/order' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                  "orderInfo": {
                    "orderType": "REGULAR",
                    "channelCode": "SF_CAV",
                    "channelOrderNbr": "100000000008",
                    "orderStatus": "1099"
                  },
                  "items": [
                    {
                      "position": "00001",
                      "quantity": 1,
                      "prodFlowType": "TERM_LIBRE",
                      "productInfo": {
                        "productId": "70038158",
                        "salesProcess": "NAP",
                        "salesType": "LIBRE"
                      },
                      "prodDelivMethod": "9",
                      "price": 10500,
                      "subtotalAmount": 10500,
                      "storeId": "C108H001",
                      "fulfillGroup": 1
                    }
                  ],
                  "customer": {
                    "custId": "CC1234567890",
                    "name": "Prueba 1234567890-1",
                    "email": "prueba.cr22@tatic.net",
                    "title": "SEÑOR",
                    "telephone1": "3798761234",
                    "telephone2": "3798761234",
                    "docNumber": "1234567890",
                    "docType": "CC"
                  },
                  "deliveryAddress": {
                    "addressLine": "calle 10",
                    "addressLine2": "",
                    "addressLine3": "",
                    "addressNumber": "",
                    "postCode": "",
                    "city": "BOGOTA",
                    "country": "",
                    "place": "CUNDINAMARCA",
                    "latitude": "",
                    "longitude": "",
                    "contactName": "",
                    "contactPhone": "",
                    "contactEmail": "",
                    "addressCode": "11001"
                  },
                  "orderAmountSummary": {
                    "totalAmount": 10500,
                    "logisticsFee": 0,
                    "orderAmount": 10500,
                    "taxFee": 500,
                    "discountAmount": 0
                  }
                }'`, '', '');
                break;
              default:
                break;
            }
            break;
          case 'mscustomerordershipmentoms':
            switch (consultRequest.metodo) {
              case 'reject':
                response = await this.getService(`curl --location 'http://mscustomerordershipmentoms-omndev.apps.r05oof71.eastus2.aroapp.io/pickup/reject' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data '{
                  "id_pedido": "64b6a3c12c132396ca91b33e",
                  "numero_orden": "F23071861004",
                  "motivo": "RETRACTO",
                  "codigo_punto": "C108H001",
                  "motivo_rechazo": "El cliente quiere cambiar porque el producto está rayado"
                }'`, '', '');
                break;
              case 'confirm':
                response = await this.getService(`curl --location 'http://mscustomerordershipmentoms-omndev.apps.r05oof71.eastus2.aroapp.io/pickup/confirm' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data '{
                  "id_pedido": "64b6a3c12c132396ca91b33e",
                  "numero_orden": "F23071861004",
                  "motivo": "RETRACTO",
                  "codigo_punto": "C108H001",
                  "motivo_rechazo": "El cliente quiere cambiar porque el producto está rayado"
                }'`, '', '')
                break;
              case 'modify':
                //'No esta en el respo';
                break;
              default:
                break;
            }
            break;
          case 'mscusorderpubpaymentconfig':
            switch (consultRequest.metodo) {
              case 'Payment':
                switch(consultRequest.ambiente){
                  case 'dev':
                    response = await this.getService("curl -X 'POST' \ 'http://mscusorderpubpaymentconfi-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/ENP/CustomerOrder/RSCusOrdePubPaymentConfig/V1/UPDATE/Payment' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{          \"orderId\": \"12345\",  \"num_orden\": \"8888\",  \"id_process\": \"999\",  \"canal\": \"test_salesforce\",  \"tip_venta\": \"LIBRE\",  \"proceso_venta\": \"NAP\",  \"tip_entrega\": \"test\",  \"pago\": {  \"estado\": \"APROBADO\",  \"plataforma\": \"DEBITO\",  \"pasarela\": \"VISA\",  \"cus\": \"2980074\",  \"referencia\": \"1014022\",  \"valor_recaudo\": 797900,  \"fecha_recaudo\": \"2023-07-18\",  \"fecha_contable\": \"2023-07-18\"  }  }' ",
                    "curl", "http://mscusorderpubpaymentconfi-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/ENP/CustomerOrder/RSCusOrdePubPaymentConfig/V1/UPDATE/Payment");
                    break;
                  case 'qa':
                    response = await this.getService("curl -X 'POST' \ 'http://mscusorderpubpaymentconfi-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/ENP/CustomerOrder/RSCusOrdePubPaymentConfig/V1/UPDATE/Payment' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{          \"orderId\": \"12345\",  \"num_orden\": \"8888\",  \"id_process\": \"999\",  \"canal\": \"test_salesforce\",  \"tip_venta\": \"LIBRE\",  \"proceso_venta\": \"NAP\",  \"tip_entrega\": \"test\",  \"pago\": {  \"estado\": \"APROBADO\",  \"plataforma\": \"DEBITO\",  \"pasarela\": \"VISA\",  \"cus\": \"2980074\",  \"referencia\": \"1014022\",  \"valor_recaudo\": 797900,  \"fecha_recaudo\": \"2023-07-18\",  \"fecha_contable\": \"2023-07-18\"  }  }' ",
                    "curl", "http://mscusorderpubpaymentconfi-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/ENP/CustomerOrder/RSCusOrdePubPaymentConfig/V1/UPDATE/Payment");
                    break;
                }
                break;
              default:
                break;
            }
            break;
          case 'mscustomebridgeteqtec':
            switch (consultRequest.metodo) {
              case 'Insert':
                 switch(consultRequest.ambiente){
                  case 'dev':
                    response = this.getService(`curl --location 'http://mscustomebridgeteqtec-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSCustomeBridgeTeqTec/V1/Insert' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; c6b1cf1cb9e2a1d2523c8654c2b13c59=4a3242ec49b59696231fa279c81a4670' \
                    --data '{
                        "idCliente" : "345435",
                        "tipoDoc" : "2",
                        "numDoc" : "53453",
                        "imei" : "2134124",
                        "serial" : "",
                        "cuenta" : "3545",
                        "numeroTelefono": "345345"
                    }'`, "curl", "http://mscustomebridgeteqtec-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSCustomeBridgeTeqTec/V1/Insert");
                    break;
                  case 'qa':
                    response = await this.getService(`curl --location 'http://mscustomebridgeteqtec-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSCustomeBridgeTeqTec/V1/Insert' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c; c6b1cf1cb9e2a1d2523c8654c2b13c59=4a3242ec49b59696231fa279c81a4670' \
                    --data '{
                        "idCliente" : "345435",
                        "tipoDoc" : "2",
                        "numDoc" : "53453",
                        "imei" : "2134124",
                        "serial" : "",
                        "cuenta" : "3545",
                        "numeroTelefono": "345345"
                    }'`, "curl", "http://mscustomebridgeteqtec-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MSCustomeBridgeTeqTec/V1/Insert");
                    break;  
                }
                break;
              default:
                break;
            }
            break;
          case 'msautentiltoken':
            switch (consultRequest.metodo) {
              case 'Authentication':
                switch(consultRequest.ambiente){
                  case 'dev':
                    response = await this.getService("curl --location 'http://msautentiltoken-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/MsAuthentication/Authentication' \ --header 'accept: application/json' \ --header 'Content-Type: application/json' \ --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c;9852ea517a763ff80f67b409a3a05176=8d78291174b3aac66d11a05f44139853' \ --data-raw '{ \"iss\": \"3MVG9qEXqmIutu_TwT3C7e5DLglHfznLNbZQYcQw2mFNAN8PtHZsu1vwcUF.3W_cdUXPULPXAckbagusIKdbw\", \"sub\": \"devops@clarosfi.com.co.ci03\", \"aud\": \"https://test.salesforce.com\", \"exp\": \"1696455546\" }'",
                    "curl", "http://msautentiltoken-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/MsAuthentication/Authentication");
                    break;
                  case 'qa':
                    response = await  this.getService("curl --location 'http://msautentiltoken-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/MsAuthentication/Authentication' \ --header 'accept: application/json' \ --header 'Content-Type: application/json' \ --header 'Cookie: 170751ca5dbdd2fc7b788ea00752648c=9cd1c813b3531903fbcf1203e950ec9c;9852ea517a763ff80f67b409a3a05176=8d78291174b3aac66d11a05f44139853' \ --data-raw '{ \"iss\": \"3MVG9qEXqmIutu_TwT3C7e5DLglHfznLNbZQYcQw2mFNAN8PtHZsu1vwcUF.3W_cdUXPULPXAckbagusIKdbw\", \"sub\": \"devops@clarosfi.com.co.ci03\", \"aud\": \"https://test.salesforce.com\", \"exp\": \"1696455546\" }'",
                    "curl", "http://msautentiltoken-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/MsAuthentication/Authentication");
                    break;  
                }
                break;
              default:
                break;
            }
            break;
          case 'SAPInventoryV1.0':
            switch (consultRequest.metodo) {
              case 'queryByImei':
                response = await this.getService(`curl --location --request PUT 'https://apigwsfclarouat.claro.com.co:8090/SAPInventory/V1.0/Rest-3/queryByImei' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data '{
                  "headerRequest" : {
                    "transactionId" : "string",
                    "system" : "string",
                    "target" : "string",
                    "user" : "string",
                    "password" : "string",
                    "requestDate" : "2008-09-28T20:49:45",
                    "ipApplication" : "string",
                    "traceabilityId" : "string"
                  },
                  "imei" : "57101502501242137"
                }
                '`, "", "");
                break;
              default:
                break;
            }
            break;
          case 'PostSaleInspODSV1.0':
            switch (consultRequest.metodo) {
              case 'GetODS':
                response = await this.getService(`curl --location 'http://100.126.21.189:7777/PostSaleInspODS/V1.0/Rest/GetODS' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data ' {
                  "headerRequest": {
                    "transactionId": "string",
                    "system": "string",
                    "target": "string",
                    "user": "string",
                    "password": "string",
                    "requestDate": "2008-09-28T20:49:45",
                    "ipApplication": "string",
                    "traceabilityId": "string"
                  },
                  "serial":"000357079508780023"
                }'`, '', '');
                break;
              case 'UpdateODS':
                response = await this.getService(`curl --location --request PUT 'http://100.126.21.189:7777/PostSaleInspODS/V1.0/Rest/UpdateODS' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                  "headerRequest": {
                    "transactionId": "string",
                    "system": "string",
                    "target": "string",
                    "user": "string",
                    "password": "string",
                    "requestDate": "2008-09-28T20:49:45",
                    "ipApplication": "string",
                    "traceabilityId": "string"
                  },
                  "idOds": "ST00000001003165",
                  "client": {
                    "documentType": 1,
                    "documentNumber": "79644376",
                    "name": "Harold",
                    "phone": 3057844704,
                    "email": "harold.borda@gmail.com",
                    "city": "11001",
                    "department": "11",
                    "address": "Calle 2 2-22",
                    "account": "002"
                  },
                  "equipment": {
                    "imei": "111111111111360",
                    "serial": "222222222222360",
                    "min": 3057844704,
                    "sap": "asdf",
                    "brand": "string",
                    "model": "Samsung A325M 128GB",
                    "color": "aaa",
                    "keyboard": 1,
                    "connectors": 1,
                    "screen": 1,
                    "battery": 1,
                    "batteryCover": 1,
                    "case": 1,
                    "charger": 1,
                    "memoryCard": 1,
                    "freehands": 1,
                    "viewfinder": 1,
                    "other": "asdf",
                    "commentsIF": "asdf",
                    "observations": "adsf",
                    "inspect": "asdf",
                    "cosmeticReviewApproved": true,
                    "speakers": 1,
                    "cpu": 1,
                    "mouse": 1
                  },
                  "equipmentOnLoan": {
                    "imei": "357079108780886",
                    "sap": "adsf",
                    "brand": "LG",
                    "model": "LG 4509",
                    "keyboard": 2,
                    "connectors": 6,
                    "screen": 5,
                    "battery": 3,
                    "humidityReader": 2,
                    "equipmentCover": 2,
                    "case": 14
                  },
                  "period": 1,
                  "diagnosis": "asdf",
                  "entryDate": "2021-11-08",
                  "entryHour": "asdf",
                  "state": 62,
                  "tsc": 1,
                  "user": "User-01",
                  "service": "Se visualiza daÃ±o en pantalla",
                  "doa": false,
                  "equipLoan": true,
                  "loanType": "Se solicita equipo en prestamo, usuario requiere equipo de igual gama",
                  "attentionCenter": "Cav Bogota Kennedy",
                  "lineSuspension": true,
                  "distributor": "Equipo vendido Bogota",
                  "failure": "Failure-01",
                  "condition": "Condition-01",
                  "comments": "asdf",
                  "lineSuspensionI": true,
                  "equipLoanI": false,
                  "detail": "se entrega equipo de gama media",
                  "delivery": 1,
                  "sympton": "equipo sin encendido",
                  "repair": "Se ingresa para revisiÃ³n y posible reparaciÃ³n",
                  "reviewed": "Revisado por asesor del mÃ³dulo 10",
                  "reviewDate": "2021-12-11",
                  "repairDate": "2021-12-11",
                  "newEquipment": {
                    "imei": "358863408780696",
                    "serial": "000358863408780696",
                    "sap": "asdf",
                    "brand": "ASUS ZenFone Max ZC520KL",
                    "model": "ASUS_X00HD"
                  },
                  "observationsD": "actualizaao",
                  "termsOfservice": "asdfa",
                  "consultation": "asdfd",
                  "equipChange": true,
                  "part": [
                    {
                      "description": "Pantalla tactil",
                      "amount": 1,
                      "value": 15700,
                      "totalvalue": 15700
                    },
                    {
                      "description": "Chip ",
                      "amount": 2,
                      "value": 14000,
                      "totalvalue": 28000
                    },
                    {
                      "description": "Bateria",
                      "amount": 1,
                      "value": 70000,
                      "totalvalue": 70000
                    }
                  ],
                  "qualitystate": [
                    {
                      "idQualityState": 2
                    }
                  ],
                  "responseLaw": 2,
                  "requiresWithdrawalForm": true,
                  "invoiceDate": "2021-12-11",
                  "warrantyExtensionDate": "2022-03-11",
                  "enterWithAccessories": true,
                  "accessoriesEntered": [
                    {
                      "idAccessoriesEntered": 7
                    }
                  ],
                  "equipmentType": 2,
                  "warrantyReplacement": true,
                  "repairState": 1,
                  "odsDate": "2022-01-05",
                  "entryPerWarranty": 2,
                  "processedWarrantySameFailure": true,
                  "repairEquipmentWithCost": false,
                  "warrantyAppliesCompensation": true,
                  "customerDeliversEquipmentCAV": true,
                  "equipmentImpactsBrokenScreen": false,
                  "equipmentWithoutLabelSerial": false,
                  "commentsCosmeticReviewStatus": "se observa sin daÃ±o aparente, el celular no enciende",
                  "totalValueRepair": 113700,
                  "clientReturnEquipmentLoan": false,
                  "reviewEquipmentLoanWasApproved": true,
                  "descriptionAccessoriesEnterWarranty": "No tiene accesorios",
                  "law1480Applies": true,
                  "applyEquipmentChange": true,
                  "moneyBackApplies": true,
                  "moneyRefundMade": false,
                  "repairedBy": "revision en CST",
                  "faultFixedByBarTechnician": false,
                  "clientSatisfiedBarTechnicianSolution": true,
                  "customerDisagreementDetails": "Prueba estado 15",
                  "idUserDiagnosis": 5,
                  "idTechnicalDiagnosis": 33,
                  "diagnosticObservations": "Equipo no le sirve botÃ³n de apagado, pantalla tactil no funciona",
                  "paymentMethod": 4,
                  "paymentConcept": "Diagnostico",
                  "clientNotReceiveEquipment": false,
                  "equipmentUnderWarranty": false,
                  "equipmentPresentedRealFault": false,
                  "firstContactDate": "2021-12-11",
                  "faultReported": 1,
                  "equipmentEntryDate": "2021-12-11"
                }'`, '', '');
                break;
              case 'CreateODS':
                response = await this.getService(`curl --location 'https://apigwsfclarouat.claro.com.co:8090/PostSaleInspODS/V1.0/Rest/CreateODS' \
                --header 'ApkUaTSfic: cLAtvj0WWkLBfR6ryzJ71ztZRPQnnWLB' \
                --header 'Content-Type: application/json' \
                --data-raw '{
                    "headerRequest": {
                        "transactionId": "string",
                        "system": "string",
                        "target": "string",
                        "user": "string",
                        "password": "string",
                        "requestDate": "2022-02-09T07:32:55.680Z",
                        "ipApplication": "string",
                        "traceabilityId": "string"
                    },
                    "client": {
                        "documentType": 1,
                        "documentNumber": "1234567890",
                        "name": "Juan Camilo Rincon",
                        "phone": 3100014613,
                        "email": "elkin.jiga@hotmail.com",
                        "city": "11001",
                        "department": "11",
                        "address": "CL 34 SUR 52 A 81  AP 202 PI 2",
                        "account": ""
                    },
                    "equipment": {
                        "imei": "354835558016300",
                        "serial": "",
                        "min": 3100014613,
                        "sap": "70032985",
                        "brand": "Galaxy A10s",
                        "model": "SM-A107M",
                        "color": "NEGRO",
                        "keyboard": 1,
                        "connectors": 1,
                        "screen": 1,
                        "battery": 1,
                        "batteryCover": 1,
                        "case": 3,
                        "charger": 1,
                        "memoryCard": 1,
                        "freehands": 1,
                        "viewfinder": 1,
                        "other": "",
                        "commentsIF": "",
                        "observations": "",
                        "inspect": "",
                        "cosmeticReviewApproved": true,
                        "speakers": 1,
                        "cpu": 1,
                        "mouse": 1
                    },
                    "period": 5,
                    "diagnosis": "",
                    "entryDate": "2022-02-09",
                    "entryHour": "07:11",
                    "state": 1,
                    "tsc": 2,
                    "user": "ECM-EXAMPLE",
                    "service": "",
                    "doa": false,
                    "equipLoan": null,
                    "loanType": "",
                    "attentionCenter": "Cav Bogota Plaza Claro",
                    "lineSuspension": null,
                    "distributor": "",
                    "failure": "devs",
                    "condition": "devs",
                    "comments": "",
                    "lineSuspensionI": null,
                    "equipLoanI": false,
                    "detail": "",
                    "delivery": null,
                    "sympton": "",
                    "repair": "",
                    "reviewed": "",
                    "reviewDate": null,
                    "repairDate": null,
                    "observationsD": "devs",
                    "termsOfservice": "Respetado Usuario: Logytech Mobile S.A.S., (en adelante \"Logytech\"), como Centro de Servicio Tecnico Autorizado, recibe el equipo y/o accesorio sujeto a verificacion tecnica, con el fin de establecer si se encuentra dentro del periodo de garantia y cumple con las politicas de garantia establecidas por el fabricante. Si cumple con las politicas de garantia, la REPARACION NO TENDRA NINGUN COSTO. La garantia LIMITADA no cubre danos por: maltrato, golpes, humedad, la intervencion por parte del Usuario o centros de servicio no autorizados, por utilizacion contraria a lo establecido en el manual del usuario del equipo, la etiqueta del equipo o accesorio en mal estado (ilegible, rayado, roto), uso de accesorio no original, software no autorizado, etc. Bienes fuera de garantia: Si el equipo no cumple con las politicas de garantia establecidas por el fabricante pero su dano es reparable, Logytech elaborara una cotizacion de reparacion que tendra una vigencia maxima de quince (15) dias calendario, que sera notificada al Usuario para su conocimiento y posterior aceptacion. Garantia sobre la reparacion del bien: Para los equipos ingresados y reparados, Logytech otorgara garantia sobre esta reparacion de tres (3) meses, por los mismos danos y/o sobre el mismo repuesto sustituido,   a partir de la fecha en que la unidad queda disponible en la sucursal, para lo cual, Logytech notificara por cualquier medio al usuario sobre la reparacion efectuada, igualmente el usuario podra consultar de manera permanente el estado de su equipo ingresando al enlace http://www.logytechmobile.com/tsa/externo/consulta.ods.php o, si lo prefiere a traves de nuestra linea de atencion al Usuario 7429454 en Bogota, al 018000180162  en el resto del pais. Logytech se exonerara de responsabilidad frente a la garantia en los terminos del articulo 16 de la Ley 1480 de 2011. Sera responsabilidad exclusiva del Usuario, realizar una copia de la informacion almacenada en el equipo, previo al ingreso del bien al Centro de Servicio Tecnico. Toda la informacion almacenada en su equipo (tales como directorio telefonico, fotos, juegos, aplicaciones, entre otros) sera borrada con el fin de asegurar su confidencialidad y      reserva y asi lo acepta el Usuario. Logytech no se hace responsable por la perdida o deterioro de complementos cosmeticos tales como protectores de pantalla, calcomanias, antiespias y soportes, entre otros. En cumplimiento de la normatividad ambiental vigente, no se entregan al Usuario los repuestos que fueron reemplazados. Para reclamar el equipo usted debera presentar el documento original de la Orden de Servicio. En caso de perdida o robo de la misma, debera formular denuncia ante la autoridad competente y entregar el original de la misma a Logytech. Solo se entregara el equipo con copia de la Orden de Servicio o del denuncio. El cliente acepta y entiende que una vez cumplido el termino de diez (10) dias habiles para recoger el equipo movil ingresado a servicio tecnico, sin que este lo hiciera, se dara inicio al tramite contemplado en los articulos 2.2.2.56.2 y subsiguientes del Decreto 1074 de 2015. De acuerdo a lo anterior, el usuario cuenta con un (1) mes adicional (despues de vencido los diez (10) dias habiles en mencion) para retirar el equipo, de lo contrario COMCEL S.A. procedera a requerir al usuario para que en el termino de dos (2) meses haga efectivo el retiro, sin embargo, si el usuario no lo hace, se declarara el equipo en abandono; a partir del vencimiento de ultimo termino se causara por concepto de bodegaje y almacenamiento la suma de dos mil quinientos ($2.500) IVA incluido diarios, que seran facturados al momento de retirar el equipo a favor de Logytech. Logytech, como responsable y/o encargado del tratamiento de los datos personales registrados en este documento, queda autorizada para que de manera libre, previa, expresa, voluntaria y debidamente informada realice el tratamiento de sus datos de conformidad con la Politica de Proteccion de Datos publicada en la pagina web www.logytechmobile.com y en los terminos del Articulo 10 del Decreto 1377 de 2013 y Ley 1581 de 2012. Si no desea que Logytech haga uso de su informacion,    por favor comunicarnoslo de manera escrita por medio del correo solucionesinformacionprivada@logytechmobile.com. Esta informacion es y sera utilizada solo en     el desarrollo de las funciones propias de la empresa. Autorizo el envio de mensajes de texto al numero de contacto celular registrado en la ODS, informando la disponibilidad para recoleccion del equipo ingresado a revision. Usted acepta incondicionalmente que pagara a COMCEL S.A., todas las obligaciones que se hayan causado a su cargo con anterioridad a la aceptacion y que se encuentren pendientes de pago",
                    "consultation": "Estimado usuario, usted puede consultar el estado de su Orden de Servicio ingresando a: App Mi Claro ( Desde tu movil) -Consultas tus servicios tecnicos o a traves de la pagina de Internet: http://odsclaro.logytechmobile.com/",
                    "equipChange": null,
                    "part": [],
                    "qualitystate": [],
                    "responseLaw": 1,
                    "requiresWithdrawalForm": false,
                    "invoiceDate": "2021-06-25",
                    "enterWithAccessories": true,
                    "accessoriesEntered": [
                        {
                            "idAccessoriesEntered": 1
                        }
                    ],
                    "equipmentType": 1,
                    "warrantyReplacement": true,
                    "repairState": null,
                    "entryPerWarranty": 2,
                    "processedWarrantySameFailure": false,
                    "repairEquipmentWithCost": null,
                    "warrantyAppliesCompensation": null,
                    "customerDeliversEquipmentCAV": false,
                    "equipmentImpactsBrokenScreen": true,
                    "equipmentWithoutLabelSerial": true,
                    "commentsCosmeticReviewStatus": "Hola",
                    "totalValueRepair": null,
                    "clientReturnEquipmentLoan": null,
                    "reviewEquipmentLoanWasApproved": null,
                    "descriptionAccessoriesEnterWarranty": "",
                    "law1480Applies": true,
                    "applyEquipmentChange": null,
                    "moneyBackApplies": null,
                    "moneyRefundMade": null,
                    "repairedBy": "",
                    "faultFixedByBarTechnician": true,
                    "clientSatisfiedBarTechnicianSolution": true,
                    "customerDisagreementDetails": "",
                    "idUserDiagnosis": null,
                    "idTechnicalDiagnosis": null,
                    "diagnosticObservations": "",
                    "faultReported": 6,
                    "equipmentEntryDate": null,
                      "deliveryWarranty": 3
                   
                }'`, '', '');
                break;
              default:
                break;
            }
            break;
          case 'PaymentServiceV1.0':
            switch (consultRequest.metodo) {
              case 'GetOrderPayment':
                response = await this.getService(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://www.amx.com/CO/Schema/ClaroHeaders/v1" xmlns:v11="http://www.amx.com/Schema/Operation/GetOrderPayment/V1.0">
                <soapenv:Header>
                   <v1:headerRequest>
                      <!--Optional:-->
                      <v1:transactionId>per auras</v1:transactionId>
                      <!--Optional:-->
                      <v1:system>circum claustra</v1:system>
                      <!--Optional:-->
                      <v1:target>nimborum in</v1:target>
                      <!--Optional:-->
                      <v1:user>foedere certo</v1:user>
                      <!--Optional:-->
                      <v1:password>profundum quippe ferant</v1:password>
                      <v1:requestDate>2009-10-14T02:16:36</v1:requestDate>
                      <!--Optional:-->
                      <v1:ipApplication>flammato secum dea</v1:ipApplication>
                      <!--Optional:-->
                      <v1:traceabilityId>profundum quippe ferant</v1:traceabilityId>
                   </v1:headerRequest>
                </soapenv:Header>
                <soapenv:Body>
                   <v11:getOrderPaymentRequest>
                      <!--Optional:-->
                      <v11:identificationNumber>1357924697</v11:identificationNumber>
                      <!--Optional:-->
                      <v11:identificationType>1</v11:identificationType>
                      <!--Optional:-->
                      
                   </v11:getOrderPaymentRequest>
                </soapenv:Body>
             </soapenv:Envelope>`, 'SOAP', 'http://172.24.163.107:8102/PaymentService/V1.0');
                break;
              case 'ConfirmOrderPayment':
                response = await this.getService(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://www.amx.com/CO/Schema/ClaroHeaders/v1" xmlns:v11="http://www.amx.com/Schema/Operation/ConfirmOrderPayment/V1.0">
                <soapenv:Header>
                   <v1:headerRequest>
                      <!--Optional:-->
                      <v1:transactionId>flammas turbine</v1:transactionId>
                      <!--Optional:-->
                      <v1:system>hoc metuens</v1:system>
                      <!--Optional:-->
                      <v1:target>ac vinclis</v1:target>
                      <!--Optional:-->
                      <v1:user>speluncis abdidit</v1:user>
                      <!--Optional:-->
                      <v1:password>aris imponet honorem</v1:password>
                      <v1:requestDate>2000-09-25T01:18:09</v1:requestDate>
                      <!--Optional:-->
                      <v1:ipApplication>circum claustra fremunt</v1:ipApplication>
                      <!--Optional:-->
                      <v1:traceabilityId>certo et premere</v1:traceabilityId>
                   </v1:headerRequest>
                </soapenv:Header>
                <soapenv:Body>
                   <v11:confirmOrderPaymentRequest>
                      <v11:paymentID>ORD00003728</v11:paymentID>
                      <v11:externalPaymentID>string</v11:externalPaymentID>
                      <!--Optional:-->
                      <v11:companyId>ORD00003745</v11:companyId>
                      <v11:items>
                         <!--1 or more repetitions:-->
                         <v11:item>
                            <v11:id>ITEM37052</v11:id>
                            <v11:productOffering poId="per auras">USIM NORMAL</v11:productOffering>
                            <!--1 or more repetitions:-->
                            <v11:paymentInfo>
                               <v11:method>1</v11:method>
                               <v11:amount>110000</v11:amount>
                               <v11:taxAmount>0</v11:taxAmount>
                               <v11:authID date="2020-10-27T12:05:10-05:00" user="SICACOM"></v11:authID>
                            </v11:paymentInfo>
                            <v11:refund code="" reason="">bella gero et</v11:refund>
                         </v11:item>
                      </v11:items>
                   </v11:confirmOrderPaymentRequest>
                </soapenv:Body>
             </soapenv:Envelope>`, 'SOAP', 'http://100.126.21.189:7777/PaymentService/V1.0')
                break;
              case 'ReversePaymentsvtas':
                response =await this.getService(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://www.amx.com/CO/Schema/ClaroHeaders/v1" xmlns:v11="http://www.amx.com/Schema/Operation/ReversePaymentsvtas/V1.0">
                <soapenv:Header>
                   <v1:headerRequest>
                      <!--Optional:-->
                      <v1:transactionId/>
                      <!--Optional:-->
                      <v1:system>App</v1:system>
                      <!--Optional:-->
                      <v1:target/>
                      <!--Optional:-->
                      <v1:user/>
                      <!--Optional:-->
                      <v1:password/>
                      <v1:requestDate>2020-09-06T06:10:10-05:00</v1:requestDate>
                      <!--Optional:-->
                      <v1:ipApplication/>
                      <!--Optional:-->
                      <v1:traceabilityId/>
                   </v1:headerRequest>
                </soapenv:Header>
                <soapenv:Body>
                   <v11:reversePaymentsvtasRequest>
                      <!--Optional:-->
                      <v11:transactionID/>
                      <v11:reversionTarget>ORD00003726</v11:reversionTarget>
                      <!--Optional:-->
                      <v11:receptionDate>2020-10-27T12:14:10-05:00</v11:receptionDate>
                      <!--Optional:-->
                      <v11:externalReferenceId/>
                      <!--Optional:-->
                      <v11:companyId/>
                      <!--Optional:-->
                      <v11:paymentReference>ORD00003726</v11:paymentReference>
                      <!--Optional:-->
                      <v11:amount>110000</v11:amount>
                      <!--Optional:-->
                      <v11:method>1</v11:method>
                   </v11:reversePaymentsvtasRequest>
                </soapenv:Body>
             </soapenv:Envelope>`, 'SOAP', 'http://100.126.21.189:7777/PaymentService/V1.0');
                break;
              default:
                break;
            }
            break;
          case 'PaymentServiceOrderV1.0':
            switch (consultRequest.metodo) {
              case 'VerifyOrderPayment':
                break;
              default:
                break;
            }
            break;
          case 'MSCustomeBridgeTableOP':
            switch (consultRequest.metodo) {
              case 'Consult':
                switch(consultRequest.ambiente){
                  case 'dev':
                    response = await this.getService("curl --location 'http://mscustomebridgetableop-nm-salesforce-sales-dev.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 8462980503615aa6d3733c266e4ab513=3b07e30c13a26b68abeef69eb92a5b23'", "curl", "http://mscustomebridgetableop-nm-salesforce-sales-dev.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12");
                  break;
                  case 'qa':
                    response = await this.getService("curl --location 'http://mscustomebridgetableop-nm-salesforce-sales-qa.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 8462980503615aa6d3733c266e4ab513=3b07e30c13a26b68abeef69eb92a5b23'", "curl", "http://mscustomebridgetableop-nm-salesforce-sales-qa.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12");
                  break;
                  case 'prod':
                    response = await this.getService("curl --location 'http://mscustomebridgetableop-nm-salesforce-sales-prod.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12' \
                    --header 'accept: application/json' \
                    --header 'Content-Type: application/json' \
                    --header 'Cookie: 8462980503615aa6d3733c266e4ab513=3b07e30c13a26b68abeef69eb92a5b23'", "curl", "http://mscustomebridgetableop-nm-salesforce-sales-prod.apps.claro.co/MS/CUS/CustomerAccount/RSCustomeBridgeTableOP/V1/Consult?tipoConsulta=13&datoBusqueda=12");
                    break;
                }
                break;
              default:
                break;
            }
            break;
          case 'mscustomebridgetabcloud':
            switch (consultRequest.metodo) {
              case 'Consult':
                switch(consultRequest.ambiente){
                  case 'dev':
                      response = await this.getService("curl --location 'http://mscustomebridgetabcloud-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?datoBusqueda=0017800000GHJxcAAH' \
                      --header 'Cookie: f46e840f28d4786aa7d60cd1c464dffd=1ef1af7a350a2046ed8cdc6c926352c0'", "curl", "http://mscustomebridgetabcloud-nm-salesforce-sales-dev.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?datoBusqueda=0017800000GHJxcAAH");
                    break;
                  case 'qa':
                    response = await this.getService("curl --location 'http://mscustomebridgetabcloud-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?tipoConsulta=1&datoBusqueda=0017800000GHJxcAAH' \
                      --header 'Cookie: f46e840f28d4786aa7d60cd1c464dffd=1ef1af7a350a2046ed8cdc6c926352c0'", "curl", "http://mscustomebridgetabcloud-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?tipoConsulta=1&datoBusqueda=0017800000GHJxcAAH");
                    break;
                    case 'prod':
                      response = await this.getService("curl --location 'http://mscustomebridgetabcloud-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?tipoConsulta=1&datoBusqueda=0017800000GHJxcAAH' \
                      --header 'Cookie: f46e840f28d4786aa7d60cd1c464dffd=1ef1af7a350a2046ed8cdc6c926352c0'", "curl", "http://mscustomebridgetabcloud-nm-salesforce-sales-prod.apps.t7bm85w2.eastus2.aroapp.io/MS/SVC/Service/MsCustomeBridGetabCloud/V1/Consult?tipoConsulta=1&datoBusqueda=0017800000GHJxcAAH");
                    break;  
                }
                break;
              default:
                break;
            }
            break;
          default:
            break;
      }

      return new ApiResponseDto(processTime.end(), response);

    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      return new ApiResponseDto(
        SERVICE_UNAVAILABLE,
        "1",
      );
    }
  }


  async getService(curlCommand: any, tipo: any, url: any): Promise<any> {
     // Analizar el comando Curl para extraer la URL, encabezados, método, datos, etc.
     
    let data = {
      curl: curlCommand,
      tipo : tipo,
      url : url,
    }
     // Construir el objeto de configuración para Axios
     const axiosConfig: AxiosRequestConfig = {
       method:  'POST', // Método predeterminado es GET
       url: "http://puente-nm-salesforce-sales-qa.apps.r05oof71.eastus2.aroapp.io/MS/SVC/Service/ServiceTemplateNestJS/V1/NewContract",
        // url: "http://localhost:3000/MS/SVC/Service/ServiceTemplateNestJS/V1/NewContract",
       headers:  {},
       data: data,
     };
     console.log(axiosConfig);
     try {
       const response = await axios(axiosConfig);
       this.logger.log(`Consumo exitoso`, {
         request: response.data,
       });
       return response.data;
     } catch (error) {
       this.logger.error(`Error en la solicitud`, {
         request: error.response?.data,
       });
       throw error; 
     }
  }







}
