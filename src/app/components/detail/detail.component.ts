import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/projects.services';
import { Projects } from '../../models/projects';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ConfigService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public project: any;

  constructor(
      private _projectService: ConfigService,
      private _router: Router,
      private _route: ActivatedRoute
    ) { 

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

  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
        response => {
          if( response.project ){
            this._router.navigate(['/projects']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
  }

}
