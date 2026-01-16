import { CommunitiesService } from '../services/communities.service'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { communityActions } from '../store/actions'
import {inject, Injectable} from '@angular/core'
import {map, switchMap} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communitiesService = inject(CommunitiesService)
  actions$ = inject(Actions)

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.filterCommunities),
      switchMap(({filters}) => {
        return this.communitiesService.filterCommunities((filters))
      }),
      map(res => communityActions.communitiesLoaded({communities: res.items}))
    )
  })
}
