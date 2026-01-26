import {Route} from '@angular/router'
import {CommunitiesSearchPageComponent} from '../../feature-communities-list/search-page/communities-search-page.component'
import {CommunityPageComponent} from './community-page.component'

export const communitiesRoutes: Route[] = [
  {
    path: '',
    component: CommunitiesSearchPageComponent,
    children: [{path: ':id', component: CommunityPageComponent}]
  }
]
