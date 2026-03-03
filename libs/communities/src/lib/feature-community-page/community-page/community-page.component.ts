import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommunityPreviewPipe, PreviewPipe, ShowModalButtonComponent, SvgIconComponent } from '@tt/common-ui'
import { PostInputComponent } from '@tt/posts'
import { CommunitiesService } from '@tt/data-access/communities'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { switchMap } from 'rxjs'
import { AsyncPipe, NgClass } from '@angular/common'

@Component({
  selector: 'tt-community-page',
  imports: [
    ShowModalButtonComponent,
    SvgIconComponent,
    PostInputComponent,
    AsyncPipe,
    RouterLink,
    PreviewPipe,
    CommunityPreviewPipe,
    NgClass,
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent {
  communitiesService = inject(CommunitiesService)
  route = inject(ActivatedRoute)

  community$ = this.route.params.pipe(
    switchMap(({ id }) => this.communitiesService.getCommunityById(id))
  )

  subscribers$ = this.route.params.pipe(
    switchMap(({ id }) => this.communitiesService.getCommunitySubscribers(id))
  )
}
