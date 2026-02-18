import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, Renderer2 } from '@angular/core'
import { debounceTime, fromEvent } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Directive({
  selector: '[resizePage]',
})
export class ResizePageDirective implements AfterViewInit {
  #PADDING = 24

  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)
  destroyRef = inject(DestroyRef)

  ngAfterViewInit() {
    this.resizePage()

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resizePage()
      })
  }

  resizePage() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect()
    const height = window.innerHeight - top - this.#PADDING
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }
}
