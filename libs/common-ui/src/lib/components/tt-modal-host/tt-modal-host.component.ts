import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core'
import { ModalService } from '../tt-modal/modal.service'

@Component({
  selector: 'tt-modal-host',
  imports: [],
  templateUrl: './tt-modal-host.component.html',
  styleUrl: './tt-modal-host.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHostComponent implements AfterViewInit {
  #modalService = inject(ModalService)

  modalHost = viewChild('modalHost', { read: ViewContainerRef })

  ngAfterViewInit() {
    const modalHost = this.modalHost()

    if (!modalHost) return

    this.#modalService.registerContainer(modalHost)
  }
}
