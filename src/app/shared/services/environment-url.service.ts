import { Injectable } from '@angular/core';
import { environment } from './../../../enviroments/enviroment.prod';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  urlAddress: string = environment.urlAddress;
  constructor() { }
}
