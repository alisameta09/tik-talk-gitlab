import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ImgPreviewUrlPipe, ShowModalButtonComponent, SvgIconComponent } from '@tt/common-ui'
import {
  communityActions,
  selectSelectedCommunity,
  selectSelectedSubscribers,
} from '@tt/data-access/communities'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { GlobalStoreService } from '@tt/data-access/profile'
import { CommunityFeedPageComponent } from '../community-feed-page/community-feed-page.component'
import { NgClass } from '@angular/common'

@Component({
  selector: 'tt-community-page',
  imports: [
    ShowModalButtonComponent,
    SvgIconComponent,
    RouterLink,
    CommunityFeedPageComponent,
    ImgPreviewUrlPipe,
    NgClass,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent implements OnDestroy {
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

  ngOnDestroy() {
    this.store.dispatch(communityActions.clearSelectedCommunity())
  }
}
