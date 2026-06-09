import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { filter, of, switchMap } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { ChatHeaderComponent } from './chat-header/chat-header.component'
import { ChatMessagesWrapperComponent } from './chat-messages-wrapper/chat-messages-wrapper.component'
import { ChatService } from '@tt/data-access/chats'
import { ResizePageDirective } from '@tt/common-ui'
import { GlobalStoreService, Profile } from '@tt/data-access/profile'

@Component({
  selector: 'tt-chat-workspace',
  imports: [ChatHeaderComponent, ChatMessagesWrapperComponent, AsyncPipe, ResizePageDirective],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  chatService = inject(ChatService)
  me = inject(GlobalStoreService).me

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId, text }) => {
            return this.chatService.createChat(userId).pipe(
              switchMap((chat) => {
                this.chatService.setChatInfo(chat)
                this.router.navigate(['chats', chat.id])
                this.chatService.wsAdapter.sendMessage(text, chat.id)
                return of(null)
              })
            )
          })
        )
      }

      return this.chatService.getChatById(id)
    })
  )
}
