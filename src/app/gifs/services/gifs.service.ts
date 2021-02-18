import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'BGVQdyPTzjXIm3IOmxEMVEoMPNOOCcEX';
  private _historial: string[] = [];

  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif [] = [];

  get historial() {    
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];  
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];   
  }

  buscarGifs( query:string ) {
    query = query.trim().toLocaleLowerCase();
    if( !this.historial.includes(query)) {      
      this._historial.unshift(query);
      this._historial  = this.historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));      
    }  
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=BGVQdyPTzjXIm3IOmxEMVEoMPNOOCcEX&q=${ query }&limit=10`)
      .subscribe(( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));                
      });  
  }
}
