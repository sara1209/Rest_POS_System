import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./features/tables/tables').then(m => m.Tables)
      },
      {
        path: 'tables/:id',
        loadComponent: () =>
          import('./features/tables/table-detail/table-detail.component').then(m => m.TableDetail)
      },
      {
        path: 'parcel',
        loadComponent: () =>
          import('./features/tables/table-detail/table-detail.component').then(m => m.TableDetail)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders').then(m => m.Orders)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
