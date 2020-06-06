import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/Component/dialog.component';
import { Grid, Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { DialogEnum } from '@shared/Enum/dialog.enum';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  template:
 `<button mat-raised-button (click)="grid.createDialog()"
   style="background-color: #534B62;
        color: #D0BCD5;
        font-size: 1em;">新增</button>
  <table
  mat-table
  matSort matSortActive="{{grid.sort.active}}"
  matSortDirection="{{grid.sort.direction}}"
  [dataSource]="grid.dataSource"
  (matSortChange)="sortData($event)" >

   <!-- Maintain Column -->
   <ng-container matColumnDef="maintain">
   <th mat-header-cell *matHeaderCellDef  style="width: 20%;"></th>
   <td mat-cell *matCellDef="let element" >
    <button mat-raised-button color="accent" (click)="grid.editDialog($event)">修改</button>
    &nbsp;
    <button mat-raised-button color="warn" (click)="grid.delete($event)">刪除</button>
   </td>
   </ng-container>

   <!-- Column -->
   <ng-container *ngFor="let column of grid.columns" matColumnDef="{{column.columnDef}}">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.header }}</th>
    <td mat-cell *matCellDef="let element">{{ column.cell(element) }}</td>
   </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSizeOptions]="[5, 10, 20]" (page)="pageData($event)" showFirstLastButtons></mat-paginator>`
})
export class TableComponent implements OnInit, OnDestroy {

  entities = 'entities';

  subscription: Subscription;

  maintain$: Observable<any>;

  @Input()
  grid: Grid;

  @Output()
  initComponent: EventEmitter<TableComponent> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[];

  dialogComponent: DialogComponent;

  constructor(public dialog: MatDialog, public store: Store<any>) {}

  ngOnInit() {
    this.setSource();
    this.displayedColumns = this.columnToDisplay();
    this.initComponent.emit(this);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(DialogData: Dialog) {

    const dialogRef = this.dialog.open(DialogComponent);

    const instance = dialogRef.componentInstance;

    this.dialogComponent = instance;

    instance.ColumnArray = this.dataToSchema(DialogData.data);

    instance.DialogData = DialogData;

    switch (DialogData.method) {
        case DialogEnum.create:
        instance.confirm = this.grid.create;
        break;
        case DialogEnum.edit:
        instance.confirm = this.grid.edit;
        break;
        default:
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  dataToSchema(data: any): Column[] {
    this.grid.columns.forEach(x => {
         x.value = data[x.columnDef];
    });
    return this.grid.columns;
  }

  columnToDisplay(): string[] {
    const display = ['maintain'];
    const columnArray = this.grid.columns.map((x) => {
      return  x.columnDef;
    });
    return display.concat(columnArray);
  }

  setSource() {
    this.maintain$ = this.store.select(this.grid.tableName);
    this.subscription = this.maintain$.subscribe((x) => {
      const entitiesArray = this.objectToArray(x[this.entities]);
      this.grid.dataSource = new MatTableDataSource<any>(entitiesArray);
      this.pageNation();
    });
  }

  sortData(sort: Sort) {
      console.log(sort.active);
      console.log(sort.direction);
  }

  pageData(page: PageEvent) {
    console.log(page);
  }

  pageNation() {
    this.grid.dataSource.sort = this.sort;
    this.grid.dataSource.paginator = this.paginator;
  }

  objectToArray(obj) {

    const size = this.getObjectSize(obj);

    const array = [];

    for (let i = 1; i <= size; i++) {
      array.push(obj[i]);
    }

    return array;
  }

  getObjectSize(obj) {

    let size = 0;

    let key;

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }

}
