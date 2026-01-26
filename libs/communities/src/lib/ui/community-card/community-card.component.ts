import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui'
import { CommunitiesService, CommunityInterface } from '@tt/data-access/communities'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-community-card',
  imports: [SvgIconComponent, ImgUrlPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent {
  @Input() community!: CommunityInterface

  router = inject(Router)

  communitiesService = inject(CommunitiesService)

  async getCommunity(communityId: number) {
    await firstValueFrom(this.communitiesService.getCommunityById(communityId)).then((res) =>
      this.router.navigate(['/communities', res.id])
    )
  }
}
