import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core'
import {
  ImgPreviewUrlPipe,
  ModalComponent,
  ModalService,
  SvgIconComponent,
  TtInputComponent,
} from '@tt/common-ui'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { selectSelectedCommunity, selectSelectedSubscribers } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { postActions } from '@tt/data-access/posts'
import { GlobalStoreService } from '@tt/data-access/profile'
import { startWith, tap } from 'rxjs'
import { toSignal } from '@angular/core/rxjs-interop'
import { Admin } from '@tt/data-access/communities/interfaces/community.interface'

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

  filterSubscribers = new FormControl('', { nonNullable: true })

  selectedSubscriberId = signal<number | null>(null)
  selected = signal<'page' | 'message'>('page')
  postCreated = output<string>()

  subscribers = this.store.selectSignal(selectSelectedSubscribers)
  community = this.store.selectSignal(selectSelectedCommunity)

  communityLink = `${window.location.origin}/community/${this.community()!.id}`

  inputValue = toSignal(
    this.filterSubscribers.valueChanges.pipe(
      tap(() => this.selectedSubscriberId.set(null)),
      startWith('')
    ),
    { initialValue: '' }
  )

  filteredSubscribers = computed(() => {
    const search = this.inputValue().toLowerCase().trim()
    const allSubscribers = this.subscribers()

    if (!search) {
      return allSubscribers.slice(0, 8)
    }

    return allSubscribers.filter((subscriber) =>
      `${subscriber.firstName} ${subscriber.lastName}`
        .toLowerCase().includes(search.toLowerCase())
    )
  })

  onSubscriberClick(subscriber: Admin) {
    this.selectedSubscriberId.set(subscriber.id)
  }

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
