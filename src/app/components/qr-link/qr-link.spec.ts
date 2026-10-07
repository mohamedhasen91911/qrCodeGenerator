import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrLink } from './qr-link';

describe('QrLink', () => {
  let fixture: ComponentFixture<QrLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrLink],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(QrLink);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with the example link and a QR code', () => {
    const input = inputElement();
    const qrcode = qrCode();

    expect(input.value).toBe('www.example.com');
    expect(input.placeholder).toBe('https://');
    expect(labelText()).toContain('Link');
    expect(qrcode.componentInstance.qrdata).toBe('www.example.com');
    expect(qrcode.componentInstance.width).toBe(240);
    expect(qrcode.componentInstance.margin).toBe(1);
    expect(qrcode.componentInstance.errorCorrectionLevel).toBe('M');
    expect(qrcode.componentInstance.elementType).toBe('img');
    expect(qrcode.componentInstance.alt).toBe('QR code for the entered link');
    expect(emptyMessage()).toBeNull();
  });

  it('should update the QR code when the link changes', async () => {
    setLink('https://angular.dev');
    await fixture.whenStable();

    expect(inputElement().value).toBe('https://angular.dev');
    expect(qrCode().componentInstance.qrdata).toBe('https://angular.dev');
    expect(emptyMessage()).toBeNull();
  });

  it('should show a placeholder when the link is cleared', async () => {
    setLink('');
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('qrcode'))).toBeNull();
    expect(emptyMessage()?.textContent).toContain('Your QR code will appear here');
  });

  it('should show the QR code again after a cleared link is filled in', async () => {
    setLink('');
    await fixture.whenStable();

    setLink('https://example.com/page');
    await fixture.whenStable();

    expect(qrCode().componentInstance.qrdata).toBe('https://example.com/page');
    expect(emptyMessage()).toBeNull();
  });

  function inputElement(): HTMLInputElement {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    return input as HTMLInputElement;
  }

  function setLink(value: string): void {
    const input = inputElement();
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function qrCode() {
    const qrcode = fixture.debugElement.query(By.directive(QRCodeComponent));
    expect(qrcode).toBeTruthy();
    return qrcode;
  }

  function labelText(): string {
    return fixture.nativeElement.querySelector('mat-label')?.textContent ?? '';
  }

  function emptyMessage(): HTMLElement | null {
    return fixture.nativeElement.querySelector('p');
  }
});
