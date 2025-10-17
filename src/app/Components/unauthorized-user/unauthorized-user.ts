import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SharedServices } from '../../Services/shared-services';

@Component({
  selector: 'app-unauthorized-user',
  imports: [],
  templateUrl: './unauthorized-user.html',
  styleUrl: './unauthorized-user.scss'
})
export class UnauthorizedUser implements OnInit {
  constructor(
    private sharedServices : SharedServices,
    private router : Router
  ){}

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/login']);
    // this.sharedServices.isLoggedInSubject.next(false);
    this.sharedServices.isLoggedInSignal.set(false);
  }

}
