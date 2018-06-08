import { Component, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider, Global } from "../../providers/rest/rest";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private loginname: string;
  private userInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.loginname = navParams.get("loginname");
  }
  ngOnInit() {
    if (this.loginname) {
      this.getInfo(this.loginname);
    }
  }

  /**
   * 获取当前登录用户信息
   *
   * @param {string} loginname
   * @memberof ProfilePage
   */
  getInfo(loginname: string) {
    this.rest.httpGet(Global.API.userInfo + this.loginname, {}, true)
      .then((data) => {
        this.extractData(data);
      });
  }
  extractData(data) {
    if (data.success) {
      this.userInfo = data.data;
    }
  }
}