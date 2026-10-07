import { Component, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-link',
  imports: [MatFormField, MatLabel, MatInput, QRCodeComponent],
  templateUrl: './qr-link.html',
  styleUrl: './qr-link.css',
})
export class QrLink {

  protected readonly link = signal('www.example.com');



  protected updateLink(value: string): void {
    this.link.set(value);
  }
}
