import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'addPost', component: AddPostComponent },
    { path: 'posts/:postId', component: PostComponent },
    { path: 'uploadImage', component: UploadImageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesModule { }