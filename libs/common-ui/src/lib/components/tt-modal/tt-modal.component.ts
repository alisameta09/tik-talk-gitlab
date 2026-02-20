import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ModalService } from '../tt-modal/modal.service'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-modal',
  imports: [SvgIconComponent],
  templateUrl: './tt-modal.component.html',
  styleUrl: './tt-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  #modalService = inject(ModalService)

  closeModal() {
    this.#modalService.close()
  }
}
