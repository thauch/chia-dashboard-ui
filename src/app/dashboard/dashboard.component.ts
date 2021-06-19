import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {StateService} from '../state.service';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  get user() {
    return this.stateService.user;
  }

  satelliteOrder() {
    const user = this.stateService.user;
    if (!user.satelliteOrder || user.satelliteOrder.length == 0) {
      return {
        plotter: 0,
        harvester: 1,
        farmer: 2,
        fullnode: 3,
        wallet: 4
      }
    };
    const order = user.satelliteOrder;
    const orderArr = {
      plotter: order.indexOf("Plotters"),
      harvester: order.indexOf("Harvesters"),
      farmers: order.indexOf("Farmers"),
      fullnode: order.indexOf("Full Nodes"),
      wallet: order.indexOf("Wallets")
    }
    return orderArr;
  }

  get rate() {
    return this.stateService.getRateForSelectedCurrency();
  }

  get selectedCurrency() {
    return this.stateService.selectedCurrency;
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }

  get bestBlockchainState() {
    return this.stateService.bestBlockchainState;
  }

  get satellites() {
    return this.stateService.satellites;
  }

  get wallets() {
    return this.stateService.wallets;
  }

  get fullNodes() {
    return this.stateService.fullNodes;
  }

  get harvesters() {
    return this.stateService.harvesters;
  }

  get farmers() {
    return this.stateService.farmers;
  }

  get plotters() {
    return this.stateService.plotters;
  }

}