import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider, Global } from "../../providers/rest/rest";

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  private loginUser: string;
  private accesstoken: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public rest: RestProvider) {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.accesstoken = barcodeData.text;
      console.log(barcodeData);
      this.verify(this.accesstoken);
      // Success! Barcode data is here
    }, (err) => {
      console.log(err);
      // An error occurred
    });
  }
  verify(accesstoken: string) {
    this.rest.httpPost(Global.API.verifyToken, { "accesstoken": accesstoken }, true)
      .then(data => {
        console.log(data)
        this.loginUser = data.loginname;
        if (this.loginUser) {
          localStorage.setItem('accesstoken', this.accesstoken);
        }
      })
  }
}