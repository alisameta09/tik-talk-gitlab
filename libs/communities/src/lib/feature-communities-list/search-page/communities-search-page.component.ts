import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommunitiesFiltersComponent } from '../index'
import { ResizePageDirective, SvgIconComponent } from '@tt/common-ui'
import { CommunityCardComponent } from '../../ui/community-card/community-card.component'
import { selectFilteredCommunities } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-communities-search-page',
  imports: [
    CommunitiesFiltersComponent,
    SvgIconComponent,
    CommunityCardComponent,
    AsyncPipe,
    ResizePageDirective,
  ],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {
  store = inject(Store)

  communities$ = this.store.select(selectFilteredCommunities)
}
