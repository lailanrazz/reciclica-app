import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router'; // Import Router
import { Observable, of } from 'rxjs'; // Import Observable and of
import { Store } from '@ngrx/store';
import { take, switchMap } from 'rxjs/operators';
import { AppState } from 'src/store/AppState'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router: Router) { } // Corrected syntax

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
        if (loginState.isLoggedIn) {
          return of(true);
        } else {
          this.router.navigateByUrl('login');
          return of(false);
        }
      })
    );
  }
}
