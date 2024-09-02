import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store'; // Import Store
import { AppState } from 'src/store/AppState'; // Corrected import path for AppState

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>) { }

  canLoad(): Observable<boolean> {
    return of(true);
  }
}
