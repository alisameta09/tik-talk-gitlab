import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommunitiesFiltersComponent } from '../index';

@Component({
  selector: 'app-communities-search-page',
  imports: [CommunitiesFiltersComponent],
  templateUrl: './communities-search-page.component.html',
  styleUrl: './communities-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesSearchPageComponent {}
