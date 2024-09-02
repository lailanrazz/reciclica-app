import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule
import { User } from 'src/app/model/user/User';
import { loginReducer } from 'src/store/login/login.reducers';
import { AuthGuard } from './auth-guard.service';
import { loginSuccess } from 'src/store/login/login.actions'; // Import the loginSuccess action
import { AppState } from 'src/store/AppState'; // Ensure this path is correct

describe('AuthGuardService', () => {
  let service: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]), // Import RouterModule
        StoreModule.forRoot({}),
        StoreModule.forFeature('login', loginReducer)
      ]
    });

    service = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store); // Use inject instead of get
    router = TestBed.inject(Router); // Use inject instead of get
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({ user: new User() })); // Dispatch loginSuccess action
    service.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    });
  });

  it('should not allow access to page if user is not logged in', () => {
    service.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    });
  });

  it('should redirect unauthenticated user to the login page', () => {
    spyOn(router, 'navigateByUrl');

    service.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  });
});
