import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickest',
  templateUrl: './tickest.component.html',
  styleUrl: './tickest.component.css'
})
export class TickestComponent {
  constructor(
    private router: Router) { }

    back() {
      this.router.navigate(['/home']);
    }
}


