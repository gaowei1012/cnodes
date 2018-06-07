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
    private keyboard: Keyboard) {
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
    // code ...
  }



  onShow(e) {
    this.showInput = true;
  }

  onHide() {
    this.showInput = false;
  }



}
