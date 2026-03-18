import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { communityActions, selectSelectedCommunityPosts } from '@tt/data-access/communities'
import { PostFeedComponent } from '@tt/posts'
import { GlobalStoreService } from '@tt/data-access/profile'

@Component({
  selector: 'tt-community-feed-page',
  imports: [PostFeedComponent],
  templateUrl: './community-feed-page.component.html',
  styleUrl: './community-feed-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFeedPageComponent implements OnInit {
  store = inject(Store)
  profile = inject(GlobalStoreService).me

  id = input.required<string>()

  feed = this.store.selectSignal(selectSelectedCommunityPosts)

  ngOnInit(): void {
    const id = Number(this.id())

    if (!id) return

    this.store.dispatch(communityActions.loadCommunityPosts({ id }))
  }

  createPost(postText: string) {
    if (!postText.trim()) return

    this.store.dispatch(
      communityActions.createCommunityPost({
        payload: {
          title: 'Клевый пост',
          content: postText.trim(),
          authorId: this.profile()!.id,
          communityId: Number(this.id()),
        },
      })
    )
  }
}
