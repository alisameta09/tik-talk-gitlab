import { Route } from '@angular/router'
import { CommunitiesSearchPageComponent } from '../feature-communities-list/search-page/communities-search-page.component'
import { CommunityPageComponent } from '../feature-community-page/community-page/community-page.component'
import { CommunityFeedPageComponent } from '../feature-community-page/community-feed-page/community-feed-page.component'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { CommunityEffects, communityFeature } from '@tt/data-access/communities'
import { PostEffects, postFeature } from '@tt/data-access/posts'

export const communitiesRoutes: Route[] = [
  {
    path: '',
    component: CommunitiesSearchPageComponent
  },
  {
    path: ':id',
    component: CommunityPageComponent,
    children: [
      {
        path: '',
        component: CommunityFeedPageComponent,
        providers: [
          provideState(postFeature),
          provideEffects(PostEffects)
        ],
      }
    ]
  },
]
