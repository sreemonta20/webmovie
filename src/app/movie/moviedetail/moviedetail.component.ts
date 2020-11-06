import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  providers: [DataService, ApiService, MessageService, conversions, initvalidationservice, Globalservice],
  styleUrls: ['./moviedetail.component.css']
})
export class MoviedetailComponent implements OnInit {
  public res: any;
  public modelmovie: any = {};
  public code: any;
  public getval: any;
  public _getDetailsByCodeUrl: string = 'Movie/GetMovieByCode';

  constructor(private dataService: DataService,
    private apiService: ApiService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private conversion: conversions,
    private path: initvalidationservice,
    @Inject(DOCUMENT) private document: any,
    private titleService: Title,
    private globalservice: Globalservice,
    private router: Router,
    private _Activatedroute: ActivatedRoute) {

    this.path.pathValidator(this.document.location.pathname);

  }

  ngOnInit(): void {
    this.titleService.setTitle('Movie | Detail');
    // this.getval = this._Activatedroute.snapshot.paramMap.get("code");
    this.getval =  this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);

       this.getSpecificMovie(params.get("code"));
   });

  }

  ngOnDestroy() {
    this.getval.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/movie/home']);
  }

  getSpecificMovie(id: any) {

    let param = { imdbCode: id };
    this.apiService.getWithMultipleModelsExtn(this._getDetailsByCodeUrl, param)
      .subscribe(
        response => {
          this.res = response;
          if (this.res.result.state) {
            this.modelmovie = this.res.result.oMovie;
          }
        }, error => {
          console.log(error);
        }
      );
  }



}
