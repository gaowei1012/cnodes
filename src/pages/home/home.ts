
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RestProvider, Global } from "../../providers/rest/rest";
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Topic } from '../../model/topic';
import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
  private currentTab: string;
  private currentPage: number;
  private topics: Array<Topic>;
  // private isAuthenticated: boolean;
  constructor(public navCtrl: NavController,
              public rest: RestProvider) {
  }

  // 生命周期函数
  ngOnInit() {
    this.currentTab = "all";
  }
  ngAfterViewInit() {
    this.onChangeTab(1);
  }
  onChangeTab(page?: number) {
    this.currentPage = 1;
    this.getTopics(this.currentTab, this.currentPage, true);
  }

  /**
   *跳转到文章详情页
   *
   * @param {string} id
   * @memberof HomePage
   */
  gotoDetail(id: string) {
    console.log('我被点击了')
    console.log("go to detail:" + id);
    this.navCtrl.push('DetailPage', {
      "id": id
    });
  }

  gotoProfile(loginname: string) {
    console.log("go to profile:" + loginname);
    this.navCtrl.push('ProfilePage', {
      "loginname": loginname
    })
  }

  /**
   * 刷新页面获取数据
   *
   * @param {*} refresher
   * @memberof HomePage
   */
  doRefresh(refresher) {
    this.currentPage = 1;
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getTopics(this.currentTab, this.currentPage, false);
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getTopics(this.currentTab, ++this.currentPage, false);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  /* goloin */
  gotoLogin() {
    this.navCtrl.push('LoginPage');
  }
  /**
   * 获取文章详情
   * @param {string} tab
   * @param {number} [page]
   * @param {boolean} [loader=true]
   * @memberof HomePage
   */
  getTopics(tab: string, page?: number, loader = true) {
    this.rest.httpGet(Global.API.getTopics, { "tab": tab, "page": page, "limit": Global.LIMIT }, loader)
      .then((data) => {
        this.extractData(data);
      });
  }
  extractData(data) {
    console.log(data)
    if (this.currentPage > 1) {
      this.topics = this.topics.concat(data.data);
    } else {
      this.topics = data.data;
    }
  }
}