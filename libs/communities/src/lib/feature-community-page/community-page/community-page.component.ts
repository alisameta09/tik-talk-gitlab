import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
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
import { ActivatedRoute, RouterLink } from '@angular/router'
import { AsyncPipe, NgClass } from '@angular/common'
import { Store } from '@ngrx/store'

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
export class CommunityPageComponent implements OnInit {
  route = inject(ActivatedRoute)
  store = inject(Store)

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      return this.store.dispatch(communityActions.fetchSubscribers({ communityId: id }))
    })
  }

  community$ = this.store.select(selectSelectedCommunity)

  subscribers$ = this.store.select(selectSelectedSubscribers)
}
