import { Component, OnInit } from '@angular/core';
import { Projects } from '../../models/projects';
import { ConfigService } from '../../services/projects.services';
import { global } from '../../services/global'; 

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ConfigService]
})
export class ProjectsComponent implements OnInit {

  public projects: Projects[];
  public url: string;

  constructor(
      private _projectService: ConfigService
    ) { this.url = global.url; }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if( response.projects ){
          this.projects = response.projects;
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }

    );
  }

}
