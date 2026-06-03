import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core'
import {
  ImgPreviewUrlPipe,
  ModalComponent,
  ModalService,
  SvgIconComponent,
  TtInputComponent,
} from '@tt/common-ui'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { selectSelectedCommunity, selectSelectedSubscribers } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { postActions } from '@tt/data-access/posts'
import { GlobalStoreService } from '@tt/data-access/profile'

@Component({
  selector: 'tt-share-community-modal',
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    TtInputComponent,
    ImgPreviewUrlPipe,
  ],
  templateUrl: './share-community-modal.component.html',
  styleUrl: './share-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareCommunityModalComponent {
  store = inject(Store)
  modalService = inject(ModalService)
  profile = inject(GlobalStoreService).me

  postText = ''

  selected = signal<'page' | 'message'>('page')
  postCreated = output<string>()

  subscribers = this.store.selectSignal(selectSelectedSubscribers)
  community = this.store.selectSignal(selectSelectedCommunity)

  communityLink = `${window.location.origin}/community/${this.community()!.id}`

  onCancel() {
    this.modalService.close()
  }

  onSend() {
    const text = this.postText.trim()

    if (!text) return

    if (this.selected() === 'page') {
      this.store.dispatch(
        postActions.createPost({
          payload: {
            title: 'Клевый комментарий',
            content: `${text}

          ${this.communityLink}`,
            authorId: this.profile()!.id,
          },
        })
      )
    }

    this.postText = ''
    this.modalService.close()
  }
}
