import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pwa-app';
  readonly VAPID_PUBLIC_KEY = 'BB0W9tHrLURegsBMCt5Bbxu0aHNndIjIJfCizFzYQiMDzfzqTfRWcR08nLqn6N8QWeaeMmXv2j38cTKea2m8LX4';
  sub: any;

  constructor(private swPush: SwPush, private pushService: PushService, private swUpdate: SwUpdate) {
    console.log('constructor =========> ' + JSON.stringify(1));
    if (swPush.isEnabled) {
      console.log('constructor isEnabled =========> ' + JSON.stringify(1));
      this.swPush.subscription.subscribe(x => this.sub);
      if (this.sub) {
        this.pushService.addPushSubscriber(this.sub).subscribe(x => console.log('addPushSubscriber sucess =========> ' + JSON.stringify(1)));
      } else {
      console.log('constructor else notisEnabled =========> ' + JSON.stringify(1));

      swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => {
          this.sub = sub;
          // send subscription to the server
        this.pushService.addPushSubscriber(sub).subscribe(x => console.log('addPushSubscriber sucess cons=========> ' + JSON.stringify(1)));
        })
        .catch(console.error);
      }
    }
  }

  ngOnInit() {
  //   this.swPush.notificationClicks.subscribe( notpayload =>
  //   {
  //     console.log(
  //       'Action: ' + notpayload.action +
  //       'Notification data: ' + notpayload.notification.data +
  //       'Notification data.url: ' + notpayload.notification.data.url+
  //       'Notification data.body: ' + notpayload.notification.body
  //     );
  //     window.open(notpayload.notification.data.url, "_blank");
  //  });
 }


  subscribeMe() {
    // this.pushService.getSmartphoneById(1).subscribe(x => console.log('x=', x));
  }

  subscribeToNotifications() {
    console.log('do you see me??????? =========> ' + JSON.stringify(1));

    if (this.swPush.isEnabled) {
      console.log(' isEnabled =========> ' + JSON.stringify(1));
      this.swPush.subscription.subscribe(x => this.sub);
      if (this.sub) {
      console.log(' IF this.sub isEnabled =========> ' + JSON.stringify(1));
        this.pushService.addPushSubscriber(this.sub).subscribe(x => console.log('addPushSubscriber sucess =========> ' + JSON.stringify(1)));
      } else {
      console.log(' Else this.sub isEnabled =========> ' + JSON.stringify(1));

      this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => {
          this.sub = sub;
          // send subscription to the server
        this.pushService.addPushSubscriber(sub).subscribe(x => console.log('addPushSubscriber sucess =========> ' + JSON.stringify(1)));
        })
        .catch(console.error);
      }
    }
  }

}
