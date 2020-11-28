import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '@shared/Component/table/table.component';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { TableEnum } from '@shared/Enum/table.enum';
import { Grid } from '@shared/Model/table.model';
import { Role } from '@shared/Model/role.model';
import { Group } from '@shared/Model/group.model';
import { RoleService } from '@services/role/role.service';
import { Read, Create, Edit, Delete} from '@shared/ngrx/Actions/maintain.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  tableComponent: TableComponent;

  myGrid: Observable<Grid>;

  constructor(private store: Store<any>,
              private roleService: RoleService) { }

  ngOnInit() {

    this.roleService.getAll().subscribe((roles) => {
      this.loadGrid(roles);
    });

  }

  loadGrid(roles: Role[]) {

    this.myGrid = new Observable(subscriber => {

      const grid = {
        tableName: TableEnum.Groups,
        sort: { active: 'id', direction: 'asc' },
        columns: [
          {
            header: 'Id',
            columnDef: 'id',
            type: ColumnEnum.string,
            selector: ColumnEnum.label,
            visible: false,
            cell: (element: Group) => `${ element.id }`
          },
          {
            header: 'Name',
            columnDef: 'name',
            type: ColumnEnum.string,
            selector: ColumnEnum.input,
            cell: (element: Group) => `${ element.name }`
          },
          {
            header: 'Role',
            columnDef: 'role',
            type: ColumnEnum.string,
            selector: ColumnEnum.multiselect,
            source: (): Observable<any> => {

              this.store.dispatch( new Read<Role>(TableEnum.Roles) );

              return this.store.select(TableEnum.Roles);
            },
            cell: (element: Group) => `${
              element.role.map(x => {
                const role = roles.filter(y => y.id === x)[0];
                return  role ? role.name : '';
              }).join(',')
            }`
          },
        ],
        read: (): Observable<any> => {

          this.store.dispatch( new Read<Group>(TableEnum.Groups) );

          return this.store.select(TableEnum.Groups);

        },
        create: (): void => {

            this.tableComponent.openDialog({
              title: '新增頁面',
              button: [DialogEnum.btnCreate, DialogEnum.btnCancel],
              method: DialogEnum.create,
              confirm: () => {
                this.store.dispatch( new Create<Group>(
                  TableEnum.Groups,
                  [],
                  this.tableComponent.dialogComponent.getData() as Group)
                );
              }
            });

        },
        edit: (element: Group): void => {

          this.tableComponent.openDialog({
            title: '修改頁面',
            button: [DialogEnum.btnEdit, DialogEnum.btnCancel],
            method: DialogEnum.edit,
            data: element,
            confirm: () => {
              this.store.dispatch(
                new Edit<Group>(
                  TableEnum.Groups,
                  [],
                  this.tableComponent.dialogComponent.getData() as Group
                )
              );
            }
          });

        },
        delete: (element: Group): void => {

          const isCanDelete = confirm('Are you sure you want to delete this?');

          if (isCanDelete) {

            this.store.dispatch(
              new Delete<Group>(
                TableEnum.Groups,
                [],
                element
              )
            );

          }

        }
      };

      subscriber.next(grid);

      subscriber.complete();

    });

  }

  initComponentHandler(component: TableComponent) {

    this.tableComponent = component;

  }

}
