import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DescriptionComponent } from './description/description.component';

export const routes: Routes = [
    {path:'',redirectTo:'jobs',pathMatch:'full'},
    {path:'jobs',component:JobsComponent},
    {path:'fav',component:FavoritesComponent},
    {path:'desc/:id',component:DescriptionComponent},
    {path:'**',component:JobsComponent}
];
