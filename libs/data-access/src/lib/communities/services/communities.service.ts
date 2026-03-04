import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { communityUrl } from '@tt/shared'
import { Pageble } from '../../profile/interfaces/pageble.interface'
import { Admin, Community, CommunityPage, CreateCommunityDTO } from '../interfaces/community.interface'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommunitiesService {
  http = inject(HttpClient)

  filterCommunities(params: Record<string, any>) {
    return this.http.get<Pageble<Community>>(communityUrl, { params })
  }

  joinCommunity(communityId: number) {
    return this.http.post<Community>(`${communityUrl}${communityId}/join`, {})
  }

  leaveCommunity(communityId: number) {
    return this.http.delete<Community>(`${communityUrl}${communityId}/join`)
  }

  createCommunity(payload: CreateCommunityDTO) {
    return this.http.post<CommunityPage>(communityUrl, payload)
  }

  getCommunityById(communityId: number) {
    return this.http.get<CommunityPage>(`${communityUrl}${communityId}`)
  }

  getCommunitySubscribers(communityId: number) {
    return this.http.get<Pageble<Admin>>(`${communityUrl}subscribers/${communityId}`)
      .pipe(map(res => res.items.slice(0,6))
    )
  }

}
