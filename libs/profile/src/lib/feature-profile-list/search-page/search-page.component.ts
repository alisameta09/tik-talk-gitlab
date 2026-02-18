import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component'
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component'
import { profileActions, selectFilteredProfiles } from '@tt/data-access/profile'
import { ResizePageDirective } from '@tt/common-ui'

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollDirective,
    InfiniteScrollDirective,
    ResizePageDirective,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles)

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }

  onScroll() {
    this.timeToFetch()
  }
}
