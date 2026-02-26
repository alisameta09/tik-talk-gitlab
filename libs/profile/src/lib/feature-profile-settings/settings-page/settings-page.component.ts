import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { firstValueFrom } from 'rxjs'
import { Router, RouterLink } from '@angular/router'
import { AddressInputComponent, ResizePageDirective, StackInputComponent, SvgIconComponent } from '@tt/common-ui'
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component'
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component'
import { ProfileService } from '@tt/data-access/profile'

@Component({
  selector: 'tt-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    RouterLink,
    AvatarUploadComponent,
    StackInputComponent,
    AddressInputComponent,
    ResizePageDirective,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  r2 = inject(Renderer2)
  router = inject(Router)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    stack: [''],
    city: [null],
  })

  constructor() {
    effect(() => {
      // @ts-expect-error error
      return this.form.patchValue({
        ...this.profileService.me(),
      })
    })
  }

  onSave(event: Event) {
    event.preventDefault()

    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    firstValueFrom(
      // @ts-expect-error error
      this.profileService.patchProfile({
        ...this.form.value,
      })
    )

    this.router.navigate(['/profile/me'])
  }
}
