import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { ModalService, PortalService } from '@tt/common-ui'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  #portalService = inject(PortalService)
  #router = inject(Router)
  #modalService = inject(ModalService)

  portalHost = viewChild('portalHost', { read: ViewContainerRef })

  ngAfterViewInit() {
    const portalHost = this.portalHost()

    if (!portalHost) return

    this.#portalService.registerContainer(portalHost)
  }

  constructor() {
    this.#router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.#modalService.close()
      }
    })
  }
}
