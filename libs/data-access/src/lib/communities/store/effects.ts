import { CommunitiesService } from '../services/communities.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { communityActions } from '../store/actions'
import { inject, Injectable } from '@angular/core'
import { map, switchMap, tap, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCommunitiesFilters, selectCommunitiesPageble } from './selectors'
import { CommunityPage } from '@tt/data-access/communities/interfaces/community.interface'
import { Router } from '@angular/router'
import { profileActions } from '@tt/data-access/profile'

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communitiesService = inject(CommunitiesService)
  actions$ = inject(Actions)
  store = inject(Store)
  router = inject(Router)

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.filterCommunities, communityActions.setPage),
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

  createCommunity = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.createCommunity),
      switchMap(({ payload }) => {
        return this.communitiesService.createCommunity(payload).pipe(
          map((community) => communityActions.communityLoaded({ community })))
      })
    )
  })

  navigateAfterCreate$ = createEffect(() =>
      this.actions$.pipe(
        ofType(communityActions.communityLoaded),
        tap(({ community }) => {
          this.router.navigate(['/communities', community.id])
        })
      ),
    { dispatch: false }
  )

  fetchCommunityById = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.fetchCommunityById),
      switchMap(({communityId}) => this.communitiesService.getCommunityById(communityId)),
      map((community) => communityActions.communityLoaded({ community }))
    )
  })

  fetchSubscribers = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.fetchSubscribers),
      switchMap(({ communityId }) => this.communitiesService.getCommunitySubscribers(communityId)
        .pipe(map(res => communityActions.subscribersLoaded({subscribers: res.items})))),
    )
  })
}
