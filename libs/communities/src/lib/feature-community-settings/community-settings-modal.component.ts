import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  ModalComponent,
  StackInputComponent,
  SvgIconComponent,
  TtInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

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

  editCommunityForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    themes: ['', [Validators.required]],
    tags: [[], Validators.required],
    description: ['', [Validators.required]],
  })
}
