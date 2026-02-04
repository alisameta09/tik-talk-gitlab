import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui'
import { CommunitiesService, Community } from '@tt/data-access/communities'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { GlobalStoreService } from '@tt/data-access/profile'
import { I18nPluralPipe } from '@angular/common'

@Component({
  selector: 'tt-community-card',
  imports: [SvgIconComponent, ImgUrlPipe, I18nPluralPipe],
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

  isJoined = signal<boolean>(false)
  preview = signal<string>('/assets/images/avatar-placeholder.png')

  router = inject(Router)
  communitiesService = inject(CommunitiesService)
  me = inject(GlobalStoreService).me

  isMine = computed(() => {
    return this.me()?.id === this.community()?.admin.id
  })

  getCommunity(communityId: number) {
    firstValueFrom(this.communitiesService.getCommunityById(communityId)).then((res) =>
      this.router.navigate(['/communities', res.id])
    )
  }

  joinCommunity(communityId: number) {
    firstValueFrom(this.communitiesService.joinCommunity(communityId))
    this.isJoined.set(true)
  }

  leaveCommunity(communityId: number) {
    firstValueFrom(this.communitiesService.leaveCommunity(communityId))
    this.isJoined.set(false)
  }
}
