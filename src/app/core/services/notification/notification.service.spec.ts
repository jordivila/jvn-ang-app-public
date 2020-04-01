import { CommonModule } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './notification.service';


describe('Notification Service', () => {

  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        NotificationService,
      ]
    });


    notificationService = TestBed.inject(NotificationService);

  });


  it('should create service', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should wrap open snackbar method when invoking "success" and close automatically after 3500 ms', () => {
    spyOn(notificationService.snackBar, 'open').and.callThrough();
    notificationService.success('great !!');
    expect(notificationService.snackBar.open).toHaveBeenCalled();
    expect((notificationService.snackBar.open as jasmine.Spy).calls.mostRecent().args[2].duration).toEqual(3500);
  });

  it('should wrap open snackbar method when invoking "error" and do NOT close it until user clicks on it', fakeAsync(() => {
    spyOn(notificationService.snackBar, 'open').and.callThrough();
    const snackRef = notificationService.error('Ooops...');
    let isClosed = false;
    expect(notificationService.snackBar.open).toHaveBeenCalled();
    tick(5000);
    expect(isClosed).toEqual(false);
    snackRef.onAction().subscribe(() => isClosed = true);
    snackRef.dismissWithAction();
    expect(isClosed).toEqual(true);
  }));

  it('should wrap open snackbar method when invoking "errorUnhandled" and invoke callback when user closes it', () => {
    let actionInvoked = false;
    spyOn(notificationService.snackBar, 'open').and.callThrough();
    const snackRef = notificationService.errorUnhandled('Catastrophic error !!!...', 'this is bad', () => {
      actionInvoked = true;
    }, null);
    expect(notificationService.snackBar.open).toHaveBeenCalled();
    snackRef.dismissWithAction();
    expect(actionInvoked).toEqual(true);
  });

});
