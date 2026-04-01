import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AvatarCircleComponent, ImgPreviewUrlPipe } from '@tt/common-ui';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-profile-header',
  imports: [AvatarCircleComponent, ImgPreviewUrlPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
