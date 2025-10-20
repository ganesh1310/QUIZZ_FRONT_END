import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-dash-board',
  imports: [FormsModule],
  templateUrl: './owner-dash-board.html',
  styleUrl: './owner-dash-board.scss'
})
export class OwnerDashBoard {
  constructor() {}

  //Interpolation (Component to Template)
  title = 'Interpolation in Angular Component {{title}}';

  //Property Binding (Component to Template)
  imgUrl = 'https://angular.io/assets/images/logos/angular/angular.png';

  //Event Binding (Template to Component)
  submitEvent() {
    alert('Button clicked! Event Binding works!');
  }

  //Two-Way Binding (Component to Template and Template to Component)
  name: string = 'John Doe';

  //Class Binding (Component to Template) : conditionally apply CSS classes based on component logic.
  isActive: boolean = true;

  //Style Binding (Component to Template) : dynamically set inline styles on HTML elements.
  fontSize: string = '20px';


}
