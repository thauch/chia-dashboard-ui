import {Component, Input, OnInit} from '@angular/core';
import {getStateForLastUpdated} from '../state-util';
import Capacity from '../capacity';
import * as moment from 'moment';
import BigNumber from 'bignumber.js';
import { parse } from 'querystring';

@Component({
  selector: 'app-harvester',
  templateUrl: './harvester.component.html',
  styleUrls: ['./harvester.component.scss']
})
export class HarvesterComponent implements OnInit {
  @Input() harvester: any;
  @Input() bestBlockchainState: any;
  @Input() bestBlockchainStateFlax: any;
  @Input() bestBlockchainStateChaingreen: any;
  @Input() bestBlockchainStateSilicoin: any;
  @Input() bestBlockchainStateSpare: any;

  constructor() { }

  ngOnInit(): void {
  }

  get farmerConnectionsCount() {
    if (this.harvester.farmerConnectionsCount != undefined) {
      return this.harvester.farmerConnectionsCount !== undefined ? this.harvester.farmerConnectionsCount : this.harvester.farmerConnections.length;
    }
  }

  get status() {
    if (this.lastUpdatedState !== 0) {
      return 'Unknown';
    }
    if (this.farmerConnectionsCount > 0) {
      return 'Connected';
    }

    return 'Disconnected';
  }

  get colorClassForSyncStatus() {
    const status = this.status;
    if (status === 'Connected') {
      return 'color-green';
    }
    if (status === 'Unknown') {
      return 'color-orange';
    }

    return 'color-red';
  }

  get satelliteName() {
    return this.harvester.satelliteName;
  }

  get satelliteCoin() {
    if (this.harvester.satelliteCoin == undefined) {
      return 'Chia';
    }
    return this.harvester.satelliteCoin ;
  }

  get plotCount() {
    return this.harvester.plotCount;
  }

  get capacity() {
    return new Capacity(this.capacityInGib).toString();
  }

  get capacityInGib() {
    return new BigNumber(this.harvester.totalCapacityInGib);
  }

  get lastUpdatedBefore() {
    return moment(this.harvester.lastUpdate).fromNow();
  }

  get lastUpdatedState() {
    return getStateForLastUpdated(this.harvester.lastUpdate);
  }

  get selectBestBlockchainState() {
    if (this.satelliteCoin == 'Flax') {
    return this.bestBlockchainStateFlax;
    }
    if (this.satelliteCoin == 'Chaingreen') {
    return this.bestBlockchainStateChaingreen;
    }
    if (this.satelliteCoin == 'Spare') {
      return this.bestBlockchainStateSpare;
    }
    if (this.satelliteCoin == 'Silicoin') {
    return this.bestBlockchainStateSilicoin;
    }
    return this.bestBlockchainState;
  }

  get estimatedTimeToWinInHours() {
    if (!this.selectBestBlockchainState) {
      return 'N/A';
    }
    if (this.capacityInGib.isZero()) {
      return 'N/A';
    }
    const networkSpace = new Capacity(this.selectBestBlockchainState.spaceInGib).capacityInGib;
    // console.log(networkSpace);
    const capacity = this.capacityInGib;
    const chanceToWinABlock = capacity.dividedBy(networkSpace);
    const avgBlocksTillWin = new BigNumber(1).dividedBy(chanceToWinABlock);
    const blocksPerDay = new BigNumber(4608);
    const blockWinsPerDay = blocksPerDay.dividedBy(avgBlocksTillWin);
    const avgTimeToWinInMinutes = new BigNumber(24 * 60).dividedBy(blockWinsPerDay);

    return `≈ ${moment.duration(avgTimeToWinInMinutes, 'minutes').humanize()}`;
  }

  get ogPlots() {
    return this.harvester.ogPlots;
  }

  get nftPlots() {
    return this.harvester.nftPlots;
  }

  get plotCountString() {
    if (!this.ogPlots && !this.nftPlots) {
      return `${this.plotCount} Plots`;
    }
    if (this.ogPlots && this.ogPlots.count === 0) {
      return `${this.plotCount} Plots (NFT)`;
    }
    if (this.nftPlots && this.nftPlots.count === 0) {
      return `${this.plotCount} Plots (OG)`;
    }

    return `${this.plotCount} Plots (OG: ${this.ogPlots.count} | NFT: ${this.nftPlots.const})`;
  }
}
