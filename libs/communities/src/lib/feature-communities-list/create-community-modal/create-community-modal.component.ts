import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
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
  createCommunityForm = new FormGroup({
    name: new FormControl(''),
    themes: new FormControl(''),
    tags: new FormControl(''),
    description: new FormControl(''),
  })

  ngOnInit(): void {
    this.createCommunityForm.valueChanges.subscribe((val) => console.log(val))
  }
}
