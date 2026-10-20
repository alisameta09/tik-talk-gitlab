import { ComponentRef, Injectable, OutputRef, Type, ViewContainerRef } from '@angular/core'
import { outputToObservable } from '@angular/core/rxjs-interop'
import { Observable, take } from 'rxjs'

interface ConfirmWithResult {
  result: OutputRef<boolean>
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

  show(component: Type<ConfirmWithResult>): Observable<boolean>
  show<T>(component: Type<T>): ComponentRef<T>

  show<T>(component: Type<T>) {
    if (!this.#container) return

    const ref = this.#container?.createComponent(component)
    this.#stack.push(ref)

    if (ref.instance && typeof ref?.instance === 'object' && 'result' in ref.instance) {
      const instance = ref?.instance as ConfirmWithResult

      return outputToObservable(instance.result).pipe(take(1))
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
