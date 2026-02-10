import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  StackInputComponent,
  SvgIconComponent,
  TtFormInputComponent,
  TtSelectComponent,
} from '@tt/common-ui'
import { communityActions, selectCommunitiesFilters } from '@tt/data-access/communities'
import { debounceTime, startWith, take } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'

@Component({
  selector: 'tt-communities-filters',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TtFormInputComponent,
    StackInputComponent,
    TtSelectComponent,
    SvgIconComponent,
  ],
  templateUrl: './communities-filters.component.html',
  styleUrl: './communities-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesFiltersComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  store = inject(Store)

  searchCommunityForm = new FormGroup({
    name: new FormControl(''),
    themes: new FormControl(''),
    tags: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.searchCommunityForm.valueChanges
      .pipe(
        startWith(this.searchCommunityForm.getRawValue()),
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((formValue) => {
        this.store.dispatch(communityActions.saveFilters({ filters: formValue }))
        this.store.dispatch(communityActions.filterCommunities({ filters: formValue }))
      })
  }

  constructor() {
    this.store
      .select(selectCommunitiesFilters)
      .pipe(take(1), takeUntilDestroyed())
      .subscribe((filters) => {
        if (filters) {
          this.searchCommunityForm.patchValue(filters, { emitEvent: false })
        }
      })
  }
}
