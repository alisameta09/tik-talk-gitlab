import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ModalComponent, ModalService } from '@tt/common-ui'

@Component({
  selector: 'tt-delete-confirmation-modal',
  imports: [ModalComponent],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationModal {
  #modalService = inject(ModalService)

  onCancel() {
    this.#modalService.close()
  }
}
