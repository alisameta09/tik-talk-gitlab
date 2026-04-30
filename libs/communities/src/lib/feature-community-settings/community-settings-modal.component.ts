import { ChangeDetectionStrategy, Component, effect, inject, Renderer2 } from '@angular/core'
import {
  ModalComponent,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectSelectedCommunity } from '@tt/data-access/communities'

@Component({
  selector: 'tt-community-settings-modal',
  imports: [
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    StackInputComponent,
    SvgIconComponent,
    TtInputComponent,
    TtSelectComponent,
  ],
  templateUrl: './community-settings-modal.component.html',
  styleUrl: './community-settings-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitySettingsModalComponent {
  fb = inject(FormBuilder)
  r2 = inject(Renderer2)
  store = inject(Store)

  community = this.store.selectSignal(selectSelectedCommunity)

  editCommunityForm = this.fb.nonNullable.group({
    name: ['value', [Validators.required]],
    themes: [[''], [Validators.required]],
    tags: [[''], Validators.required],
    description: ['', [Validators.required]],
  })

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  constructor() {
    effect(() => {
      const community = this.community()

      if (community) {
        this.editCommunityForm.patchValue({
          name: community.name,
          themes: community.themes,
          tags: community.tags,
          description: community.description,
        })
      }
    })
  }

}
