import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core'
import { Post } from '@tt/data-access/posts'
import { PostInputComponent } from '../../ui'
import { PostComponent } from '../post'
import { GlobalStoreService } from '@tt/data-access/profile'
import { ResizePageDirective } from '@tt/common-ui'
import { selectSelectedCommunity } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs'

@Component({
  selector: 'tt-post-feed',
  imports: [PostInputComponent, PostComponent, ResizePageDirective],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  store = inject(Store)
  route = inject(ActivatedRoute)

  profile = inject(GlobalStoreService).me

  community = this.store.selectSignal(selectSelectedCommunity)

  routeId = toSignal(this.route.paramMap.pipe(
    map(params => params.get('id')),
  ))

  isMine = computed(() => {
    const routeId = this.routeId()
    const profileId = this.profile()?.id
    const adminId = this.community()?.admin.id

    if (routeId === 'me') return true

    if (!profileId || !adminId) return false

    return profileId === adminId
  }
)

  feed = input<Post[]>([])
  createPost = output<string>()

  onCreatePost(postText: string) {
    if (!postText.trim()) return

    this.createPost.emit(postText.trim())
  }
}
