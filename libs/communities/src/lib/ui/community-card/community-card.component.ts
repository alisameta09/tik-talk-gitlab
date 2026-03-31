import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core'
import { ImgPreviewUrlPipe, PluralPipe, SvgIconComponent } from '@tt/common-ui'
import { Community, communityActions } from '@tt/data-access/communities'
import { Router } from '@angular/router'
import { GlobalStoreService } from '@tt/data-access/profile'
import { Store } from '@ngrx/store'

@Component({
  selector: 'tt-community-card',
  imports: [SvgIconComponent, PluralPipe, ImgPreviewUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  community = input<Community>()

  router = inject(Router)
  me = inject(GlobalStoreService).me
  store = inject(Store)

  subscriptionState = linkedSignal(this.community)
  isMine = computed(() => this.me()?.id === this.community()?.admin.id)

  onCommunityClick(id: number) {
    this.store.dispatch(communityActions.navigateToCommunity({ id }))
    this.store.dispatch(communityActions.loadCommunity({ id }))
    this.store.dispatch(communityActions.loadSubscribers({ id }))
  }

  onJoinCommunity(id: number) {
    this.store.dispatch(communityActions.joinCommunity({ id }))

    this.subscriptionState.update((community) =>
      community
        ? { ...community, isJoined: true, subscribersAmount: community.subscribersAmount + 1 }
        : community
    )
  }

  onLeaveCommunity(id: number) {
    this.store.dispatch(communityActions.leaveCommunity({ id }))

    this.subscriptionState.update((community) =>
      community
        ? { ...community, isJoined: false, subscribersAmount: community.subscribersAmount - 1 }
        : community
    )
  }
}
