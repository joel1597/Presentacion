//importar routermodule y routes
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

//importando los componentes
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

//Definir las rutas que iran en una constante

const routes: Routes = [

	{ path: '', component: AboutComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'create', component: CreateComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'getProject/:id', component: DetailComponent },
	{ path: 'editProject/:id', component: EditComponent }

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);