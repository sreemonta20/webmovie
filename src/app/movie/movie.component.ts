import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../shared/services/dataservice';
import { ApiService } from '../shared/services/apiservice';
import { MessageService } from '../shared/services/messageservice';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { window } from 'rxjs/operators';
import { conversions } from '../shared/utilities/conversions';
import { Router } from '@angular/router';
import { initvalidationservice } from '../shared/services/initvalidationservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  providers: [DataService, ApiService, MessageService, conversions, initvalidationservice],
  styles: [
  ]
})
export class MovieComponent implements OnInit {

  constructor(private dataService: DataService,
    private apiService: ApiService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private conversion: conversions,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private titleService: Title,
    private path: initvalidationservice) {




}

ngOnInit(): void {
  this.titleService.setTitle('Movie:::');

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
