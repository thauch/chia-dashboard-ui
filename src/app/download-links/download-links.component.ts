import { Component, OnInit } from '@angular/core';
import { faDownload, faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download-links',
  templateUrl: './download-links.component.html',
  styleUrls: ['./download-links.component.scss']
})
export class DownloadLinksComponent implements OnInit {
  public faDownload = faDownload;
  public faCopy = faCopy;

  constructor() { }

  ngOnInit(): void {
  }

  get binaryDownloadUrl() {
    return 'https://github.com/felixbrucker/chia-dashboard-satellite/releases/latest';
  }
  get binaryDownloadUrlFlax() {
    return 'https://github.com/thauch/flax-dashboard-satellite/releases/latest';
  }
  get binaryDownloadUrlChaingreen() {
    return 'https://github.com/thauch/chaingreen-dashboard-satellite/releases/latest';
  }
  get binaryDownloadUrlSpare() {
    return 'https://github.com/thauch/spare-dashboard-satellite/releases/latest';
  }
}
