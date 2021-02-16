import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'BGVQdyPTzjXIm3IOmxEMVEoMPNOOCcEX';
  private _historial: string[] = [];

  get historial() {    
    return [...this._historial];
  }

  buscarGifs( query:string ) {
    query = query.trim().toLocaleLowerCase();
    if( !this.historial.includes(query)) {      
      this._historial.unshift(query);
      this._historial  = this.historial.splice(0,10);
    }    
    console.log(this._historial);
    
  }


}
