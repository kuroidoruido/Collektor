import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionModule, CollectionPageComponent } from './collection';
import {
    CollectionCreationModule,
    CollectionCreationPageComponent,
} from './collection-creation';
import { ItemCreationModule, ItemCreationPageComponent } from './item-creation';
import { ItemEditionModule, ItemEditionPageComponent } from './item-edition';
import { HomeModule, HomePageComponent } from './home';
import { EnsureLoginGuard, LoginModule, LoginPageComponent } from './login';
import { NotFoundModule, NotFoundPageComponent } from './not-found';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        canActivate: [EnsureLoginGuard],
        component: HomePageComponent,
    },
    {
        path: 'collection/new',
        canActivate: [EnsureLoginGuard],
        component: CollectionCreationPageComponent,
        pathMatch: 'full',
    },
    {
        path: 'collection/:id',
        canActivate: [EnsureLoginGuard],
        component: CollectionPageComponent,
    },
    {
        path: 'item/new/:collectionId',
        canActivate: [EnsureLoginGuard],
        component: ItemCreationPageComponent,
        pathMatch: 'full',
    },
    {
        path: 'item/:id',
        canActivate: [EnsureLoginGuard],
        component: ItemEditionPageComponent,
    },

    { path: 'login', component: LoginPageComponent },

    { path: '**', component: NotFoundPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HomeModule,
        CollectionModule,
        CollectionCreationModule,
        ItemCreationModule,
        ItemEditionModule,
        LoginModule,
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
