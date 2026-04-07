import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { ImgPreviewUrlPipe } from '../../pipes'

@Component({
  selector: 'tt-avatar-circle',
  imports: [ImgPreviewUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>()
}
