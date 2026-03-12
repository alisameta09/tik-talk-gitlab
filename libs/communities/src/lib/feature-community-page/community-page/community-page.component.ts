import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core'
import { CommunityPreviewPipe, PreviewPipe, ShowModalButtonComponent, SvgIconComponent } from '@tt/common-ui'
import { PostInputComponent } from '@tt/posts'
import { communityActions, selectSelectedCommunity, selectSelectedSubscribers } from '@tt/data-access/communities'
import { RouterLink } from '@angular/router'
import { NgClass } from '@angular/common'
import { Store } from '@ngrx/store'

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
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPageComponent {
  store = inject(Store)

  id = input<string>()

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
