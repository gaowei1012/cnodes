import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider, Global } from '../../providers/rest/rest';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private onShowSubscription: Subscription;
  private onHideSubscription: Subscription;
  private id: string;
  private topic: any;
  private accessToken: string;
  private showInput: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rest: RestProvider,
              public keyboard: Keyboard) {
    // 拿到组件传过来的值
    this.id = navParams.get("id");
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.topic = this.rest.httpGet(Global.API.getTopic + this.id, this.accessToken? {'accessToken': this.accessToken} : null, true)
          .then(data => {
            this.topic = data.data;
            console.log(this.topic)
          });
    this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e=> this.onShow(e))
    this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide())      
  }

  doReply(e) {
    console.log(e)
  }

  like(reply) {
    console.log('lonk ++')
    this.rest.httpPost(Global.API.upReply.replace(':reply_id', reply.id), this.accessToken ? {'accessToken': this.accessToken} : null, false)
        .then(data => {
          if (data.success) {
            if (data.action == 'down') {
              reply.is_uped = false;
              reply.ups.pop();
            } else {
              reply.is_uped = true;
              reply.ups.push()
            }
          } else {
            // code ...
          }
        })
  }

  writeReply() {
    this.keyboard.disableScroll(true);
    this.keyboard.show();
  }

  cancelReply() {
    this.keyboard.close();
  }

  onShow(e) {
    this.showInput = true;
  }

  onHide() {
    this.showInput = false;
  }

  /**
   * 取消事件订阅
   *
   * @memberof DetailPage
   */
  ngOnDestroy() {
    if (this.onShowSubscription) this.onShowSubscription.unsubscribe();
    if (this.onHideSubscription) this.onHideSubscription.unsubscribe();
  }

}
