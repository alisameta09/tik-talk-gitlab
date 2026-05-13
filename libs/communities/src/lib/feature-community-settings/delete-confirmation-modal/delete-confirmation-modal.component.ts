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

  result = output<boolean>()

  onDelete() {
    this.result.emit(true)
    this.#modalService.closeAll()
    this.router.navigate(['/communities'])
  }

  onCancel() {
    this.result.emit(false)
    this.#modalService.close()
  }
}
