import { CommunitiesService } from '../services/communities.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { communityActions } from '../store/actions'
import { inject, Injectable } from '@angular/core'
import { map, switchMap, tap, withLatestFrom } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectCommunitiesFilters, selectCommunitiesPageble } from './selectors'
import { Router } from '@angular/router'
import {PostService } from '../../posts/services/post.service'

@Injectable({
  providedIn: 'root',
})
export class CommunityEffects {
  communitiesService = inject(CommunitiesService)
  postService = inject(PostService)
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
      switchMap(({ payload }) =>
        this.communitiesService.createCommunity(payload)
          .pipe(
            switchMap(communityPage => [
              communityActions.navigateToCommunity({ id: communityPage.id }),
            ])
          )
      )
    )
  })

  navigateToCommunity = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(communityActions.navigateToCommunity),
        tap(({ id }) =>
          this.router.navigate(['/communities', id]))
      )
    },
    { dispatch: false }
  )

  loadCommunity = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.loadCommunity),
      switchMap(({ id }) =>
        this.communitiesService.getCommunityById(id)),
      map(communityPage => communityActions.loadCommunitySuccess({ communityPage }))
    )
  })

  loadSubscribers = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.loadSubscribers),
      switchMap(({ id }) =>
        this.communitiesService.getCommunitySubscribers(id)
          .pipe(map(res =>
            communityActions.loadSubscribersSuccess({ subscribers: res.items })))
      )
    )
  })

  joinCommunity = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.joinCommunity),
      switchMap(({ id }) =>
        this.communitiesService.joinCommunity(id)),
      map(community =>
        communityActions.updateCommunity({ community }))
    )
  })

  leaveCommunity = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.leaveCommunity),
      switchMap(({ id }) =>
        this.communitiesService.leaveCommunity(id)),
      map((community) =>
        communityActions.updateCommunity({ community }))
    )
  })

  createCommunityPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.createCommunityPost),
      switchMap(({ payload }) => this.postService.createPost(payload)
        .pipe(map(() => communityActions.loadCommunityPosts({ id: payload.communityId }))
        )
      )
    )
  })

  loadCommunityPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.loadCommunityPosts),
      switchMap(({ id }) =>
        this.communitiesService.getCommunityPosts(id).pipe(
          map(res =>
            communityActions.loadCommunityPostsSuccess({ posts: res.items })))
      )
    )
  })
}
