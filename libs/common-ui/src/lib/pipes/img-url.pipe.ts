import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imgPreviewUrl',
})
export class ImgPreviewUrlPipe implements PipeTransform {
  transform(value: string | null, type: 'profile' | 'community'): string {
    if (!value) {
      switch (type) {
        case 'profile':
          return '/assets/images/avatar-placeholder.png'
        case 'community':
          return '/assets/images/banner.png'
        default:
          return '/assets/images/avatar-placeholder.png'
      }
    }

    return `https://icherniakov.ru/yt-course/${value}`
  }
}
