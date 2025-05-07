import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { VehicleDeleteComponent } from './vehicle/vehicle-delete/vehicle-delete.component';
import { SidebarComponent } from './sidebar/sidebar.component';



export const routes: Routes = [
{
    path: '',
    component:SidebarComponent,
    children:[ { path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' },
        {
           path:'home',
            component:HomeComponent
        },
        {
            path:'vehicle-list',
            component:VehicleListComponent
        },
        {
            path:'vehicle-details',
            component:VehicleDetailsComponent
        },
        {
            path:'vehicle-add',
            component:VehicleAddComponent
        },
        {
        path:'vehicle-delete',
        component:VehicleDeleteComponent
        }
    ]

}

];
