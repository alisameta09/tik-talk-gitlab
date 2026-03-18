import { Route } from '@angular/router'
import { CommunitiesSearchPageComponent } from '../../feature-communities-list/search-page/communities-search-page.component'
import { CommunityPageComponent } from './community-page.component'
import { CommunityFeedPageComponent } from '../community-feed-page/community-feed-page.component'

export const communitiesRoutes: Route[] = [
  {
    path: '',
    component: CommunitiesSearchPageComponent,
  },
  {
    path: ':id',
    component: CommunityPageComponent,
    children: [
      {
        path: '',
        component: CommunityFeedPageComponent
      }
    ]
  },
]
