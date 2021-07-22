import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projects } from '../models/projects';
import { global } from './global';

@Injectable()

export class ConfigService {

	public url: string;

  constructor(

  	private _http: HttpClient

  	) { this.url = global.url;  }

  saveProjects(project: Projects): Observable<any> {

      let params = JSON.stringify(project);
      let headers = new HttpHeaders().set('Content-Type','application/json');

      return this._http.post(this.url+'save', params, {headers:headers});
  }

  getProjects():Observable<any> {

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'getProjects', {headers:headers})

  }

  getProjectById(id):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'getProjectById/'+id, {headers:headers})
  }

  deleteProject(id):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url+'delete/'+id, {headers:headers})
  }

  updateProject(Project):Observable<any>{

    let params = JSON.stringify(Project);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'update/'+Project._id, params, {headers:headers});

  }

}