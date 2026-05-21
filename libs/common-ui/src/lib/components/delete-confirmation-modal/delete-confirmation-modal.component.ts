import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core'
import { Router } from '@angular/router'
import { ModalService } from '../tt-modal/modal.service'
import { ModalComponent } from '../tt-modal/tt-modal.component'

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
