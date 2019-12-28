import { Component, OnInit } from '@angular/core';
import { Persona } from '../Modelo/persona';
import { PersonaService } from '../Service/persona.service';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Command } from 'protractor';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[];
  cols: any [];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
  persona: Persona = {
    id: null,
    nombre: null,
    apellido: null,
    direccion: null,
    telefono: null
  };

  selectedPersona: Persona = {
    id: null,
    nombre: null,
    apellido: null,
    direccion: null,
    telefono: null
  };

  constructor(private personaService: PersonaService, private messageService: MessageService, private confirmService: ConfirmationService) { }

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
  showSaveDialog(editar: boolean){
    if(editar){
      if(this.selectedPersona != null && this.selectedPersona.id != null){
        this.persona = this.selectedPersona;
      }else{
        this.messageService.add({severity: 'warn', summary: "Advertencia", detail: "Seleccione un registro"})
        return;
      }
      
    }else{
      this.persona = new Persona();
    }
    this.displaySaveDialog = true;

  }

  save(){
    this.personaService.save(this.persona).subscribe(
      (result:any) =>{
        let persona = result as Persona;
        this.validarPersona(persona);
        this.messageService.add({severity: 'success', summary: "Resultado", detail: "Se guardo correctamente. "});
        this.displaySaveDialog = false;
      },
      error=>{
        console.log(error);
      }
    );
  }
  
  delete(){
    if(this.selectedPersona == null || this.selectedPersona.id == null){
      this.messageService.add({severity: 'warn', summary: "Advertencia", detail: "Seleccione un registro"})
      return;
    }
    this.confirmService.confirm({
      message: "¿Esta seguro que desea eliminar el registro?",
      accept: () =>{
        this.personaService.delete(this.selectedPersona.id).subscribe(
          (result:any) =>{
            this.messageService.add({severity: 'success', summary: "Resultado", detail: "Se elimino la persona con id" + result.id+"correctamente"}); 
            this.deleteObject(result.id);
          }
        )
      }
    })

  }

  deleteObject(id: number){
    let index = this.personas.findIndex((e) => e.id == id);
    if(index != -1){
      this.personas.splice(index, 1);
    }
  }

  validarPersona(persona: Persona){

    let index = this.personas.findIndex((e) => e.id==persona.id);
    if(index != -1){
      this.personas[index] = persona;
    }else{
      this.personas.push(persona);
    }
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
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: ()=> this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: ()=> this.showSaveDialog(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-times",
        command: ()=> this.delete()
      }
    ]
    
  }

}
