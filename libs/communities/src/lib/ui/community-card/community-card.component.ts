import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-community-card',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {}
