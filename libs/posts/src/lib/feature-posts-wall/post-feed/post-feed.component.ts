import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { Post } from '@tt/data-access/posts'
import { PostInputComponent } from '../../ui'
import { PostComponent } from '../post'
import { GlobalStoreService } from '@tt/data-access/profile'
import { ResizePageDirective } from '@tt/common-ui'

@Component({
  selector: 'tt-post-feed',
  imports: [PostInputComponent, PostComponent, ResizePageDirective],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  profile = inject(GlobalStoreService).me

  feed = input<Post[]>([])
  createPost = output<string>()

  onCreatePost(postText: string) {
    if (!postText.trim()) return

    this.createPost.emit(postText.trim())
  }
}
