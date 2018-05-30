import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RegexService } from '../shared/regex/regex.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  currentFormType: string;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private regex: RegexService,
  ) {
  }

  ngOnInit() {
    this.parseFormType(this.router.url);

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.parseFormType(event.url);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private parseFormType(url: string): void {
    const lastRoute = url.match(this.regex.lastRoute)[1];
    this.currentFormType = lastRoute.replace('-', '_').toUpperCase();
  }

}
