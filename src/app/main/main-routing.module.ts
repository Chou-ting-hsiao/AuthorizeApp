import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@utility/LoginGuard';
import { AuthGuard } from '@utility/AuthGuard';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { ProgramComponent } from './program/program.component';
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