import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faDiscord, faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { ApiService } from '../api.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public faDiscord = faDiscord;
  public faGithub = faGithub;
  public faPaypal = faPaypal;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.stateService.init();
    await this.stateService.getGlobalStats();
  }

  get globalStats() {
    return this.stateService.globalStats;
  }
}
