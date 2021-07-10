import { FarmersComponent } from './farmers/farmers.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import {WINDOW_PROVIDERS} from "./window.provider";
import { EmptyStateComponent } from './empty-state/empty-state.component';
import {LoginComponent} from './login/login.component';
import {LoadingStateModule} from './loading-state/loading-state.module';
import {AddNewSatelliteModalComponent} from './add-new-satellite-modal/add-new-satellite-modal.component';
import { SatelliteListComponent } from './satellite-list/satellite-list.component';
import { SatelliteComponent } from './satellite/satellite.component';
import { WalletComponent } from './wallet/wallet.component';
import { FullNodeComponent } from './full-node/full-node.component';
import { HarvesterComponent } from './harvester/harvester.component';
import { FarmSummaryChiaComponent } from './farm-summary-chia/farm-summary-chia.component';
import { WalletSummaryChiaComponent } from './wallet-summary-chia/wallet-summary-chia.component';
import { DownloadLinksComponent } from './download-links/download-links.component';
import { FarmerComponent } from './farmer/farmer.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PlotterComponent } from './plotter/plotter.component';
import { EditableModule } from '@ngneat/edit-in-place';
import {ClipboardModule} from 'ngx-clipboard';
import { AccountShareDashboardComponent } from './account-share-dashboard/account-share-dashboard.component';
import { SharedDashboardComponent } from './shared-dashboard/shared-dashboard.component';
import { OrderModule } from 'ngx-order-pipe';
import { HPoolDashboardComponent } from './hpool-dashboard/hpool-dashboard.component';
import { HPoolMinerComponent } from './hpool-miner/hpool-miner.component';
import { PlottersDrivesComponent } from './plotters-drives/plotters-drives.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { ChiaStatsComponent } from './chia-stats/chia-stats.component';
import { PlottersComponent } from './plotters/plotters.component';
import { PlottersDetailsComponent } from './plotters-details/plotters-details.component';
import { HarvestersComponent } from './harvesters/harvesters.component';
import { AccountDashboardSettingsComponent } from './account-dashboard-settings/account-dashboard-settings.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { DataTablesModule } from "angular-datatables";
import { FarmSummaryFlaxComponent } from './farm-summary-flax/farm-summary-flax.component';
import { FarmSummarySpareComponent } from './farm-summary-spare/farm-summary-spare.component';
import { WalletSummaryFlaxComponent } from './wallet-summary-flax/wallet-summary-flax.component';
import { WalletSummarySpareComponent } from './wallet-summary-spare/wallet-summary-spare.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    EmptyStateComponent,
    LoginComponent,
    AddNewSatelliteModalComponent,
    SatelliteListComponent,
    SatelliteComponent,
    WalletComponent,
    FullNodeComponent,
    HarvesterComponent,
    FarmSummaryChiaComponent,
    WalletSummaryChiaComponent,
    DownloadLinksComponent,
    FarmerComponent,
    ConfirmationModalComponent,
    PlotterComponent,
    AccountShareDashboardComponent,
    SharedDashboardComponent,
    HPoolDashboardComponent,
    HPoolMinerComponent,
    PlottersDrivesComponent,
    GlobalStatsComponent,
	  ChiaStatsComponent,
    PlottersComponent,
    PlottersDetailsComponent,
    HarvestersComponent,
    FarmersComponent,
    AccountDashboardSettingsComponent,
    FarmSummaryFlaxComponent,
    FarmSummarySpareComponent,
    WalletSummaryFlaxComponent,
    WalletSummarySpareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    LoadingStateModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      newestOnTop: false,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    NgxScrollTopModule,
    EditableModule,
    ReactiveFormsModule,
    ClipboardModule,
    OrderModule,
    DataTablesModule,
    SortablejsModule.forRoot({ 
      animation: 150 
    }),
  ],
  providers: [
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }