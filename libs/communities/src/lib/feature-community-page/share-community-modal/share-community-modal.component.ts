import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core'
import {
  ImgPreviewUrlPipe,
  ModalComponent,
  ModalService,
  PortalComponent,
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
import { Router } from '@angular/router'

@Component({
  selector: 'tt-share-community-modal',
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    TtInputComponent,
    ImgPreviewUrlPipe,
    PortalComponent,
  ],
  templateUrl: './share-community-modal.component.html',
  styleUrl: './share-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareCommunityModalComponent {
  store = inject(Store)
  modalService = inject(ModalService)
  profile = inject(GlobalStoreService).me
  router = inject(Router)

  postText = ''

  filterSubscribers = new FormControl('', { nonNullable: true })

  hoveredSubscriberId = signal<number | null>(null)
  showValidation = signal<boolean>(false)
  selectedSubscriberId = signal<number | null>(null)
  selected = signal<'page' | 'message'>('page')

  subscribers = this.store.selectSignal(selectSelectedSubscribers)
  community = this.store.selectSignal(selectSelectedCommunity)

  communityLink = computed(() => `${window.location.origin}/communities/${this.community()?.id}`)

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
        .toLowerCase().includes(search)
    )
  })

  onSubscriberClick(subscriber: Admin) {
    this.selectedSubscriberId.set(subscriber.id)
    this.showValidation.set(false)
  }

  onCancel() {
    this.modalService.close()
  }

  onSend() {
    const text = this.postText.trim()
    const subscriberId = this.selectedSubscriberId()

    if (!text) return

    if (this.selected() === 'page') {
      this.store.dispatch(
        postActions.createPost({
          payload: {
            title: 'Клевый комментарий',
            content: `${text}

          ${this.communityLink()}`,
            authorId: this.profile()!.id,
          },
        })
      )
    } else {
      if (!subscriberId) {
        this.showValidation.set(true)
        return
      }

      this.router.navigate(['/chats', 'new'], { queryParams: { userId: subscriberId, text: text } })
    }

    this.postText = ''
    this.modalService.close()
  }
}
