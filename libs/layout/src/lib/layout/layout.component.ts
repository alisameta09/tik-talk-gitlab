import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { ModalService, ResizePageDirective } from '@tt/common-ui'

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, SidebarComponent, ResizePageDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit {
  #modalService = inject(ModalService)

  modalHost = viewChild('modalHost', { read: ViewContainerRef })

  ngAfterViewInit() {
    const modalHost = this.modalHost()

    if (!modalHost) return

    this.#modalService.registerContainer(modalHost)
  }
}
