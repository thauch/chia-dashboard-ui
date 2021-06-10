import {Component, Input, OnInit} from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import {ApiService} from '../api.service';
import {StateService} from '../state.service';
import {ToastService} from '../toast.service';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.scss']
})
export class PlotterComponent implements OnInit {
  @Input() satelliteId: any;
  @Input() plotter: any;
  @Input() collapsed: any;
  isCollapsed: boolean;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private toastService: ToastService,
    ) { 
    this.isCollapsed = false;
  }

  ngOnInit(): void {
  }

  trackBy(index, item) {
    return item.id;
  }

  get satelliteName() {
    return this.plotter.satelliteName;
  }

  get status() {
    if (this.lastUpdatedState !== 0) {
      return 'Unknown';
    }
    if (this.runningJobsCount > 0) {
      return 'Plotting';
    }
    if (this.pendingJobsCount > 0) {
      return 'Stuck';
    }

    return 'Idle';
  }

  get colorClassForStatus() {
    const status = this.status;
    if (status === 'Plotting') {
      return 'color-green';
    }
    if (status === 'Unknown') {
      return 'color-orange';
    }
    if (status === 'Stuck') {
      return 'color-red';
    }

    return 'color-blue';
  }

  get runningJobsCount() {
    return this.runningJobs.length;
  }

  get pendingJobsCount() {
    return this.jobs.filter(job => job.state === 'SUBMITTED').length;
  }

  get runningJobs() {
    return this.jobs.filter(job => job.state === 'RUNNING');
  }

  get jobs() {
    return this.plotter.jobs;
  }

  get drives() {
    return this.plotter.drives;
  }

  get tempDrives() {
    let temp = []
    this.plotter.drives.map((x) => {
      if (x.type == "t") {
        temp.push(x)
      }
    });
    return temp;
  }

  get destDrives() {
    let dest = []
    this.plotter.drives.map((x) => {
      if (x.type == "d") {
        dest.push(x)
      }
    });
    return dest;
  }

  get completedPlotsToday() {
    return this.plotter.completedPlotsToday;
  }

  get completedPlotsYesterday() {
    return this.plotter.completedPlotsYesterday;
  }

  get cpu() {
    return this.plotter.cpu;
  }
  
  get ram() {
    return this.plotter.ram;
  }

  get collapsedState() {
    return this.plotter.collapsedState;
  }
  
  async toggleCollapse() {
    const newCollapsedValue = !this.collapsedState;
    this.plotter.collapsedState = newCollapsedValue;
    await this.apiService.updateSatellite({ id: this.plotter.satelliteId, data: { collapsed: newCollapsedValue } });
  }

  get lastUpdatedBefore() {
    if (moment(this.plotter.satelliteUpdatedAt).isAfter(this.plotter.lastUpdate)) {
      return moment(this.plotter.satelliteUpdatedAt).fromNow();
    }

    return moment(this.plotter.lastUpdate).fromNow();
  }

  getJobRuntime(job) {
    if (!job.startedAt) {
      return 'N/A';
    }

    return moment(job.startedAt).fromNow(true);
  }

  getJobProgress(job) {
    if (job.progress === undefined) {
      return 'N/A';
    }

    return `${(job.progress * 100).toFixed(2)}%`;
  }

  shortenDriveName(name) {
    if (name.length >= 8) {
    return name.substring(0,7)+'..';
    }
    return name;
  }
  
  driveFreeSpace(used, total) {
    return this.formatBytes(total - used);
  }

  formatBytes(bytes) {
    return (bytes / Math.pow(1024, 4)).toFixed(2);
  }

  percentRound(percent) {
    return Math.round(percent);
  }

  driveFullIndicator(percent) {
    if (this.percentRound(percent) >= 98) {
      return 'color-red';
    }
    if (this.percentRound(percent) >= 90) {
      return 'color-orange';
    }
    return 'color-green';
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
