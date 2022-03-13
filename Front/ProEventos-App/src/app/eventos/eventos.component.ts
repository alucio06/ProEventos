import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltered: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImages = true;
  filterKeyword: string = '';

  filterEvents() : any {
    let filterBy = this.filterKeyword.toLowerCase();
    this.eventosFiltered = this.eventos.filter(
      ( evento: { tema: string; local:string; }) =>
          evento.tema.toLowerCase().startsWith(filterBy) ||
          evento.local.toLowerCase().startsWith(filterBy)
    );
  }

  // public get filterList(): string {
  //   return this._filterKeyword;
  // }

  // public set filterList(value: string) {
  //   this._filterKeyword = value;
  //   this.eventos = this.filterList ? this.filterEvents(this.filterList): this.eventos;
  // }

  // filterEvents(filterBy: string): any {
  //   filterBy : filterBy.toLocaleLowerCase();
  //   return this.eventos.filter(
  //     ( evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1
  //   )
  // }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltered = response
      },
      error => console.log(error)
    );
  }

  toggleImagesVisibilty() : void {
    this.showImages = !this.showImages;
  }

}
