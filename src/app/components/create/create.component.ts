import { Component, OnInit } from '@angular/core';
import { Projects } from '../../models/projects';
import { ConfigService } from '../../services/projects.services';
import { UploadService } from '../../services/upload.services';
import { global } from '../../services/global';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ConfigService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Projects;
  public save_projet;
  public status: string;
  public pasa: boolean;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(

    private _projectService: ConfigService,
    private _uploadService: UploadService

    ) {
        this.title = "Crear Proyecto";
        this.url = global.url;
        this.project = new Projects('','','','',2017,'','');
     }

  ngOnInit(): void {
  }

  onSubmit(form){
      if(this.formvalidation()==true){
          
        this._projectService.saveProjects(this.project).subscribe(
           response => {
               if( response.proyectos ){
                 //subir la imagen    
                   if( this.filesToUpload ){             
                       this._uploadService.makeFileRequest(this.url+"uploadImage/"+response.proyectos._id, [], this.filesToUpload, "image")
                       .then((result:any) => {

                         console.log(result);
                         this.save_projet = result.project;

                         this.status = "success";
                         form.reset();
                       });

                 }else{

                     this.save_projet = response.project;
                     this.status = "success";
                     form.reset();
                 }
                   
               }else{
                 this.status = "failed";
               }
               
           },
           error => {
              console.log(<any>error);
           }
        );

      }else{
        console.log("debe llenar los datos del formulario");
      }  
  }

  formvalidation(): any{
       this.pasa = true;

      if( this.project.name.trim() === "" ){
        this.pasa = false;
      }

      if( this.project.description.trim() === "" ){
        this.pasa = false;
      }

      if( this.project.category.trim() === "" ){
        this.pasa = false;
      }

      if( this.project.langs.trim() === "" ){
        this.pasa = false;
      }

      return this.pasa;
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  

}
