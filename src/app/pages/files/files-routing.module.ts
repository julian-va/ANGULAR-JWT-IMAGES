import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FilesuserComponent } from './filesuser/filesuser.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'filesUser', pathMatch: 'full' },
  {
    path: 'filesUser',
    canActivate: [AuthGuard],
    component: FilesuserComponent,
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    component: UploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
