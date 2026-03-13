import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { GlobalStoreService } from '@tt/data-access/profile'
import { postActions, selectFetchedPosts } from '@tt/data-access/posts'
import { PostFeedComponent } from '../feature-posts-wall/post-feed/post-feed.component'

@Component({
  selector: 'tt-feed-page',
  imports: [PostFeedComponent],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPageComponent implements OnInit {
  store = inject(Store)
  profile = inject(GlobalStoreService).me

  feed = this.store.selectSignal(selectFetchedPosts)

  ngOnInit() {
    this.store.dispatch(postActions.fetchPosts())
  }

  createPost(postText: string) {
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
