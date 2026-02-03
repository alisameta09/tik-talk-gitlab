import { CommunitiesService } from '../services/communities.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { communityActions } from '../store/actions'
import { inject, Injectable } from '@angular/core'
import { map, switchMap, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCommunitiesFilters, selectCommunitiesPageble } from '@tt/data-access/communities'

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communitiesService = inject(CommunitiesService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        communityActions.filterCommunities,
        communityActions.setPage
      ),
      withLatestFrom(
        this.store.select(selectCommunitiesFilters),
        this.store.select(selectCommunitiesPageble)
      ),

      switchMap(([_, filters, pageble]) => {
        return this.communitiesService.filterCommunities({
          ...pageble,
          ...filters,
        })
      }),
      map((res) => communityActions.communitiesLoaded({ communities: res.items }))
    )
  })
}
