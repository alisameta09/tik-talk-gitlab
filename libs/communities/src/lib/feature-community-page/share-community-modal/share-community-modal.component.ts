import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ModalComponent } from '@tt/common-ui'

@Component({
  selector: 'tt-share-community-modal',
  imports: [ModalComponent],
  templateUrl: './share-community-modal.component.html',
  styleUrl: './share-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareCommunityModalComponent {}
