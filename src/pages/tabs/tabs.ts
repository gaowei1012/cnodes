import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { VideoPage } from '../video/video';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabVideo = VideoPage;
  tabLogin = LoginPage;

  constructor() {

  }
}
