import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesuserComponent } from './filesuser/filesuser.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [FilesuserComponent, UploadComponent],
  imports: [CommonModule, FilesRoutingModule, MaterialModule],
})
export class FilesModule {}
