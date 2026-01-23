import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { ResizePageDirective } from '@tt/common-ui'

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, ResizePageDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
