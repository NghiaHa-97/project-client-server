import { Routes } from '@angular/router';
import { GiangVienResolve } from './giang-vien/giangvien-resolve';
import { GiangVienUpdateComponent } from './giang-vien/giangvien-update.component';

import { GiangVienComponent } from './giang-vien/giangvien.component';
//import {FormGiangVienComponent} from './addgiangvien/form-giangvien.component';

export const GiangVienRoutes: Routes = [
   {
       path: '',
       children: [
           {
               path: 'bacsi',
               component: GiangVienComponent
           },
           {
               path: 'danh-sach',
               component: GiangVienComponent
           },
           {
               path: 'bacsi/update/:id',
               component: GiangVienUpdateComponent,
               resolve: {giangvien: GiangVienResolve}
           },
           {
               path: 'bacsi/new',
               component: GiangVienUpdateComponent
           }
       ]
    }
];
