import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { GroupComponent } from './group.component';

import { TableComponent } from '@shared/Component/table/table.component';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';

import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { StoreModule } from '@ngrx/store';

import { ROOT_REDUCER } from '@shared/Ngrx/Reducer/root.reducer';

import { of } from 'rxjs';

import { RoleService } from '@services/role/role.service';

import { Roles } from '@shared/Dexie/data';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(ROOT_REDUCER),
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule
      ],
      declarations: [
        GroupComponent,
        TableComponent
      ],
      providers: [
        {
          provide: RoleService, useValue: {
            getAll: () => of ( Roles )
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
