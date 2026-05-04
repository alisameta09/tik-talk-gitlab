import { ChangeDetectionStrategy, Component, effect, inject, Renderer2 } from '@angular/core'
import {
  ModalComponent,
  ModalService,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { communityActions, selectSelectedCommunity } from '@tt/data-access/communities'

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
  #modalService = inject(ModalService)

  community = this.store.selectSignal(selectSelectedCommunity)

  editCommunityForm = this.fb.nonNullable.group({
    name: ['value', [Validators.required]],
    themes: [<string[]>[], [Validators.required]],
    tags: [<string[]>[], Validators.required],
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

  onCancel() {
    this.#modalService.close()
  }

  onSave(event: Event) {
    event.preventDefault()

    if (this.editCommunityForm.invalid) return

    const community = this.community()

    if (!community) return

    this.store.dispatch(
      communityActions.editCommunity({
        id: community.id,
        payload: this.editCommunityForm.getRawValue(),
      })
    )

    this.#modalService.close()
  }
}
