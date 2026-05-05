import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #container?: ViewContainerRef
  #stack: ComponentRef<unknown>[] = []

  registerContainer(vcr: ViewContainerRef): void {
    this.#container = vcr
  }

  show(component: Type<unknown>) {
    if (!this.#container) return

    const ref = this.#container?.createComponent(component)
    this.#stack.push(ref)

    return ref
  }

  close() {
    const ref = this.#stack.pop()
    ref?.destroy()
  }
}
