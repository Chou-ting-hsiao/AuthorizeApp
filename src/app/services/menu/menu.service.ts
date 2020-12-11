import { Injectable } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { TableEnum } from '@shared/Enum/table.enum';
import { OpenDB, GetAll, TableAdd, TableUpdate, TableDelete } from '@shared/Dexie/authorize.dexie';
import { Observable } from 'rxjs';
import Dexie from 'dexie';
import { RoleService } from '@services/role/role.service';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private db: Promise<Dexie>;

  constructor(private roleService: RoleService,
              private groupService: GroupService,
              private programService: ProgramService) {
      this.db = OpenDB();
  }

  getAll(): Observable<Menu[]> {
    return new Observable(subscriber => {

        GetAll(this.db, TableEnum.Menus).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });

    });
  }

  getByAuth(menu: Menu[]): Observable<Menu[]> {

    return new Observable(subscriber => {

      this.programService.getByAuth().subscribe((Programs) => {

        const AuthProgramMap = Programs.map(x => x.id);

        const AuthMenu: Menu[] = menu.filter( x => x.program === '' || AuthProgramMap.includes(x.program));

        AuthMenu.forEach(x => {
          const program = Programs.find(y => y.id === x.program);
          x.linkTag = program ? program.linkTag : '/';
        });

        subscriber.next(AuthMenu);
        subscriber.complete();

      });

    });

  }

  create(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      if (!menu.program) {
        menu.program = '';
      }

      TableAdd(this.db, TableEnum.Menus, menu).then(() => {
        GetAll(this.db, TableEnum.Menus).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  update(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      TableUpdate(this.db, TableEnum.Menus, menu.id, menu).then(() => {
        GetAll(this.db, TableEnum.Menus).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

  delete(menu: Menu): Observable<Menu[]> {
    return new Observable(subscriber => {

      TableDelete(this.db, TableEnum.Menus, menu.id).then(() => {
        GetAll(this.db, TableEnum.Menus).then(x => {
          subscriber.next(x);
          subscriber.complete();
        });
      });

    });
  }

}
