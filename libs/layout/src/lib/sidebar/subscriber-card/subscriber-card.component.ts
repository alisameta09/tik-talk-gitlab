import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { ImgPreviewUrlPipe} from '@tt/common-ui';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-subscriber-card',
  imports: [ImgPreviewUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCardComponent {
  @Input() profile!: Profile
}
