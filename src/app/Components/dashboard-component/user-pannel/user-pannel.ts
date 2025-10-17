import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-pannel',
  imports: [CommonModule],
  templateUrl: './user-pannel.html',
  styleUrl: './user-pannel.scss'
})
export class UserPannel implements OnChanges {
  @Input() role: any;
  users : any = [
    { name: 'Alice', role: 'admin' , isAdmin : true},
    { name: 'Bob', role: 'user' , isAdmin : false},
    { name: 'Charlie', role: 'moderator' , isAdmin : false}
  ]

  ngOnChanges(simpleChanges: any): void {
    console.log('User Panel Changes:', simpleChanges);
  }
}
