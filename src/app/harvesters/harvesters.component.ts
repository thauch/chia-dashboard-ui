import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {StateService} from '../state.service';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-harvesters-component',
  templateUrl: './harvesters.component.html',
  styleUrls: ['./harvesters.component.scss']
})
export class HarvestersComponent implements OnInit {
  public faSatellite = faSatellite;
  public shareKey: string = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private stateService: StateService,
  ) {}

  async ngOnInit() {
    if (!this.apiService.isAuthenticated) {
      await this.router.navigate(['/login']);
      return;
    }
    await this.stateService.init();
  }

  trackBy(index, item) {
    return item.satelliteId;
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }
  
  get harvesters() {
    return this.stateService.harvesters;
  }

  get bestBlockchainState() {
    return this.stateService.bestBlockchainState;
  }

  get bestBlockchainStateFlax() {
    return this.stateService.bestBlockchainStateFlax;
  }

  get bestBlockchainStateChaingreen() {
    return this.stateService.bestBlockchainStateChaingreen;
  }

  get bestBlockchainStateSpare() {
    return this.stateService.bestBlockchainStateSpare;
  }

  get bestBlockchainStateSilicoin() {
    return this.stateService.bestBlockchainStateSilicoin;
  }
}