import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  coin: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private stateService: StateService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (!this.apiService.isAuthenticated) {
      await this.router.navigate(['/login']);
      return;
    }
    if (this.router.url === '/flax') {
    this.stateService.setSelectedDashboard('Flax');
    }
    if (this.router.url === '/chaingreen') {
    this.stateService.setSelectedDashboard('Chaingreen');
    }
    if (this.router.url === '/spare') {
      this.stateService.setSelectedDashboard('Spare');
    }
    if (this.router.url === '/silicoin') {
      this.stateService.setSelectedDashboard('Silicoin');
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
      farmer: order.indexOf("Farmers"),
      fullnode: order.indexOf("Full Nodes"),
      wallet: order.indexOf("Wallets")
    }
    return orderArr;
  }

  visibleGroups() {
    const user = this.stateService.user;
    if (!user.visibleGroups || user.visibleGroups.length == 0) {
      return {
        "Plotters": true,
        "Harvesters": true,
        "Farmers": true,
        "Full Nodes": true,
        "Wallets": true
      }
    };
    return user.visibleGroups;
  }

  get rate() {
    return this.stateService.getRateForSelectedCurrency();
  }

  get selectedCurrency() {
    return this.stateService.selectedCurrency;
  }

  get selectedDashboard() {
    return this.stateService.selectedDashboard;
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
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

  get satellites() {
    return this.stateService.satellites;
  }

  get satellitesChiaCount() {
    let count = 0;
    this.stateService.satellites.map((satellite) => {
      if (satellite.coin == 'Chia' || satellite.coin == undefined) {
        count += 1;
      }
    })
    return count;
  }

  get satellitesFlaxCount() {
    let count = 0;
    this.stateService.satellites.map((satellite) => {
      if (satellite.coin == 'Flax') {
        count += 1;
      }
    })
    return count;
  }

  get satellitesChaingreenCount() {
    let count = 0;
    this.stateService.satellites.map((satellite) => {
      if (satellite.coin == 'Chaingreen') {
        count += 1;
      }
    })
    return count;
  }

  get satellitesSpareCount() {
    let count = 0;
    this.stateService.satellites.map((satellite) => {
      if (satellite.coin == 'Spare') {
        count += 1;
      }
    })
    return count;
  }

  get satellitesSilicoinCount() {
    let count = 0;
    this.stateService.satellites.map((satellite) => {
      if (satellite.coin == 'Silicoin') {
        count += 1;
      }
    })
    return count;
  }

  wallets(coin) {
    if (coin == 'All') {
      return this.stateService.wallets;
    }
    let list = [];
    this.stateService.wallets.map((wallet) => {
      if (wallet.satelliteCoin == undefined && coin == 'Chia') {
        list.push(wallet);
      }
      if (wallet.satelliteCoin == coin) {
        list.push(wallet);
      }
    })
    return list;
  }

  fullNodes(coin) {
    if (coin == 'All') {
      return this.stateService.fullNodes;
    }
    let list = [];
    this.stateService.fullNodes.map((fullNode) => {
      if (fullNode.satelliteCoin == undefined && coin == 'Chia') {
        list.push(fullNode);
      }
      if (fullNode.satelliteCoin == coin) {
        list.push(fullNode);
      }
    })
    return list;
  }

  harvesters(coin) {
    if (coin == 'All') {
      return this.stateService.harvesters;
    }
    let list = [];
    this.stateService.harvesters.map((harvester) => {
      if (harvester.satelliteCoin == undefined && coin == 'Chia') {
        list.push(harvester);
      }
      if (harvester.satelliteCoin == coin) {
        list.push(harvester);
      }
    })
    return list;
  }

  farmers(coin) {
    if (coin == 'All') {
      return this.stateService.farmers;
    }
    let list = [];
    this.stateService.farmers.map((farmer) => {
      if (farmer.satelliteCoin == undefined && coin == 'Chia') {
        list.push(farmer);
      }
      if (farmer.satelliteCoin == coin) {
        list.push(farmer);
      }
    })
    return list;
  }

  get plotters() {
    if (this.selectedDashboard == 'All') {
      return this.stateService.plotters;
    }
    let list = [];
    this.stateService.plotters.map((plotter) => {
      if (plotter.satelliteCoin == undefined && this.selectedDashboard == 'Chia') {
        list.push(plotter);
      }
      if (plotter.satelliteCoin == this.selectedDashboard) {
        list.push(plotter);
      }
    })
    return list;
  }

}
