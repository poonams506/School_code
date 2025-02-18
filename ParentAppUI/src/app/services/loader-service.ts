import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  apiCount: number = 0;

  private api: BehaviorSubject<number> = new BehaviorSubject(this.apiCount);
  apiCountObservable = this.api.asObservable();

  constructor(private spinner: NgxSpinnerService) { }

  addAPI() {
    this.apiCount += 1;
    this.api.next(this.apiCount);
    if(this.apiCount!=0)
    {
        this.spinner.show();
    }
    console.log(environment.API_BASE_URL)
    console.log(`Ongoing API count ${this.apiCount}`)
  }
  removeAPI() {
    this.apiCount -= 1;
    this.api.next(this.apiCount);
    if(this.apiCount==0)
    {
        this.spinner.hide();
    }
    console.log(`Ongoing API count ${this.apiCount}`)
  }
}