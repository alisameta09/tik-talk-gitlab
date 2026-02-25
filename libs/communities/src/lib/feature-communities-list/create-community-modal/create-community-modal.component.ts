import { ChangeDetectionStrategy, Component, inject, OnInit, Renderer2 } from '@angular/core'
import { ModalComponent, StackInputComponent, SvgIconComponent, TtInputComponent, TtSelectComponent } from '@tt/common-ui'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

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
export class CreateCommunityModalComponent implements OnInit {
  r2 = inject(Renderer2)

  createCommunityForm = new FormGroup({
    name: new FormControl(''),
    themes: new FormControl(''),
    tags: new FormControl(''),
    description: new FormControl(''),
  })

  ngOnInit(): void {
    this.createCommunityForm.valueChanges.subscribe((val) => console.log(val))
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }
}
