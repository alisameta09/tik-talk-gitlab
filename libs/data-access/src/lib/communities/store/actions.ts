import { createActionGroup, emptyProps, props } from '@ngrx/store'
import {
  Admin,
  Community,
  CommunityPage,
  CreateCommunityDTO,
} from '../interfaces/community.interface'
import { CommunityPostCreateDto, Post } from '../../posts/interfaces/post.interface'

export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'filter communities': props<{ filters: Record <string, any> }>(),
    'communities loaded': props<{ communities: Community[] }>(),

    'save filters': props<{ filters: Record <string, any> }>(),

    'set page': props<{ page?: number }>(),

    'load community': props<{ id: number }>(),
    'load community success': props<{ communityPage: CommunityPage }>(),
    'clear selected community': emptyProps(),

    'load subscribers': props<{ id: number }>(),
    'load subscribers success': props<{ subscribers: Admin[] }>(),

    'create community post': props<{ payload: CommunityPostCreateDto }>(),
    'load community posts': props<{ id: number }>(),
    'load community posts success': props<{ posts: Post[] }>(),

    'create community': props<{ payload: CreateCommunityDTO }>(),

    'edit community': props<{ id: number, payload: CreateCommunityDTO }>(),
    'edit community success': props<{ communityPage: CommunityPage }>(),

    'navigate to community': props<{ id: number }>(),

    'join community': props<{ id: number }>(),
    'leave community': props<{ id: number }>(),

    'update community': props<{ community: Community }>(),

    'delete community': props<{ id: number }>(),
    'delete community success': props<{ id: number }>(),
  }
})
