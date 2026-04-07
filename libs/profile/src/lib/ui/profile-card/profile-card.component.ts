import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ImgPreviewUrlPipe } from '@tt/common-ui'
import { Profile } from '@tt/data-access/profile'

@Component({
  selector: 'tt-profile-card',
  imports: [ImgPreviewUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input() profile!: Profile
}
