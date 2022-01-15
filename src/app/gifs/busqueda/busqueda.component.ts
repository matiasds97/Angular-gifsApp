import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent  {

  //non null assertion operator, indica que el elemento siempre va a existir.
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(termino: string): void {
    if (termino.trim().length === 0)
      return;
    this.txtBuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(termino);
  }
}
