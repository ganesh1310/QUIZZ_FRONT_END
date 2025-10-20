import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleBaseView]'
})
export class RoleBaseView {

  private currentRole = 'ADMIN'; // This should be dynamically set based on logged-in user

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

 @Input() set appRoleBaseView(role: string) {
    if (role === this.currentRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
