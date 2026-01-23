import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnChanges,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { PostInputComponent } from '@tt/posts'
import { Chat, ChatService } from '@tt/data-access/chats'

@Component({
  selector: 'app-chat-messages-wrapper',
  imports: [ChatMessageComponent, PostInputComponent],
  templateUrl: './chat-messages-wrapper.component.html',
  styleUrl: './chat-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesWrapperComponent implements OnChanges, AfterViewInit {
  chatService = inject(ChatService)
  r2 = inject(Renderer2)
  destroyRef = inject(DestroyRef)

  chat = input.required<Chat>()

  messages = computed(() => this.chatService.activeChats()[this.chat().id] ?? [])

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLElement>
  @ViewChildren('lastMessage') lastMessage?: QueryList<ElementRef<HTMLElement>>

  ngOnChanges() {
    this.chatService.setCurrentChatId(this.chat().id)
  }

  ngAfterViewInit() {
    this.lastMessage?.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.scrollToLastMessage())

    setTimeout(() => this.scrollToLastMessage())
  }

  scrollToLastMessage() {
    const container = this.messagesContainer?.nativeElement

    if (!container) return

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    })
  }

  onSendMessage(messageText: string) {
    this.chatService.wsAdapter.sendMessage(messageText, this.chat().id)
  }
}
