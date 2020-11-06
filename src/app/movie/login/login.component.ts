import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../shared/services/dataservice';
import { ApiService } from '../../shared/services/apiservice';
import { MessageService } from '../../shared/services/messageservice';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs/operators';
import { conversions } from '../../shared/utilities/conversions';
import { initvalidationservice } from '../../shared/services/initvalidationservice';
import { Globalservice } from '../../shared/services/globalservice';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [DataService, ApiService, MessageService, conversions, initvalidationservice, Globalservice],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService,
    private apiService: ApiService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private conversion: conversions,
    private path: initvalidationservice,
    @Inject(DOCUMENT) private document: any,
    private titleService: Title,
    private globalservice: Globalservice) {


}

ngOnInit(): void {
  this.titleService.setTitle('Movie | Login');
}
}
