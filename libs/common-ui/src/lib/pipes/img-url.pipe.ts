import { Injectable, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imgPreviewUrl',
})
@Injectable({
  providedIn: 'root',
})
export class ImgPreviewUrlPipe implements PipeTransform {
  transform(value: string | null, type: 'profile' | 'community'): string {

    if (!value) {
      return type === 'community'
        ? 'assets/images/community-avatar-placeholder.png'
        : '/assets/images/avatar-placeholder.png'
    }

    return `https://icherniakov.ru/yt-course/${value}`
  }
}
