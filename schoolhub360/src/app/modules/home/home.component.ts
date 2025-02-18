import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource, } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements AfterViewInit  {
 
	//images = '../../../assets/images/mainb.png';

    constructor(config: NgbCarouselConfig, private router: Router,
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
  
    closeResult!: string;
    @ViewChild('content') content: any;

    ngAfterViewInit() {
      this.openModal();
    }
    openModal(){
      this.modalService.open(this.content, { centered: true });
    }
  
  }
