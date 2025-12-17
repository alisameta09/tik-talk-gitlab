import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommunitiesFiltersComponent } from '../index';
import { SvgIconComponent } from '@tt/common-ui';
import { CommunityCardComponent } from '../../ui/community-card/community-card.component';
import { CommunitiesService } from '@tt/data-access/communities';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-communities-search-page',
  imports: [
    CommunitiesFiltersComponent,
    SvgIconComponent,
    CommunityCardComponent,
    AsyncPipe
  ],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {
  communitiesService = inject(CommunitiesService);

  communities$ = this.communitiesService.getCommunities();
}
