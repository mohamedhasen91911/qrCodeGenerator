import { Component } from '@angular/core';
import { QrLink } from './components/qr-link/qr-link';

@Component({
  imports: [QrLink],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
