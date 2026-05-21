import { Directive, HostBinding, HostListener, output } from '@angular/core'

@Directive({
  selector: '[dnd]',
})
export class DndDirective {
  fileDropped = output<File | undefined>()

  @HostBinding('class.fileover')
  fileover = false

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileover = true
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileover = false
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileover = false

    this.fileDropped.emit(event.dataTransfer?.files[0])
  }
}
