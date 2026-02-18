import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {PortalService} from './portal.service'


@Component({
  selector: 'tt-portal',
  imports: [],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  indent = 8

  #portalService = inject(PortalService)
  portalContent = viewChild('portalContent', { read: TemplateRef })

  host = input<HTMLElement>()

  top = signal<number>(0)
  left = signal<number>(0)

  constructor() {
    effect(() => {
      const host = this.host()

      if (!host) return

      const {bottom, left} = host.getBoundingClientRect()
      const indent = bottom + this.indent

      this.top.set(indent)
      this.left.set(left)
    })
  }

  ngAfterViewInit() {
    const portalContent = this.portalContent()

    if (!portalContent) return

    this.#portalService.render(portalContent)
  }

  ngOnDestroy() {
    this.#portalService.destroy()
  }
}
