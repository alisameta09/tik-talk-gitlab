import { ChangeDetectionStrategy, Component, inject, OnInit, Renderer2 } from '@angular/core'
import { postActions, selectFetchedPosts } from '@tt/data-access/posts'
import { PostInputComponent } from '../../ui'
import { PostComponent } from '../post'
import { GlobalStoreService } from '@tt/data-access/profile'
import { Store } from '@ngrx/store'
import { ResizePageDirective } from '@tt/common-ui'

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent, ResizePageDirective],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnInit {
  r2 = inject(Renderer2)
  store = inject(Store)
  profile = inject(GlobalStoreService).me

  feed = this.store.selectSignal(selectFetchedPosts)

  ngOnInit() {
    this.store.dispatch(postActions.fetchPosts())
  }

  onCreatePost(postText: string) {
    if (!postText.trim()) return

    this.store.dispatch(
      postActions.createPost({
        payload: {
          title: 'Клевый пост',
          content: postText.trim(),
          authorId: this.profile()!.id,
          communityId: 0,
        },
      })
    )
  }
}
