import { debounce } from 'rxjs/operators';

export class Globalservice {

    divShowByID(id: string){
      document.getElementById(id).style.display = 'block';
    }

    divHideByID(id: string){
      document.getElementById(id).style.display = 'none';
    }

}
