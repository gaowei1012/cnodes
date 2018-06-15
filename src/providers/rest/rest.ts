
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/* 接口类, 封装接口所需要的数据 */
@Injectable()
export class Global {

  /**
   * 接口基地址
   *
   * @static
   * @memberof Global
   */
  static BASEURI = 'https://cnodejs.org/api/v1';

  /**
   * 接口地址
   *
   * @static
   * @type {*}
   * @memberof Global
   */
  static API: any = {
    getTopics: '/topics',
    getTopic: '/topic/',
    postTopic: '/topics',
    updateTopic: '/topics/update',
    collectTopics: '/topic_collect/collect',
    cancelCollect: '/topic_collect/de_collect',
    topicCollect: '/topic_collect/',
    newReply: '/topic/:topic_id/replies',
    upReply: '/reply/:reply_id/ups',
    userInfo: '/user/',
    verifyToken: '/accesstoken',
    msgCount: '/message/count',
    msgs: '/messages',
    markAll: '/message/mark_all',
    markOne: '/message/mark_one/:msg_id',

  };
  static LIMIT = 20;
}

@Injectable()
export class RestProvider {

  constructor(public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  /**
   * 封装get请求方法
   *
   * @param {*} url
   * @param {*} params
   * @param {boolean} [loader=false]
   * @returns
   * @memberof RestProvider
   */
  public httpGet(url, params, loader: boolean = false) {
    let loading = this.loadingCtrl.create({}); // 创建loading
    if (loader) { // 加载loading
      loading.present();
    }
    // 返回请求数据
    return this.http.get(Global.BASEURI + url + this.encode(params))
      .toPromise()
      .then(res => {
        let d = res.json();
        if (loader) {
          loading.dismiss();// 关闭loading
        }
        return d;
      })
      .catch(error => { // 错误处理
        if (loader) {
          loading.dismiss();
        }
        this.handleError(error);
      });
  }

  /**
   * 封装post请求方法
   *
   * @param {string} url
   * @param {*} params
   * @param {boolean} [loader=false]
   * @returns
   * @memberof RestProvider
   */
  public httpPost(url: string, params, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
      loading.present();
    }
    return this.http.post(Global.BASEURI + url, params)
      .toPromise()
      .then(res => {
        var d = res.json();
        if (loader) {
          loading.dismiss();
        }
        return d;
      }).catch(error => {
        if (loader) {
          loading.dismiss();
        }
        this.handleError(error);
      });
  }

  /**
   * 对代码编码进行处理
   *
   * @param {*} params
   * @returns
   * @memberof RestProvider
   */
  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }

  /**
   * 封装错误处理方法
   *
   * @private
   * @param {(Response | any)} error
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }


  /**
   * 弹出信息
   *
   * @param {*} message
   * @param {*} [callback]
   * @memberof RestProvider
   */
  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  /**
   * toast
   *
   * @param {*} message
   * @param {*} [callback]
   * @memberof RestProvider
   */
  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      dismissOnPageChange: true,
    });
    toast.present();
    if (callback) {
      callback();
    }
  }

  /**
   * getTopics 获取文章详情数据方法
   *  文章页数
   *
   * @param {string} tab
   * @param {number} [page]
   * @param {*} [limit=Global.LIMIT]
   * @returns
   * @memberof RestProvider
   */
  getTopics(tab: string, page?: number, limit = Global.LIMIT) {
    return this.http.get(Global.BASEURI + '/topics', {
      params: {
        "tab": tab,
        "page": page,
        "limit": limit
      }
    }).map(this.extractData);
  }

  /**
   * 根据id,accesstoken获取文章数据方法
   *
   * @param {string} id
   * @param {string} [accesstoken]
   * @returns
   * @memberof RestProvider
   */
  getTopic(id: string, accesstoken?: string) {
    return this.http.get(Global.BASEURI + '/topic/' + id, {
      params: {
        "accesstoken": accesstoken
      }
    }).map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

}

