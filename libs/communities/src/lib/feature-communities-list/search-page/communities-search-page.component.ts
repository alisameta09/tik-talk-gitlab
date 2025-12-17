import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommunitiesFiltersComponent } from '../index';
import { SvgIconComponent } from '@tt/common-ui';
import { CommunityCardComponent } from '../../ui/community-card/community-card.component';

@Component({
  selector: 'app-communities-search-page',
  imports: [CommunitiesFiltersComponent, SvgIconComponent, CommunityCardComponent],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {}
