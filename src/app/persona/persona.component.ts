import { Component, OnInit } from '@angular/core';
import { Persona } from '../Modelo/persona';
import { PersonaService } from '../Service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[];
  cols: any [];

  constructor(private personaService: PersonaService) { }

  getAll(){
    this.personaService.getAll().subscribe(
      (result: any) => {
        let personas: Persona[] = [];
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          personas.push(persona);
          
        }
        this.personas = personas;
      },
      error =>{
        console.log(error);
      }
    )
  }
  ngOnInit() {
    this.getAll();
    this.cols = [
      {field: "id", header: "ID"},
      {field: "nombre", header: "Nombre"},
      {field: "apellido", header: "Apellido"},
      {field: "direccion", header: "Direccion"},
      {field: "telefono", header: "Telefono"},
    ];
    
  }

}
