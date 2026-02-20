import { Injectable, ViewContainerRef } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef): void {
    this.#container = vcr
  }
}
