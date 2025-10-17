import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pannel',
  imports: [CommonModule],
  templateUrl: './admin-pannel.html',
  styleUrl: './admin-pannel.scss'
})
export class AdminPannel implements OnChanges , OnInit , DoCheck , AfterContentInit , AfterContentChecked , AfterViewInit , AfterViewChecked , OnDestroy{
  @Input() role: any;
  private previousRole: any;

  //every time there is a change in input properties this method will be called
  ngOnChanges(simpleChanges: any): void {
    console.log('Admin Panel Changes:', simpleChanges);
  }

  //once called after the first ngOnChanges
  ngOnInit(): void {
    console.log('Admin Panel Initialized with role:', this.role);
  }

  //only triggers when the reference of role changes 
  // ngDoCheck() runs frequently, so keep logic lightweight
  //Detect changes in nested objects or arrays passed via @Input()
  ngDoCheck(): void {
    if (this.role !== this.previousRole) {
      console.log('Admin Panel Role changed from', this.previousRole, 'to', this.role);
      this.previousRole = this.role;
    }
  }

  //called after content (ng-content) has been projected into view from parent
  ngAfterContentInit(): void {
    console.log('Admin Panel Content Initialized with role:', this.role);
  }

  ngAfterContentChecked(): void {
    //runs after every check of projected content
    //avoid heavy processing here
    console.log('Admin Panel Content Checked with role:', this.role);
  }

  //called after component's view (and child views) has been initialized or to @ViewChild
  //good place for DOM interactions
  ngAfterViewInit(): void {
    console.log('Admin Panel View Initialized with role:', this.role);
  }

  ngAfterViewChecked(): void {
    //runs after every check of component's view
    //avoid heavy processing here
    console.log('Admin Panel View Checked with role:', this.role);
  }

  //cleanup logic here
  //unsubscribe from observables, detach event handlers to avoid memory leaks
  //component is about to be destroyed
  ngOnDestroy(): void {
    this.role = null;
    console.log('Admin Panel with role', this.role, 'is being destroyed');
  }

  

}
