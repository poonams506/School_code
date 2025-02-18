import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild,AfterViewInit, OnInit, Inject, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource, } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  providers: [NgbCarouselConfig]
})
export class HomeComponent implements AfterViewInit  {
 
	//images = '../../../assets/images/mainb.png';

    constructor(config: NgbCarouselConfig, private router: Router,  @Inject(DOCUMENT) private document: Document,

      private modalService: NgbModal,
    ) {
      // customize default values of carousels used by this component tree
       config.interval = 10000;
      // config.wrap = false;
      // config.keyboard = false;
      config.pauseOnHover = true;

      config.keyboard = false;
    }

    gotoList() {
      this.router.navigate(['/tickets']);
    }
    gotoLogin() {
      
      this.router.navigate(['/login']);
    }
    
    ngOnInit() {
      this.document.body.classList.add('public-web-page-body');
    }
  
    ngOnDestroy() {
      this.document.body.classList.remove('public-web-page-body');
    }
    closeResult!: string;
    @ViewChild('content') content: any;

    ngAfterViewInit() {
      this.openModal();
    }
    openModal(){
      this.modalService.open(this.content, { centered: true });
    }
  
  }
