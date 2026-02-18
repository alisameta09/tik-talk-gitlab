import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommunitiesFiltersComponent } from '../index'
import { ResizePageDirective, SvgIconComponent } from '@tt/common-ui'
import { CommunityCardComponent } from '../../ui/community-card/community-card.component'
import { communityActions, selectFilteredCommunities } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { RouterOutlet } from '@angular/router'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'

@Component({
  selector: 'tt-communities-search-page',
  imports: [
    CommunitiesFiltersComponent,
    SvgIconComponent,
    CommunityCardComponent,
    ResizePageDirective,
    RouterOutlet,
    InfiniteScrollDirective,
  ],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {
  store = inject(Store)

  communities = this.store.selectSignal(selectFilteredCommunities)

  timeToFetch() {
    this.store.dispatch(communityActions.setPage({}))
  }

  onScroll() {
    this.timeToFetch()
  }
}
