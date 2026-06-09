import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, Signal } from '@angular/core'
import { Post, postActions, PostComment, selectCreatedComments } from '@tt/data-access/posts'
import { CommentComponent, PostInputComponent } from '../../ui'
import { AvatarCircleComponent, DateTransformPipe, ImgPreviewUrlPipe, SvgIconComponent, UrlLinkPipe } from '@tt/common-ui'
import { GlobalStoreService } from '@tt/data-access/profile'
import { Store } from '@ngrx/store'
import { Community } from '@tt/data-access/communities'

@Component({
  selector: 'tt-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DateTransformPipe,
    UrlLinkPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  profile = inject(GlobalStoreService).me
  store = inject(Store)
  imgPreviewUrlPipe = inject(ImgPreviewUrlPipe)

  post = input<Post>()
  community = input<Community | null>()
  comments!: Signal<PostComment[]>

  comments2 = computed(() => {
    if (this.comments()?.length) {
      return this.comments()
    }

    return this.post()?.comments
  })

  postAuthor = computed(() => {
    const post = this.post()
    const community = this.community()

    const type = community ? 'community' : 'profile'
    const url = community?.avatarUrl || post?.author.avatarUrl || null

    return this.imgPreviewUrlPipe.transform(url, type)
  })

  ngOnInit() {
    this.comments = this.store.selectSignal(selectCreatedComments(this.post()!.id))
  }

  onCreateComment(commentText: string) {
    if (!commentText.trim()) return

    this.store.dispatch(
      postActions.createComment({
        payload: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        },
      })
    )
  }
}
