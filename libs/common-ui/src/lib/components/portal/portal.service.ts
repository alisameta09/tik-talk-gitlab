import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef): void {
    this.#container = vcr
  }

  render(templ: TemplateRef<any>): void {
    setTimeout(() => {
      this.#container?.createEmbeddedView(templ)
    })
  }

  destroy(): void {
    this.#container?.clear()
  }
}
