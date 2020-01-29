import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/Model/user.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { Program } from '@shared/Model/program.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Account: string;
  Password: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.Account = 'ADMIN';
    this.Password = 'ADMIN';
  }

  Login() {
    if (this.Account === 'ADMIN' && this.Password === 'ADMIN' ) {
        alert('登入成功');
        localStorage.setItem('Auth', 'Admin');
        localStorage.setItem('Users', JSON.stringify(Users));
        localStorage.setItem('Roles', JSON.stringify(Roles));
        localStorage.setItem('Groups', JSON.stringify(Groups));
        localStorage.setItem('Programs', JSON.stringify(Programs));
        this.router.navigate(['/Main']);
        return;
    }
    localStorage.setItem('Auth', '');
    alert('登入失敗' + this.Account + this.Password);
  }

}

const Users: User[] = [
  { id: '1', name: 'ADMIN', password: 'ADMIN' },
  { id: '2', name: 'USER', password: 'USER' }
];

const Roles: Role[] = [
  { id: '1', name: 'ADMIN', remark: '管理員' },
  { id: '2', name: 'USER', remark: '一般使用者' }
];

const Groups: Group[] = [
  { id: '1', name: 'ADMIN', remark: '管理員群組' }
];

const Programs: Program[] = [
  { id: '1', name: 'User', remark: '使用者', auth: '' },
  { id: '2', name: 'Role', remark: '角色', auth: 'ADMIN' },
  { id: '3', name: 'Group', remark: '群組', auth: 'ADMIN' },
  { id: '4', name: 'Program', remark: '程式', auth: 'ADMIN' },
];
