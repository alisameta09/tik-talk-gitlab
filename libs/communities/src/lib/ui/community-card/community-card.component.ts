import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core'
import { PreviewPipe, SvgIconComponent } from '@tt/common-ui'
import { CommunitiesService, Community } from '@tt/data-access/communities'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { GlobalStoreService } from '@tt/data-access/profile'
import { I18nPluralPipe } from '@angular/common'

@Component({
  selector: 'tt-community-card',
  imports: [SvgIconComponent, I18nPluralPipe, PreviewPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  subscriberCategories: { [k: string]: string } = {
    '=0': '# подписчиков',
    '=1': '# подписчик',
    '=2': '# подписчика',
    '=3': '# подписчика',
    '=4': '# подписчика',
    other: '# подписчиков',
  }

  community = input<Community>()

  router = inject(Router)
  communitiesService = inject(CommunitiesService)
  me = inject(GlobalStoreService).me

  subscriptionState = linkedSignal(this.community)
  isMine = computed(() => this.me()?.id === this.community()?.admin.id)

  async getCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.getCommunityById(communityId)).then((res) =>
      this.router.navigate(['/communities', res.id])
    )
  }

  async joinCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.joinCommunity(communityId))

    this.subscriptionState.update((community) =>
      community
        ? { ...community, isJoined: true, subscribersAmount: community.subscribersAmount + 1 }
        : community
    )
  }

  async leaveCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.leaveCommunity(communityId))

    this.subscriptionState.update((community) =>
      community
        ? { ...community, isJoined: false, subscribersAmount: community.subscribersAmount - 1 }
        : community
    )
  }
}
