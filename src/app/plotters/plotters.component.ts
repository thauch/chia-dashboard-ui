import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {StateService} from '../state.service';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plotters-component',
  templateUrl: './plotters.component.html',
  styleUrls: ['./plotters.component.scss']
})
export class PlottersComponent implements OnInit {
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
  
  get plotters() {
    return this.stateService.plotters;
  }

}