import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../shared/message/message.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {

  constructor(private message: MessageService) {
  }

  ngOnInit() {
    this.message.subscribe();
  }

  ngOnDestroy() {
    this.message.unsubscribe();
  }

}
