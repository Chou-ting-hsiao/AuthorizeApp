import { Directive, OnInit, AfterViewChecked, TemplateRef, ViewContainerRef } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';

@Directive({
  selector: '[appAuthorize]'
})
export class AuthorizeDirective implements OnInit, AfterViewChecked {

  AuthorizeDictionary: { [key: string]: any; } = {};

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private menuService: MenuService) { }

  ngOnInit() {

    this.viewContainer.createEmbeddedView(this.templateRef);

    const linkName =  window.location.pathname.split('/')[2];

    this.menuService.getByLink(linkName).subscribe(buttons => {

      buttons.forEach(x => {

        this.AuthorizeDictionary[x.name] = x.isEnable;

      });

      console.log(this.AuthorizeDictionary);

    });


    // console.log(this.templateRef.elementRef.nativeElement.ownerDocument.querySelectorAll('button'));

  }

  ngAfterViewChecked() {

    for (const [key, isEnable] of Object.entries(this.AuthorizeDictionary)) {

      if (!isEnable) {

        const elements: HTMLButtonElement [] = this.templateRef.elementRef.nativeElement.ownerDocument.querySelectorAll(`#${key}`);

        elements.forEach( element => {

          console.log(element.disabled = true );

        });

      }

    }


  }

}
