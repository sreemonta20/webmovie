import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
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

  public flag = true;
  public userLoginForm: FormGroup;
  public res: any;
  public loggedUsername: string;
  public loggedUserid: number;
  public isLoggedin: string;
  public resmessage: string;
  public alertmessage: string;
  public loginUrl: string;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private titleService: Title,
    private messageService: MessageService,
    private toastr: ToastrService,
    private apiService: ApiService,
    private conversion: conversions) {


  }

  ngOnInit(): void {
    this.titleService.setTitle('Movie | Login');
    this.createForm();
    this.isLoggedin = localStorage.getItem('isLoggedin');
    if (this.isLoggedin === 'true') {
      this.router.navigate(['/movie']);
    } else {
    }
  }

  createForm() {
    this.userLoginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.loginUrl = 'Account/Login';
    const param = this.userLoginForm.value;
    this.apiService.postWithAuthCheck(this.loginUrl, param).subscribe(
      (response) => {
        this.res = response;
        if (this.res.resData.state === true) {
          localStorage.setItem('isLoggedin', JSON.parse(this.res.resData.state));
          localStorage.setItem('loggedUser', JSON.stringify(this.res.resData.oDtoLoginUser));
          localStorage.setItem('UserCode', JSON.stringify(this.res.resData.oDtoLoginUser.userCode));
          localStorage.setItem('token', JSON.stringify(this.res.resData.oDtoLoginUser.token));
          this.messageService.successToaster(
            this.toastr,
            this.res.resData.message,
            'Successful'
          );
          // this.getMenus();
          this.router.navigate(['/movie']);
        } else {
          this.messageService.errorToaster(
            this.toastr,
            this.res.resData.message,
            'Warning'
          );
          this.isLoggedin = 'false';
        }
      },
      (error) => {
        this.messageService.errorToaster(
          this.toastr,
          this.res.resData.message,
          'Warning'
        );
      }
    );
  }

}
