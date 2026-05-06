import { ComponentRef, Injectable, OutputRef, Type, ViewContainerRef } from '@angular/core'
import { outputToObservable } from '@angular/core/rxjs-interop'
import { Observable, take } from 'rxjs'

interface ConfirmModal {
  decision: OutputRef<boolean>
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #container?: ViewContainerRef
  #stack: ComponentRef<unknown>[] = []

  registerContainer(vcr: ViewContainerRef): void {
    this.#container = vcr
  }

  show(component: Type<ConfirmModal>): Observable<boolean>
  show<T>(component: Type<T>): ComponentRef<T>

  show<T>(component: Type<T>) {
    if (!this.#container) return

    const ref = this.#container?.createComponent(component)
    this.#stack.push(ref)

    if (ref.instance && typeof ref?.instance === 'object' && 'decision' in ref.instance) {
      const instance = ref?.instance as ConfirmModal

      return outputToObservable(instance.decision).pipe(take(1))
    }

    return ref
  }

  close() {
    const ref = this.#stack.pop()
    ref?.destroy()
  }

  closeAll() {
    this.#stack.forEach((ref) => ref.destroy())
    this.#stack = []
  }
}
