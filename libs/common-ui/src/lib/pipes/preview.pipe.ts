import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'preview',
})
export class PreviewPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) {
      return `/assets/images/avatar-placeholder.png`
    }
    return `https://icherniakov.ru/yt-course/${value}`
  }
}
