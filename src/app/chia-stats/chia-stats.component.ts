import { StateService } from './../state.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chia-stats',
  templateUrl: './chia-stats.component.html',
  styleUrls: ['./chia-stats.component.scss']
})
export class ChiaStatsComponent implements OnInit {

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
    await this.stateService.getChiaStats();
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }

  get chiaStats() {
    return this.stateService.chiaStats;
  }
}
