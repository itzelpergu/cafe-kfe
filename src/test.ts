//Este archivo es requerido por karma.conf.js y carga recursivamente todos los archivos .spec y framework

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;


// inicializa el entorno de prueba de angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Encuentra las pruebas
const context = require.context('./', true, /\.spec\.ts$/);
// Carga los modulos
context.keys().map(context);
