import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecordComponent } from './components/add-record/add-record.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';
import { RecordListComponent } from './components/record-list/record-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'records',
    pathMatch: 'full',
  },
  {
    path: 'records',
    component: RecordListComponent,
  },
  {
    path: 'records/:id',
    component: RecordDetailComponent,
  },
  {
    path: 'add',
    component: AddRecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
