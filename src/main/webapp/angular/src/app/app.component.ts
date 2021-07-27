import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor( private router: Router,
               private config: PrimeNGConfig) {
  }

    ngOnInit() {
      this.config.ripple = true;
      this.config.setTranslation({
        // "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "dayNamesShort": ["CN","T2","T3","T4","T5","T6","T7"],
        "dayNamesMin": ["CN","T2","T3","T4","T5","T6","T7"],
        // "dayNamesMin": ["Su","Mo","Tu","We","Th","Fr","Sa"],
        // "monthNames": ["January","February","March","April","May","June","July","August","September","October","November","December"],
        "monthNames": ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
        // "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "monthNamesShort": ["Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6","Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12"],
      });

      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
    }
}
