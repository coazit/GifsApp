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

  constructor( private http: HttpClient ){}

  buscarGifs( query:string ) {
    query = query.trim().toLocaleLowerCase();
    if( !this.historial.includes(query)) {      
      this._historial.unshift(query);
      this._historial  = this.historial.splice(0,10);
    }  
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=BGVQdyPTzjXIm3IOmxEMVEoMPNOOCcEX&q=${ query }&limit=10`)
      .subscribe(( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;                
      });  
  }
}
