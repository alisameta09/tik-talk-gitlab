import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { PortalService } from '@tt/common-ui'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit{
  #portalService = inject(PortalService)

  portalHost = viewChild('portalHost', { read: ViewContainerRef })

  ngAfterViewInit() {
    const portalHost = this.portalHost()

    if (!portalHost) return

    this.#portalService.registerContainer(portalHost)
  }

}
