import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authenaticationGuard } from './guards/authenatications.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { rolesGuard } from './guards/roles.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'Home',canActivate:[authenaticationGuard],loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),},
  { path: 'categories', title: 'Categories', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'create', title: 'Create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: ':id/update', title: 'Update Category', loadComponent: () => import('./update-category/update-category.component').then(m => m.UpdateCategoryComponent) }
    ]
  },
  {
    path: 'subcategories', title: 'Subcategories', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'Create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
      { path: ':id/update', title: 'Update Subcategory', loadComponent: () => import('./update-subcategory/update-subcategory.component').then(m => m.UpdateSubcategoryComponent) }
    ]
  },
  {
    path: 'products', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: 'create', title: 'Create Product', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent) },
      { path: ':id/update', title: 'Update Product', loadComponent: () => import('./update-product/update-product.component').then(m => m.UpdateProductComponent) }
    ]
  },
  {
    path: 'promocodes', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Promo Codes', loadComponent: () => import('./promocodes/promocodes.component').then(m => m.PromocodesComponent) },
      { path: 'create', title: 'Create Promo Code', loadComponent: () => import('./add-promocodes/add-promocodes.component').then(m => m.AddPromocodesComponent) },
      { path: ':id/update', title: 'Update Promo Code', loadComponent: () => import('./update-promocodes/update-promocodes.component').then(m => m.UpdatePromocodesComponent) }
    ]
  },
  {
    path: 'orders', canActivate: [authenaticationGuard],
    children: [
      { path: '', title: 'All Orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },
  {
    path: 'users', canActivate: [authenaticationGuard, rolesGuard],
    children: [
      { path: '', title: 'All Users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'create', title: 'Create User', loadComponent: () => import('./add-users/add-users.component').then(m => m.AddUsersComponent) },
      { path: ':id', title: 'User Details', loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent) }
    ]
  },
  { path: 'myprofile', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: MyprofileComponent },
  { path: 'forgetmypassword', title: 'Forget Password', loadComponent: () => import('./forgetmypassword/forgetmypassword.component').then(m => m.ForgetmypasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotfoundComponent },

];
