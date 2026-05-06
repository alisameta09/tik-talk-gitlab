import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core'
import { ModalComponent, ModalService } from '@tt/common-ui'
import { Router } from '@angular/router'

@Component({
  selector: 'tt-delete-confirmation-modal',
  imports: [ModalComponent],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationModal {
  #modalService = inject(ModalService)
  router = inject(Router)

  decision = output<boolean>()

  onDelete() {
    this.decision.emit(true)
    this.#modalService.closeAll()
    this.router.navigate(['/communities'])
  }

  onCancel() {
    this.decision.emit(false)
    this.#modalService.close()
  }
}
