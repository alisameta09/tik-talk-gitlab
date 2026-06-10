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
  centered = input<boolean>(false)

  top = signal<number>(0)
  left = signal<number>(0)

  constructor() {
    effect(() => {
      const host = this.host()

      if (!host) return

      const {bottom, left, width} = host.getBoundingClientRect()
      const indent = bottom + this.indent
      const centerLeft = this.centered() ? left + width / 2 : left

      this.left.set(centerLeft)
      this.top.set(indent)
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
