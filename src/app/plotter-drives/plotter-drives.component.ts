import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {StateService} from '../state.service';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-plotter-drives-component',
  templateUrl: './plotter-drives.component.html',
  styleUrls: ['./plotter-drives.component.scss']
})

export class PlotterDrivesComponent implements OnInit {
  // dtOptions: DataTables.Settings = {}
  @Input() plotter: any;
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
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    await this.stateService.init();
  }

  trackBy(index, item) {
    return item.satelliteId;
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }
  
  get satelliteName() {
    return this.plotter.satelliteName;
  }

  
  get drives() {

    let driveList = [];
    const plotters = this.stateService.plotters;
    plotters.forEach((plotter) => {
      const satelliteName = plotter.satelliteName;
      const lastUpdate = plotter.lastUpdate;
      const status = plotter.status;
      plotter.drives.forEach(drive => {
        if (drive.type != "t") {
        const singleDrive = {
          name: satelliteName,
          lastUpdate: lastUpdate,
          status: status,
          letter: drive.letter,
          total: drive.total,
          used: drive.used,
          percent: drive.percent
        };
        driveList.push(singleDrive);
      }
      });;
    })
    return driveList;
  }

  reverse: boolean=true
    sort() {
      this.reverse=!this.reverse
  }

  formatBytes(bytes) {
    return (bytes / Math.pow(1024, 4)).toFixed(2);
  }

  driveUsedPercent(used, total) {
    return Math.round(used/total*100);
  }

  driveFreeSpace(used, total) {
    return total - used;
  }

  driveFreePercent(used, total) {
    return Math.round((total-used)/total*100);
  }

  driveFreeIndicator(used, total) {
    if ((total - used ) / Math.pow(1024, 3) < 200 ) {
      return 2;
    }
    if ((total - used ) / Math.pow(1024, 3) >= 200 && ((total - used )) / Math.pow(1024, 3) <= 400) {
      return 1;
    }
    return 0;
  }

  get lastUpdatedState() {
    const diff = moment().diff(this.plotter.lastUpdate, 'minutes');
    const diffSatelliteUpdate = moment().diff(this.plotter.satelliteUpdatedAt, 'minutes');
    if (diff < 11 || diffSatelliteUpdate < 3) {
      return 0;
    }
    if (diff < 20 || diffSatelliteUpdate < 7) {
      return 1;
    }
    return 2;
  }

}
