import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core'
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui'
import { CommunitiesService, CommunityInterface } from '@tt/data-access/communities'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { GlobalStoreService } from '@tt/data-access/profile'

@Component({
  selector: 'app-community-card',
  imports: [SvgIconComponent, ImgUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  @Input() community!: CommunityInterface

  isJoined = signal<boolean>(false)

  router = inject(Router)
  communitiesService = inject(CommunitiesService)
  me = inject(GlobalStoreService).me

  async getCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.getCommunityById(communityId)).then((res) =>
      this.router.navigate(['/communities', res.id])
    )
  }

  async joinCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.joinCommunity(communityId))
    this.isJoined.set(true)
  }

  async leaveCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.leaveCommunity(communityId))
    this.isJoined.set(false)
  }

}
