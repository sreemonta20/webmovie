import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class initvalidationservice {
  public rowEntity: any = {};

  constructor(private router: Router) {
  }

  pathValidator(pathname){
    if (localStorage.getItem('isLoggedin') === null){
      this.router.navigate(['/login']);
    }
  }





  validateLoggedUser() {
    this.rowEntity = {};
    if (localStorage.getItem('isLoggedin')) {
      this.rowEntity = JSON.parse(localStorage.getItem('loggedUser'));
    }
    else {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

  getAuthenticatedUser(): any {

    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  isUserLoggedIn(): boolean {

    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    return  false;
  }

}
