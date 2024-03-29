import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
        }, {
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        }, {
            path: 'forms',
            loadChildren: './forms/forms.module#Forms'
        }, {
            path: 'tables',
            loadChildren: './tables/tables.module#TablesModule'
        }, {
            path: 'maps',
            loadChildren: './maps/maps.module#MapsModule'
        }, {
            path: 'widgets',
            loadChildren: './widgets/widgets.module#WidgetsModule'
        }, {
            path: 'charts',
            loadChildren: './charts/charts.module#ChartsModule'
        }, {
            path: 'calendar',
            loadChildren: './calendar/calendar.module#CalendarModule'
        }, {
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        }, {
            path: '',
            loadChildren: './timeline/timeline.module#TimelineModule'
        },{
              path: '',
              loadChildren: './home/home.module#HomeModule'
        },{
              path: 'quanlynguoidung',
              loadChildren: './quanlynguoidung/quan-ly-nguoi-dung.module#QuanLyNguoiDungModule'
          },{
              path: 'quanlybacsi',
              loadChildren: './quanlygiangvien/giangvien.module#GiangVienModule'
          },{
              path: 'qlmonhocphancong',
              loadChildren: './quanlymonhoc-phancong/monhocphancong.modul#MonhocphancongModul'
          },
          {
              path: 'gioi-thieu',
              loadChildren: './quanlymonhoc-phancong/monhocphancong.modul#MonhocphancongModul'
          },
          {
              path: 'thongke',
              loadChildren: './Thong-Ke/thong-ke.modul#ThongKeModul'
          },{
              path: 'thong-tin-bac-si',
              loadChildren: './quanlygiangvien/giangvien.module#GiangVienModule'
          }
          ,
          {
              path: 'tin-tuc',
              loadChildren: './Thong-Ke/thong-ke.modul#ThongKeModul'
          }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
