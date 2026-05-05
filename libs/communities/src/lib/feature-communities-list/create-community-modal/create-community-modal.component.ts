import { ChangeDetectionStrategy, Component, inject, Renderer2 } from '@angular/core'
import {
  ModalComponent,
  ModalService,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { communityActions, CreateCommunityDTO } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'

@Component({
  selector: 'tt-create-community-modal',
  imports: [
    ModalComponent,
    TtInputComponent,
    TtSelectComponent,
    StackInputComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './create-community-modal.component.html',
  styleUrl: './create-community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCommunityModalComponent {
  fb = inject(FormBuilder)
  r2 = inject(Renderer2)
  router = inject(Router)
  #modalService = inject(ModalService)
  store = inject(Store)

  createCommunityForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    themes: [<string[]>[], [Validators.required]],
    tags: [<string[]>[], Validators.required],
    description: ['', [Validators.required]],
  })

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCancel() {
    this.#modalService.close()
    this.router.navigate(['/communities'])
  }

  onSave(event: Event) {
    event.preventDefault()

    this.createCommunityForm.markAllAsTouched()
    this.createCommunityForm.updateValueAndValidity()

    if (this.createCommunityForm.invalid) return

    this.store.dispatch(
      communityActions.createCommunity({
        payload: this.createCommunityForm.getRawValue(),
      })
    )

    this.#modalService.close()
  }
}
