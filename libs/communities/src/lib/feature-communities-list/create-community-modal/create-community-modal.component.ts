import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ModalComponent } from '@tt/common-ui'

@Component({
  selector: 'tt-create-community-modal',
  imports: [ModalComponent],
  templateUrl: './create-community-modal.component.html',
  styleUrl: './create-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCommunityModalComponent {}
