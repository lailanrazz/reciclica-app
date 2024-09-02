import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators'; // Import `take` and `map`
import { AppState } from 'src/store/AppState'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      map(loginState => loginState.isLoggedIn)
    );
  }
}
