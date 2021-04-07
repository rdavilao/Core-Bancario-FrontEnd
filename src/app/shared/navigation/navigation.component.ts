import { Component, Input, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnChanges {
  @Input() someInput: string;
  role = localStorage.getItem('role');

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnChanges(): void {
    console.log(this.someInput);
  }

  exit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenConsultas');
    window.location.reload();
  }
}
