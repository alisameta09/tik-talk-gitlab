import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StackInputComponent, ThemeSelectComponent, TtFormInputComponent } from '@tt/common-ui'

@Component({
  selector: 'app-communities-filters',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TtFormInputComponent,
    StackInputComponent,
    ThemeSelectComponent,
  ],
  templateUrl: './communities-filters.component.html',
  styleUrl: './communities-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFiltersComponent implements OnInit {
  searchCommunityForm = new FormGroup({
    communityName: new FormControl(''),
    theme: new FormControl(''),
    tags: new FormControl(''),
  })

  ngOnInit() {
    this.searchCommunityForm.valueChanges.subscribe((val) => {
      console.log(val)
    })
  }
}
