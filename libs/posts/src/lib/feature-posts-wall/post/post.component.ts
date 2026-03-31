import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core'
import { Post, postActions, PostComment, selectCreatedComments } from '@tt/data-access/posts'
import { CommentComponent, PostInputComponent } from '../../ui'
import {
  AvatarCircleComponent,
  DateTransformPipe,
  ImgPreviewUrlPipe,
  SvgIconComponent,
} from '@tt/common-ui'
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
    ImgPreviewUrlPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  profile = inject(GlobalStoreService).me
  store = inject(Store)

  post = input<Post>()
  comments!: Signal<PostComment[]>

  comments2 = computed(() => {
    if (this.comments()?.length) {
      return this.comments()
    }

    return this.post()?.comments
  })

  ngOnInit() {
    this.comments = this.store.selectSignal(selectCreatedComments(this.post()!.id))
    console.log(this.post()?.author.avatarUrl)
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
