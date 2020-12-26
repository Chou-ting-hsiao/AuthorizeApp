import { browser, by, element, promise } from 'protractor';
import { takeScreenshot } from './utility/imageHelper';
import { waitIsVisible, waitIsVisibleToClick, waitIsPresence, waitAlertToClick } from './utility/protractorHelper';

export class AppPage {

  navigateTo() {

    return browser.get(browser.baseUrl) as Promise<any>;

  }

  loginPage() {

    const loginTitle = element(by.css('.form-title p')).getText() as Promise<string>;
    expect(loginTitle).toEqual('Auth');

    const accountInput = element(by.css('input#Account'));
    accountInput.clear();
    accountInput.sendKeys('ADMIN');

    const passwordInput = element(by.css('input#Password'));
    passwordInput.clear();
    passwordInput.sendKeys('ADMIN');

    element(by.css('input#btn_Login')).click();

    waitAlertToClick();

  }

  mainPage() {

    const navigate = element.all(by.css('button.dark-theme.mat-icon-button')).first();
    waitIsVisible(navigate);
    navigate.click();

  }

  userPage() {

    const userButton = element(by.css('a#User'));
    waitIsVisibleToClick(userButton);

    const beforeAddRange = this.getPageRange();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisibleToClick(addButton);

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST1');

    const passwordInput = element(by.css('input[placeholder="password"]'));
    passwordInput.sendKeys('TEST1');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisibleToClick(selectButton);

    const checkButton = element.all(by.css('mat-option')).get(2);
    checkButton.click();

    const dialogConfirmButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisibleToClick(dialogConfirmButton);

    this.checkTotalCount(beforeAddRange, 1);

    const editButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-accent')).last();
    waitIsVisibleToClick(editButton);

    const newName = 'TEST2';

    nameInput.clear();
    nameInput.sendKeys(newName);
    waitIsVisibleToClick(dialogConfirmButton);

    const table = element.all(by.css('app-table tbody tr')).last();
    const currentName = table.all(by.css('.mat-column-name')).first().getText();
    expect(currentName).toBe(newName);

    this.deleteMethodTest();

  }

  rolePage() {

    const roleButton = element(by.css('a#Role'));
    waitIsVisibleToClick(roleButton);

    const beforeAddRange = this.getPageRange();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisibleToClick(addButton);

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST1');

    const passwordInput = element(by.css('input[placeholder="remark"]'));
    passwordInput.sendKeys('TEST1');

    const dialogConfirmButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisibleToClick(dialogConfirmButton);

    this.checkTotalCount(beforeAddRange, 1);

    const editButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-accent')).last();
    waitIsVisibleToClick(editButton);

    const newName = 'TEST2';

    nameInput.clear();
    nameInput.sendKeys(newName);
    waitIsVisibleToClick(dialogConfirmButton);

    const table = element.all(by.css('app-table tbody tr')).last();
    const currentName = table.all(by.css('.mat-column-name')).first().getText();
    expect(currentName).toBe(newName);

    this.deleteMethodTest();

  }

  groupPage() {

    const groupButton = element(by.css('a#Group'));
    waitIsVisibleToClick(groupButton);

    const beforeAddRange = this.getPageRange();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisibleToClick(addButton);

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST1');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisibleToClick(selectButton);

    const checkButton = element.all(by.css('mat-option')).get(2);
    waitIsVisibleToClick(checkButton);

    const dialogTitle = element(by.css('.mat-dialog-title'));
    browser.actions().mouseMove(dialogTitle).click().perform();

    const dialogConfirmButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisibleToClick(dialogConfirmButton);

    this.checkTotalCount(beforeAddRange, 1);

    const editButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-accent')).last();
    waitIsVisibleToClick(editButton);

    const newName = 'TEST2';

    nameInput.clear();
    nameInput.sendKeys(newName);
    waitIsVisibleToClick(dialogConfirmButton);

    const table = element.all(by.css('app-table tbody tr')).last();
    const currentName = table.all(by.css('.mat-column-name')).first().getText();
    expect(currentName).toBe(newName);

    this.deleteMethodTest();

  }

  programPage() {

    const programButton = element(by.css('a#Program'));
    waitIsVisibleToClick(programButton);

    const beforeAddRange = this.getPageRange();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisibleToClick(addButton);

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST1');

    const remarkInput = element(by.css('input[placeholder="remark"]'));
    remarkInput.sendKeys('TEST1');

    const linkInput = element(by.css('input[placeholder="linkTag"]'));
    linkInput.sendKeys('TEST1');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisibleToClick(selectButton);

    const checkButton = element.all(by.css('mat-option')).get(0);
    waitIsVisibleToClick(checkButton);

    const dialogConfirmButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisibleToClick(dialogConfirmButton);

    this.checkTotalCount(beforeAddRange, 1);

    const editButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-accent')).last();
    waitIsVisibleToClick(editButton);

    const newName = 'TEST2';

    nameInput.clear();
    nameInput.sendKeys(newName);
    waitIsVisibleToClick(dialogConfirmButton);

    const table = element.all(by.css('app-table tbody tr')).last();
    const currentName = table.all(by.css('.mat-column-name')).first().getText();
    expect(currentName).toBe(newName);

    this.deleteMethodTest();

  }

  menuPage() {

    const menuButton = element(by.css('a#Menu'));
    waitIsVisibleToClick(menuButton);

    const beforeAddRange = this.getPageRange();

    const addButton = element.all(by.css('button.mat-raised-button.mat-button-base')).get(0);
    waitIsVisibleToClick(addButton);

    const nameInput = element(by.css('input[placeholder="name"]'));
    nameInput.sendKeys('TEST1');

    const selectButton = element(by.css('mat-select.mat-select-empty'));
    waitIsVisibleToClick(selectButton);

    const checkButton = element.all(by.css('mat-option')).get(0);
    waitIsVisibleToClick(checkButton);

    const dialogConfirmButton = element.all(by.css('button.mat-button.mat-button-base')).get(0);
    waitIsVisibleToClick(dialogConfirmButton);

    this.checkTotalCount(beforeAddRange, 1);

    const editButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-accent')).last();
    waitIsVisibleToClick(editButton);

    const newName = 'TEST2';

    nameInput.clear();
    nameInput.sendKeys(newName);
    waitIsVisibleToClick(dialogConfirmButton);

    const table = element.all(by.css('app-table tbody tr')).last();
    const currentName = table.all(by.css('.mat-column-name')).first().getText();
    expect(currentName).toBe(newName);

    this.deleteMethodTest();

  }

  deleteMethodTest() {

    const nextButton = element.all(by.css('button.mat-paginator-navigation-next')).get(0);

    waitIsVisibleToClick(nextButton);

    const beforeDeleteRange = this.getPageRange();

    const deleteButton = element.all(by.css('button.mat-raised-button.mat-button-base.mat-warn')).last();

    waitIsVisibleToClick(deleteButton);

    waitAlertToClick();

    this.checkTotalCount(beforeDeleteRange, -1);
  }

  getPageRange(): promise.Promise<string> {

    const prevToatal = element(by.css('.mat-paginator-range-label'));

    waitIsPresence(prevToatal);

    return prevToatal.getText();

  }

  checkTotalCount(beforeRange: promise.Promise<string>, count: number) {

    const nowRange = element(by.css('.mat-paginator-range-label')).getText();

    beforeRange.then((x) => {
      const beforeToatal = parseInt( x.split(' ')[4], 10);
      nowRange.then((y) => {
        const nowToatal = parseInt( y.split(' ')[4], 10);
        expect(nowToatal).toBe(beforeToatal + count);
      });
    });

  }

}
