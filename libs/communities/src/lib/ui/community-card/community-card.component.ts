import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import {RouterLink} from '@angular/router';
import { CommunityInterface } from '@tt/data-access/communities';

@Component({
  selector: 'app-community-card',
  imports: [SvgIconComponent, RouterLink, ImgUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  @Input() community!: CommunityInterface;
}
