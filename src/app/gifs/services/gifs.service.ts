import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
    private apiKey: string = 'ZFeqVgAni3zshsBhbJ7qoCkkpt0Z4DVt';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    private _historial: string[] = [];

    public resultados: Gif[] = [];

    get historial() {
      return [...this._historial];
    }

    constructor(private http: HttpClient) {
      if(localStorage.getItem('historial')) {
        this._historial = JSON.parse(localStorage.getItem('historial')!);
      }
      
      if(localStorage.getItem('ultimoResultado')) {
        this.resultados = JSON.parse(localStorage.getItem('ultimoResultado')!)
      }
    }


    buscarGifs(query: string): void {

      query = query.trim().toLowerCase();

        if(!this._historial.includes(query)) {
          this._historial.unshift(query);
          this._historial = this._historial.splice(0, 10)
          localStorage.setItem('historial', JSON.stringify(this._historial))
          
        }

        const params = new HttpParams()
        .set("api_key", this.apiKey)
        .set("q", query)
        .set("limit", 10);

        this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params: params })
        .subscribe((resp: SearchGifsResponse) => {
          console.log(resp);
          this.resultados = resp.data;
          localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados));
        });

        
        console.log(this._historial);


    }
}
