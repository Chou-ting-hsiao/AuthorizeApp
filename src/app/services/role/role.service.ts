import { Injectable } from '@angular/core';
import { Role } from '@shared/Model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  TableName = 'Roles';

  Roles: Role[] = [
    { id: '1', name: 'ADMIN', remark: '管理員' },
    { id: '2', name: 'USER', remark: '一般使用者' }
  ];

  constructor() { }

  getAll(): Role[] {

    if (localStorage.getItem(this.TableName)) {
      return JSON.parse(localStorage.getItem(this.TableName));
    }

    localStorage.setItem(this.TableName, JSON.stringify(this.Roles));

    return JSON.parse(localStorage.getItem(this.TableName));
  }
}