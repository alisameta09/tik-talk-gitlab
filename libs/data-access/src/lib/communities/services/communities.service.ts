import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { communityUrl } from '@tt/shared'
import { CommunityInterface } from '../index'
import { Pageble } from 'libs/data-access/src'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  http = inject(HttpClient)

  getCommunities() {
    return this.http.get<Pageble<CommunityInterface>>(communityUrl)
        .pipe(map(res => res.items))
  }
}
