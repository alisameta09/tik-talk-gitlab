import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs';
import {profileUrl} from '@tt/shared';
import {GlobalStoreService, Profile} from '../index';
import {Pageble} from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  #globalStoreService = inject(GlobalStoreService);

  me = signal<Profile | null>(null);

  getMe() {
    return this.http.get<Profile>(`${profileUrl}me`)
      .pipe(tap((res) => {
        this.me.set(res);
        this.#globalStoreService.me.set(res);
      }));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${profileUrl}${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageble<Profile>>(`${profileUrl}subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${profileUrl}me`, profile)
      .pipe(
        tap(res => {
          this.me.set(res);
          this.#globalStoreService.me.set(res);
        })
      )
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(`${profileUrl}upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${profileUrl}accounts`, {params})
  }
}
