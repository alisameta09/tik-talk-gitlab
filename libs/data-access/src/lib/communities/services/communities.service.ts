import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { communityUrl } from '@tt/shared'
import { CommunityInterface } from '../index'
import { Pageble } from 'libs/data-access/src'
import { CommunityPageInterface } from '@tt/data-access/communities/interfaces/community.interface'

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  http = inject(HttpClient)

  filterCommunities(params: Record<string, any>) {
    return this.http.get<Pageble<CommunityInterface>>(communityUrl, { params })
  }

  getCommunityById(communityId: number) {
    return this.http.get<CommunityPageInterface>(`${communityUrl}${communityId}`)
  }
}
