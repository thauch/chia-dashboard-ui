import {Component, Inject, Input, OnInit} from '@angular/core';
import {StateService} from '../state.service';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {WINDOW} from '../window.provider';
import {Router} from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';

@Component({
  selector: 'app-account-dashboard-order',
  templateUrl: './account-dashboard-order.component.html',
  styleUrls: ['./account-dashboard-order.component.scss']
})
export class AccountDashboardOrderComponent implements OnInit {
  public sortablejs = SortablejsModule;
  private defOrder = ["Plotters", "Harvesters", "Farmers", "Full Nodes", "Wallets"];

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
    if (this.user.satelliteOrder == 0) {
      const order = this.defOrder;
      return order;
    }
    const order = this.user.satelliteOrder;
    return [
      order[0],
      order[1],
      order[2],
      order[3],
      order[4]
    ]
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
}
