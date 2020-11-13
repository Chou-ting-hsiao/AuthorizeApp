import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@shared/Guard/LoginGuard';
import { AuthGuard } from '@shared/Guard/AuthGuard';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

const routes: Routes = [
  {  path: '',   redirectTo: '/Main', pathMatch: 'full'  },
  {  path: 'Login', component: LoginComponent  },
  {  path: '401', component: UnauthorizeComponent  },
  {  path: 'Main', component: MainComponent, canActivate: [LoginGuard],
    children: [
          {  path: 'User', component: UserComponent, canActivate: [AuthGuard] },
          {  path: 'Role', component: RoleComponent, canActivate: [AuthGuard]  },
          {  path: 'Group', component: GroupComponent, canActivate: [AuthGuard]  },
          {  path: 'Program', component: ProgramComponent, canActivate: [AuthGuard]  },
          {  path: 'Menu', component: MenuComponent, canActivate: [AuthGuard]  },
          {  path: '**', redirectTo: '/Main'  }
    ]
  },
  {  path: '**', redirectTo: '/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
