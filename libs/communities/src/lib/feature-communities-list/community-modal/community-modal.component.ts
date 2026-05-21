import { ChangeDetectionStrategy, Component, effect, inject, Renderer2 } from '@angular/core'
import {
  DeleteConfirmationModal,
  ModalComponent,
  ModalService,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { communityActions, selectSelectedCommunity } from '@tt/data-access/communities'
import { Store } from '@ngrx/store'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'tt-community-modal',
  imports: [
    ModalComponent,
    TtInputComponent,
    TtSelectComponent,
    StackInputComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './community-modal.component.html',
  styleUrl: './community-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityModalComponent {
  fb = inject(FormBuilder)
  r2 = inject(Renderer2)
  router = inject(Router)
  #modalService = inject(ModalService)
  store = inject(Store)

  community = this.store.selectSignal(selectSelectedCommunity)

  communityForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    themes: [<string[]>[], [Validators.required]],
    tags: [<string[]>[], Validators.required],
    description: ['', [Validators.required]],
  })

  constructor() {
    effect(() => {
      const community = this.community()

      if (community) {
        this.communityForm.patchValue({
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
    const community = this.community()

    if (!community) {
      event.preventDefault()

      this.communityForm.markAllAsTouched()
      this.communityForm.updateValueAndValidity()

      if (this.communityForm.invalid) return

      this.store.dispatch(
        communityActions.createCommunity({
          payload: this.communityForm.getRawValue(),
        })
      )
    }
     else {
       this.store.dispatch(
         communityActions.editCommunity({
           id: community.id,
           payload: this.communityForm.getRawValue(),
         })
       )
     }
    this.#modalService.close()
  }

  async onDelete() {
    const res = await firstValueFrom(this.#modalService.show(DeleteConfirmationModal))

    if (!res) return

    const community = this.community()
    if (!community) return

    this.store.dispatch(communityActions.deleteCommunity({ id: community.id }))
  }
}
