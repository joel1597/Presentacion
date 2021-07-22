import { Component, OnInit } from '@angular/core';
import { Projects } from '../../models/projects';
import { ConfigService } from '../../services/projects.services';
import { UploadService } from '../../services/upload.services';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create//create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ConfigService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: any;
  public save_projet;
  public status: string;  
  public url: string;
  public filesToUpload: Array<File>;

  constructor(
      private _projectService: ConfigService,
      private _uploadService: UploadService,
      private _router: Router,
      private _route: ActivatedRoute
    ) 
    {
        this.title = "Editar Proyecto";
        this.url = global.url;
        this.project = Projects;        
     }

  ngOnInit(): void {

    this._route.params.subscribe(params => {

       let id = params.id;

       this.getProjectById(id);
     });
  }

  getProjectById(id){

    this._projectService.getProjectById(id).subscribe(
        response => {          
          this.project = response.Proyecto;          
        },
        error => {
           console.log(<any>error);
        }
      );
  }

  onSubmit(form){

    this._projectService.updateProject(this.project).subscribe(

        response => {

          if( response.project ){
             //subir la imagen
             if( this.filesToUpload ){

                 this._uploadService.makeFileRequest(this.url+"uploadImage/"+response.project._id, [], this.filesToUpload, "image")
                 .then((result:any) => {
                   console.log(result);
                   this.save_projet = result.project;
                   this.status = "success";
                 
                 });

             }else{
                   this.save_projet = response.project;
                   this.status = "success";
             }                 
             
                 
          }else{
            this.status = "failed";
          }

        },
        error => {
          console.log(<any>error);
        }

      );

  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }



}
