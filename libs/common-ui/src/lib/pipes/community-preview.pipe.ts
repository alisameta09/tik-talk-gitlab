import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'communityPreview',
})
export class CommunityPreviewPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) {
      return `/assets/images/banner.png`
    }
    return `https://icherniakov.ru/yt-course/${value}`
  }
}
