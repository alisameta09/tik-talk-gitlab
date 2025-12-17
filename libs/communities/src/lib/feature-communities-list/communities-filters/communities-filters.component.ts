import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SvgIconComponent} from '@tt/common-ui';

@Component({
  selector: 'app-communities-filters',
  imports: [SvgIconComponent],
  templateUrl: './communities-filters.component.html',
  styleUrl: './communities-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFiltersComponent {}
