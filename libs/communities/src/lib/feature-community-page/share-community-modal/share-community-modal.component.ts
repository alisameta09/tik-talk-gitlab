import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  ImgPreviewUrlPipe,
  ModalComponent,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
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
    StackInputComponent,
    SvgIconComponent,
    TtInputComponent,
    TtSelectComponent,
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

  subscribers = this.store.selectSignal(selectSelectedSubscribers)
}
