import {Component, Inject, OnInit} from '@angular/core';
import {StateService} from '../state.service';
import {ApiService} from '../api.service';
import {ToastService} from '../toast.service';
import {WINDOW} from '../window.provider';
import {Router} from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';
import { faEyeSlash, faEye, faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-account-notification-settings',
  templateUrl: './account-notification-settings.component.html',
  styleUrls: ['./account-notification-settings.component.scss']
})
export class AccountNotificationSettingsComponent implements OnInit {
  public faBell = faBell;
  public faBellSlash = faBellSlash;
  public sortablejs = SortablejsModule;
  public notifications = {};
  private defNotifications = {
    "Service": {
      "Discord": false,
      "Telegram": false
    },
    "Accounts": {
      "Discord": false,
      "Telegram": false
    },
    "Summary": {
      "Degraded": false,
      "Unknown": false,
      "Problem": false
    },
    "Plotters": {
      "Unknown": false,
      "Idle": false,
      "Stuck": false,
      "Drive Full": false,
      
    },
    "Harvesters": {
      "Unknown": false,
      "Disconnected": false,
    },
    "Farmers": {
      "Unknown": false,
      "Not Farming": false,
      "Response Time": false
    },
    "Full Nodes": {
      "Unknown": false,
      "Not synced": false,
    },
    "Wallets": {
      "Unknown": false,
      "Not synced": false,
    }
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
  
  get notificationSettings() {
    if (!this.user.notifications || this.user.notifications.length == 0) {
      this.notifications = this.defNotifications;
    }
    else  {
      this.notifications = this.user.notifications;
    };
    return this.notifications;
  }

  changeNotification(setting, group) {
    this.notifications[group][setting.key] = !setting.value;
  }

  changeAccountSetting(setting, group, newValue) {
    this.notificationSettings[group][setting.key] = newValue;
  }

  async defaultNotifications() {
    const notifications = this.defNotifications;
    await this.apiService.updateUser({ data: { notifications } });
    this.toastService.showSuccessToast(`Notification Settings are Reset`);
    await this.stateService.updateUser();
  }

  async saveNotifications() {
    const notifications = this.notifications;
    await this.apiService.updateUser({ data: { notifications } });
    this.toastService.showSuccessToast(`Notification Settings are Saved`);
    await this.stateService.updateUser();
  }
}
