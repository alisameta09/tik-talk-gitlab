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
import { CommunitiesService } from '@tt/data-access/communities'
import { CreateCommunityDTO } from '@tt/data-access/communities/interfaces/community.interface'

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
  #communitiesService = inject(CommunitiesService)

  createCommunityForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    themes: ['', [Validators.required]],
    tags: [[], Validators.required],
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

    const value = this.createCommunityForm.getRawValue()

    console.log(value)

    const payload: CreateCommunityDTO = {
      name: value.name,
      themes: value.themes ? [value.themes] : [],
      tags: value.tags,
      description: value.description,
    }

    this.#communitiesService.createCommunity(payload)
      .subscribe((res) => {
      const id = res.id

      this.router.navigate(['/communities/', id])
      this.#modalService.close()
    })
  }
}
