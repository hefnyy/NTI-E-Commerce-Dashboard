import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authenaticationGuard } from './guards/authenatications.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'Home',canActivate:[authenaticationGuard],loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),},
  { path: 'categories', title: 'Categories', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'create', title: 'Create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: ':id', title: 'Update Category', loadComponent: () => import('./update-category/update-category.component').then(m => m.UpdateCategoryComponent) }
    ]
  },
  {
    path: 'subcategories', title: 'Subcategories', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'Create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
      { path: ':id', title: 'Update Subcategory', loadComponent: () => import('./update-subcategory/update-subcategory.component').then(m => m.UpdateSubcategoryComponent) }
    ]
  },
  { path: 'products', title: 'Products', canActivate: [authenaticationGuard], loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'users', title: 'Users', canActivate: [authenaticationGuard,rolesGuard], loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'forgetmypassword', title: 'Forget Password', loadComponent: () => import('./forgetmypassword/forgetmypassword.component').then(m => m.ForgetmypasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotfoundComponent },

];
