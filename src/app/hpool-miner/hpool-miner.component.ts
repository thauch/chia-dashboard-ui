import {Component, Input, OnInit} from '@angular/core';
import {getStateForLastUpdated} from '../state-util';
import * as moment from 'moment';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-hpool-miner',
  templateUrl: './hpool-miner.component.html',
  styleUrls: ['./hpool-miner.component.scss']
})
export class HPoolMinerComponent implements OnInit {
  @Input() hpoolMiner: any;
  @Input() bestBlockchainState: any;

  constructor() { }

  ngOnInit(): void {
  }

  get status() {
    if (this.lastLogState == 2) {
      return 'Unknown';
    }
    if (this.hpoolMiner.level != "error") {
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
    if (status === 'Disconnected') {
    return 'color-red';
    }
  }

  get satelliteName() {
    return this.hpoolMiner.satelliteName;
  }

  get lastLogTime() {
    return this.hpoolMiner.lastLogTime;
  }

  get level() {
    return this.hpoolMiner.level;
  }

  get message() {
    return this.hpoolMiner.message;
  }

  get plotCount() {
    return this.hpoolMiner.plotCount;
  }

  get capacity() {
    if (this.hpoolMiner.message != "new mining info") {
      return "-";
    }
    return this.hpoolMiner.totalCapacity;
  }

  get scanTime() {
    return this.hpoolMiner.scanTime;
  }

  get scanStatus() {
    if (this.scanTime < 1000) {
      return 'color-green';
    }
    if (this.scanTime < 2000) {
      return 'color-orange';
    }
    return 'color-red';
  }
  
  get capacityInGib() {
    return new BigNumber(this.hpoolMiner.totalCapacityInGib);
  }
   get farmerIP() {
     return this.hpoolMiner.farmerConnections[0].ip;
   }

   get farmerLastMessage() {
     var now = Math.floor(Date.now() / 1000)
     var delay  =  now - this.hpoolMiner.farmerConnections[0].lastMessageTimestamp;
    return delay.toFixed(2);
   }

  convertTimeZone(time, timeZone) {
    return new Date((typeof time === "string" ? new Date(time) : time).toLocaleString("en-US", {timeZone: timeZone}));   
  }

  get lastUpdatedBefore() {
    return moment(this.hpoolMiner.lastUpdate).fromNow();
  }

  get lastLogState() {
    return getStateForLastUpdated(this.hpoolMiner.lastLogTime);
  }

  get lastUpdatedState() {
    return getStateForLastUpdated(this.hpoolMiner.lastUpdate);
  }
  

  // get estimatedTimeToWinInHours() {
  //   if (!this.bestBlockchainState) {
  //     return 'N/A';
  //   }
  //   if (this.capacityInGib.isZero()) {
  //     return 'N/A';
  //   }
  //   const networkSpace = new Capacity(this.bestBlockchainState.spaceInGib).capacityInGib;
  //   const capacity = this.capacityInGib;
  //   const chanceToWinABlock = capacity.dividedBy(networkSpace);
  //   const avgBlocksTillWin = new BigNumber(1).dividedBy(chanceToWinABlock);
  //   const blocksPerDay = new BigNumber(4608);
  //   const blockWinsPerDay = blocksPerDay.dividedBy(avgBlocksTillWin);
  //   const avgTimeToWinInMinutes = new BigNumber(24 * 60).dividedBy(blockWinsPerDay);

  //   return `≈ ${moment.duration(avgTimeToWinInMinutes, 'minutes').humanize()}`;
  // }
}
