import {Component, Inject, Input, OnInit} from '@angular/core';
import {StateService} from '../state.service';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {WINDOW} from '../window.provider';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-share-dashboard',
  templateUrl: './account-share-dashboard.component.html',
  styleUrls: ['./account-share-dashboard.component.scss']
})
export class AccountShareDashboardComponent implements OnInit {
  public faCopy = faCopy;

  constructor(
    private stateService: StateService,
    private apiService: ApiService,
    private toastService: ToastService,
    @Inject(WINDOW) private window: Window,
    private router: Router,
  ) { }

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

  get shareUrl() {
    return `${this.window.location.protocol}//${this.window.location.host}/shared/${this.user.shareKey}`;
  }

  async toggleShared() {
    const isShared = !this.user.shareKey;
    await this.apiService.updateUser({ data: { isShared } });
    this.toastService.showSuccessToast(`Dashboard is ${isShared ? 'shared' : 'not shared anymore'} now!`);
    await this.stateService.updateUser();
  }
}
