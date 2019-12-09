import { Component, OnInit } from '@angular/core';
import { Persona } from '../Modelo/persona';
import { PersonaService } from '../Service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[]=[];

  constructor(private personaService: PersonaService) { }

  getAll(){
    this.personaService.getAll().subscribe(
      (result: any) => {
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;

          this.personas.push(persona);
          
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
  ngOnInit() {
    this.getAll();
    
  }

}
