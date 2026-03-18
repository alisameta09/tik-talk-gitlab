import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core'
import {
  CommunityPreviewPipe,
  PreviewPipe,
  ShowModalButtonComponent,
  SvgIconComponent,
} from '@tt/common-ui'
import { PostInputComponent } from '@tt/posts'
import {
  communityActions,
  selectSelectedCommunity,
  selectSelectedSubscribers,
} from '@tt/data-access/communities'
import { RouterLink } from '@angular/router'
import { NgClass } from '@angular/common'
import { Store } from '@ngrx/store'
import { GlobalStoreService } from '@tt/data-access/profile'
import { CommunityFeedPageComponent } from '../community-feed-page/community-feed-page.component'

@Component({
  selector: 'tt-community-page',
  imports: [
    ShowModalButtonComponent,
    SvgIconComponent,
    PostInputComponent,
    RouterLink,
    PreviewPipe,
    CommunityPreviewPipe,
    NgClass,
    CommunityFeedPageComponent,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent {
  store = inject(Store)
  me = inject(GlobalStoreService).me

  id = input.required<string>()

  isMine = computed(() => this.me()?.id === this.community()?.admin.id)

  constructor() {
    effect(() => {
      const id = Number(this.id())

      if (!id) return

      this.store.dispatch(communityActions.loadCommunity({ id }))
      this.store.dispatch(communityActions.loadSubscribers({ id }))
    })
  }

  community = this.store.selectSignal(selectSelectedCommunity)
  subscribers = this.store.selectSignal(selectSelectedSubscribers)
}
