import { StateService } from './../state.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.scss']
})
export class GlobalStatsComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  async ngOnInit() {
    if (!this.apiService.isAuthenticated) {
      await this.router.navigate(['/login']);
      return;
    }
    await this.stateService.init();
    await this.stateService.getGlobalStats();
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }

  get globalStats() {
    return this.stateService.globalStats;
  }
}
