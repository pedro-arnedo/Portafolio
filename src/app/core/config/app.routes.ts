import { Routes } from '@angular/router';
import { Body } from '../../layout/body/body';
import { About } from '../../features/about/about';
import { Experience } from '../../features/experience/experience';
import { Project } from '../../features/project/project';
import { Service } from '../../features/service/service';
import { Stack } from '../../features/stack/stack';
import { Contact } from '../../features/contact/contact';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Body, data: { title: 'Inicio' } },
    { path: 'about', component: About, data: { title: 'Perfil' } },
    { path: 'experience', component: Experience, data: { title: 'Experiencia' } },
    { path: 'project', component: Project, data: { title: 'Proyectos' } },
    { path: 'service', component: Service, data: { title: 'Servicios' } },
    { path: 'stack', component: Stack, data: { title: 'Stack' } },
    { path: 'contact', component: Contact, data: { title: 'Contacto' } },
    { path: '**', redirectTo: 'home' }
];