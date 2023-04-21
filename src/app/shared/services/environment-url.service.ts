import { Injectable } from '@angular/core';
import { environment } from './../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  urlAddress: string = environment.urlAddress;
  constructor() { }
}
