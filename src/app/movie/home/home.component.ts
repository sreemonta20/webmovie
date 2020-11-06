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
import { Router, ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DataService, ApiService, MessageService, conversions, initvalidationservice, Globalservice],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public res: any;
  public movieList: any;
  public languageList: any;
  public locationList: any;
  public searchname: string = '';
  public language: string = '';
  public location: string = '';
  public _getMoviesUrl: string = 'Movie/GetMovies';
  public _getLanguageListUrl: string = 'Movie/GetLanguage';
  public _getLocationListUrl: string = 'Movie/GetLocation';
  public _getByTitleUrl: string = 'Movie/GetMoviesByTitle';
  public _getByLanguageUrl: string = 'Movie/GetMoviesByLanguage';
  public _getByLocationUrl: string = 'Movie/GetMoviesByLocation';

  constructor(private dataService: DataService,
    private apiService: ApiService,
    private messageService: MessageService,
    private toastr: ToastrService,
    private router: Router,
    private conversion: conversions,
    private path: initvalidationservice,
    @Inject(DOCUMENT) private document: any,
    private titleService: Title,
    private _Activatedroute:ActivatedRoute,
    private globalservice: Globalservice) {
      this.path.pathValidator(this.document.location.pathname);
      // this.conversion.loadScripts();
}

  ngOnInit(): void {
    this.titleService.setTitle('Movie | Home');
    this.initializeFormData();
  }

  initializeFormData() {
    this.getAllMovies();
    this.getLanguageList();
    this.getLocationList();
  }

  getAllMovies()
  {
    this.apiService.getall(this._getMoviesUrl)
      .subscribe(response => {
        this.res = response;
        this.movieList = this.res.result.movieList;

      }, error => {
        console.log(error);
      });
  }
  getLanguageList()
  {
    this.apiService.getall(this._getLanguageListUrl)
      .subscribe(response => {
        this.res = response;
        this.languageList = this.res.result.languageList;

      }, error => {
        console.log(error);
      });
  }

  getLocationList()
  {
    this.apiService.getall(this._getLocationListUrl)
      .subscribe(response => {
        this.res = response;
        this.locationList = this.res.result.locationList;

      }, error => {
        console.log(error);
      });
  }

  searchByTitle() {

    let param = { searchValue: this.searchname.trim() };
    this.apiService.getWithMultipleModelsExtn(this._getByTitleUrl, param)
      .subscribe(
        response => {
          this.res = response;
          if (this.res.result.state) {
            this.movieList = this.res.result.movieList;
          }
        }, error => {
          console.log(error);
        }
      );
  }

  searchByLanguage() {

    let param = { searchValue: this.language.trim() };
    this.apiService.getWithMultipleModelsExtn(this._getByLanguageUrl, param)
      .subscribe(
        response => {
          this.res = response;
          if (this.res.result.state) {
            this.movieList = this.res.result.movieList;
          }
        }, error => {
          console.log(error);
        }
      );
  }

  searchByLocation() {

    let param = { searchValue: this.location.trim() };
    this.apiService.getWithMultipleModelsExtn(this._getByLocationUrl, param)
      .subscribe(
        response => {
          this.res = response;
          if (this.res.result.state) {
            this.movieList = this.res.result.movieList;
          }
        }, error => {
          console.log(error);
        }
      );
  }

}
