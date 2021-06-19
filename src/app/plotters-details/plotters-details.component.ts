import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {StateService} from '../state.service';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-plotters-details-component',
  templateUrl: './plotters-details.component.html',
  styleUrls: ['./plotters-details.component.scss']
})

export class PlottersDetailsComponent implements OnInit {
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

  get plotters() {
    console.log(this.stateService.plotters);
    return this.stateService.plotters;
  }

  status(plotter) {
    if (this.lastUpdatedState(plotter) !== 0) {
      return 'Unknown';
    }
    if (this.runningJobsCount(plotter) > 0) {
      return 'Plotting';
    }
    if (this.pendingJobsCount(plotter) > 0) {
      return 'Stuck';
    }

    return 'Idle';
  }

  colorClassForStatus(plotter) {
    const status = this.status;
    if (status(plotter) === 'Plotting') {
      return 'color-green';
    }
    if (status(plotter) === 'Unknown') {
      return 'color-orange';
    }
    if (status(plotter) === 'Stuck') {
      return 'color-red';
    }

    return 'color-blue';
  }

  runningJobsCount(plotter) {
    return this.runningJobs(plotter).length;
  }

  pendingJobsCount(plotter) {
    return this.jobs(plotter).filter(job => job.state === 'SUBMITTED').length;
  }

  runningJobs(plotter) {
    return this.jobs(plotter).filter(job => job.state === 'RUNNING');
  }

  jobs(plotter) {
    return plotter.jobs;
  }
  
  drives(plotter) {
    let driveList = [];
      if (plotter.drives != undefined) {
        plotter.drives.forEach(drive => {
          const singleDrive = {
            letter: drive.letter,
            type: drive.type,
            total: drive.total,
            used: drive.used,
            percent: drive.percent
          };
          driveList.push(singleDrive);
        });
      }
    return driveList;
  }

  reverse: boolean=true
    sort() {
      this.reverse=!this.reverse
  }

  getJobProgress(job) {
    if (job.progress === undefined) {
      return 'N/A';
    }

    return `${(job.progress * 100).toFixed(2)}%`;
  }

  getJobRuntime(job) {
    if (!job.startedAt) {
      return 'N/A';
    }

    return moment(job.startedAt).fromNow(true);
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

  lastUpdatedState(plotter) {
    const diff = moment().diff(plotter.lastUpdate, 'minutes');
    const diffSatelliteUpdate = moment().diff(plotter.satelliteUpdatedAt, 'minutes');
    if (diff < 11 || diffSatelliteUpdate < 3) {
      return 0;
    }
    if (diff < 20 || diffSatelliteUpdate < 7) {
      return 1;
    }
    return 2;
  }

}
