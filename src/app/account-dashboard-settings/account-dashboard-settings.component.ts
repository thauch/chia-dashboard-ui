import {Component, Inject, Input, OnInit} from '@angular/core';
import {StateService} from '../state.service';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {WINDOW} from '../window.provider';
import {Router} from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';
import { faTrash, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-account-dashboard-settings',
  templateUrl: './account-dashboard-settings.component.html',
  styleUrls: ['./account-dashboard-settings.component.scss']
})
export class AccountDashboardSettingsComponent implements OnInit {
  public sortablejs = SortablejsModule;
  private defOrder = ["Plotters", "Harvesters", "Farmers", "Full Nodes", "Wallets"];
  public visibility = {};
  private defVisibility = {
    "Plotters": true,
    "Harvesters": true,
    "Farmers": true,
    "Full Nodes": true,
    "Wallets": true
  };
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private toastService: ToastService,
    @Inject(WINDOW) private window: Window,
    private router: Router,
  ) {}

  async ngOnInit() {
    if (!this.apiService.isAuthenticated) {
      await this.router.navigate(['/login']);
      return;
    }
    await this.stateService.init();
  }

  get isInitialLoading() {
    return this.stateService.isInitialLoading;
  }

  get user() {
    const user = this.stateService.user;
    return user;
  }
  
  get satelliteOrder() {
    let order = [];
    if (!this.user.satelliteOrder|| this.user.satelliteOrder == 0) {
      order = this.defOrder;
    }
    else {
      order = [
        this.user.satelliteOrder[0],
        this.user.satelliteOrder[1],
        this.user.satelliteOrder[2],
        this.user.satelliteOrder[3],
        this.user.satelliteOrder[4]
      ];
    }
    return order;
  }

  get visibleGroups() {
    if (!this.user.visibleGroups || this.user.visibleGroups.length == 0) {
      this.visibility = this.defVisibility;
    }
    else  {
      this.visibility = this.user.visibleGroups;
    };
    return this.visibility;
  }

  changeVisibility(group) {
    this.visibility[group.key] = !group.value;
  }

  async defaultOrder() {
    const satelliteOrder = this.defOrder;
    await this.apiService.updateUser({ data: { satelliteOrder } });
    this.toastService.showSuccessToast(`Dashboard Order is Reset`);
    await this.stateService.updateUser();
  }

  async saveOrder() {
    const satelliteOrder = this.satelliteOrder;
    await this.apiService.updateUser({ data: { satelliteOrder } });
    this.toastService.showSuccessToast(`Dashboard Order is Updated`);
    await this.stateService.updateUser();
  }

  async defaultVisibility() {
    const visibleGroups = this.defVisibility;
    await this.apiService.updateUser({ data: { visibleGroups } });
    this.toastService.showSuccessToast(`Dashboard Visibility is Reset`);
    await this.stateService.updateUser();
  }

  async saveVisibility() {
    const visibleGroups = this.visibleGroups;
    await this.apiService.updateUser({ data: { visibleGroups } });
    this.toastService.showSuccessToast(`Dashboard Visibility is Updated`);
    await this.stateService.updateUser();
  }
}
