import { inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { communityUrl } from '@tt/shared'
import { CommunityInterface } from '../index'
import { Pageble } from 'libs/data-access/src'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  http = inject(HttpClient)

  filterCommunities(params: Record<string, any>) {
    return this.http.get<Pageble<CommunityInterface>>(communityUrl, {params})
  }
}
