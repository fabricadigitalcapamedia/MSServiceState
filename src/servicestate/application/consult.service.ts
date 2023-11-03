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
                break;
              case 'cambioTitularidad':
                break;
              case 'bdoPositivo':
                break;
              case 'bdaPositivo':
                break;
              case 'RegistroImei':
                break;
              default:
                break;
            }
            break;
          case 'AddressV2.1':
            switch (consultRequest.metodo) {
              case 'consultaDireccionGeneral':
                break;
              case 'consultaDireccion':
                break;
              case 'construirDireccionHhpp':
                break;
              case 'obtenerConfiguracionComponenteDireccion':
                break;
              case 'obtenerBarrioListHhpp':
                break;
              default:
                break;
            }
            break;
          case 'WSIMEIDualSIM':
            switch (consultRequest.metodo) {
              case 'ConsultaIMEIDualSIM':
                break;
              default:
                break;
            }
            break;
          case 'UnifiedListsV1.0':
            switch (consultRequest.metodo) {
              case 'UnifiedLists':
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
                break;
              default:
                break;
            }
            break;
          case 'msnotificationcuschannel':
            switch (consultRequest.metodo) {
              case 'V1':
                break;
              default:
                break;
            }
            break;
          case 'msdcpoffeschedul':
            switch (consultRequest.metodo) {
              case 'queryOrderSchedule':
                break;
              case 'ProductListPromise':
                break;
              default:
                break;
            }
            break;
          case 'mscustomerorderdelivery':
            switch (consultRequest.metodo) {
              case 'order':
                break;
              default:
                break;
            }
            break;
          case 'mscustomerordershipmentoms':
            switch (consultRequest.metodo) {
              case 'reject':
                break;
              case 'confirm':
                break;
              case 'modify':
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
                break;
              default:
                break;
            }
            break;
          case 'PostSaleInspODSV1.0':
            switch (consultRequest.metodo) {
              case 'GetODS':
                break;
              case 'UpdateODS':
                break;
              case 'CreateODS':
                break;
              default:
                break;
            }
            break;
          case 'PaymentServiceV1.0':
            switch (consultRequest.metodo) {
              case 'GetOrderPayment':
                break;
              case 'ConfirmOrderPayment':
                break;
              case 'ReversePaymentsvtas':
                break;
              case 'VerifyOrderPayment':
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
