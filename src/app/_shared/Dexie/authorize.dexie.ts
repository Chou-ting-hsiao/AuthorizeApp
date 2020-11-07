import { Subscriber } from 'rxjs';
import Dexie from 'dexie';

function OpenDB(): Promise<Dexie> {
    const AuthorizeDb = new Dexie('Authorize');

    AuthorizeDb.version(1).stores({
      Groups: '++id, name, role',
      Menus: '++id, name, program',
      Programs: '++id, name, remark, linkTag, auth',
      Roles: '++id, name, remark',
      Users: '++id, name, password, role'
    });

    return AuthorizeDb.open();
}

function TableInit(db: Promise<Dexie>, table: string, data: any[]): Promise<void> {
  return  db.then(x => {
            return x.table(table).count();
        }).then(x => {
            if (x < 1) {
                db.then( y => {
                    y.table(table).bulkAdd(data).then((lastKey) => {
                        console.log(lastKey);
                    }).catch(Dexie.BulkError, (e) => {
                        console.error('bulkAdd did not succeed.');
                    });
                });
            }
        });
}

function GetAll(db: Promise<Dexie>, table: string, subscriber: Subscriber<any>) {
    db.then( x => {
        x.table(table).toArray().then((y) => {
          subscriber.next(y);
          subscriber.complete();
        });
    });
}

function TableAdd(db: Promise<Dexie>, table: string, data: any): Promise<void> {
    return  db.then(x => {
              return x.table(table).count();
            }).then(x => {

                data.id = (x + 1).toString();

                db.then( y => {
                    y.table(table).add(data).then((lastKey) => {
                        console.log(lastKey);
                    }).catch(Dexie.BulkError, (e) => {
                        console.error('add not succeed.');
                    });
                });

            });
}

function TableUpdate(db: Promise<Dexie>, table: string, id: string, data: any): Promise<void> {
    return  db.then( x => {
        x.table(table).update(id, data).then((lastKey) => {
          console.log(lastKey);
        }).catch(Dexie.BulkError, (e) => {
          console.error('add not succeed.');
        });
    });
}

function TableDelete(db: Promise<Dexie>, table: string, id: string): Promise<void> {
    return  db.then( x => {
        x.table(table).delete(id).then((lastKey) => {
          console.log(lastKey);
        }).catch(Dexie.BulkError, (e) => {
          console.error('add not succeed.');
        });
    });
}

export { OpenDB, GetAll, TableInit, TableAdd, TableUpdate, TableDelete };
