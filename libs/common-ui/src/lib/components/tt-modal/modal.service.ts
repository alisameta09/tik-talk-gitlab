import { Injectable, Type, ViewContainerRef } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef): void {
    this.#container = vcr
  }

  show(component: Type<unknown>) {
    this.#container?.createComponent(component)
  }

  close() {
    this.#container?.clear()
  }
}
