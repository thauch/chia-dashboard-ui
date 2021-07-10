import { Component, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {StateService} from '../state.service';
import {AddNewSatelliteModalComponent} from '../add-new-satellite-modal/add-new-satellite-modal.component';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(AddNewSatelliteModalComponent) child;

  public isMenuCollapsed = true;
  public faHeart = faHeart;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) {}

  get selectedCurrency() {
    return this.stateService.selectedCurrency;
  }

  get selectedDashboard() {
    return this.stateService.selectedDashboard;
  }

  get currencies() {
    return this.stateService.currencies;
  }

  get dashboardTypes() {
    return ['Chia', 'Flax','Spare','All'];
  }

  setSelectedCurrency(currency) {
    this.stateService.setSelectedCurrency(currency);
  }

  setSelectedDashboard(dashboard) {
    this.stateService.setSelectedDashboard(dashboard);
  }

  toggleMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  onTabButtonClick() {
    this.isMenuCollapsed = true
  }

  get isAuthenticated() {
    return this.apiService.isAuthenticated;
  }
  
  get hasShareKey() {
    return !!this.apiService.shareKey;
  }
  
  async logout() {
    await this.stateService.logout();
  }

  openAddSatelliteModal() {
    this.child.openModal();
  }

  get user() {
    return this.stateService.user;
  }

  displayName() {
    if (this.user.username != null) {
      return this.user.username;
    }
    if (this.user.firstName != null) {
      return this.user.firstName;
    }
    if (this.user.email != null) {
      return this.user.email;
    }
    return "User";
  }
}
