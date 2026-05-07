import { Route } from '@angular/router';
import { ChatWorkspaceComponent } from '../feature-chats-workspace/chat-workspace/chat-workspace.component';
import {ChatsPageComponent} from '../feature-chats-workspace/chat-page/chats-page.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
