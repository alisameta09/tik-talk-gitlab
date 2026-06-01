import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { ImgPreviewUrlPipe, ModalComponent, SvgIconComponent, TtInputComponent } from '@tt/common-ui'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { selectSelectedSubscribers } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { PostInputComponent } from '@tt/posts'

@Component({
  selector: 'tt-share-community-modal',
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    TtInputComponent,
    ImgPreviewUrlPipe,
    RouterLink,
    PostInputComponent,
  ],
  templateUrl: './share-community-modal.component.html',
  styleUrl: './share-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareCommunityModalComponent {
  store = inject(Store)

  selected = signal<'page' | 'message'>('page')

  subscribers = this.store.selectSignal(selectSelectedSubscribers)
}
