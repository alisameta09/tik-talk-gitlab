import { createActionGroup, props } from '@ngrx/store'
import {
  Admin,
  Community,
  CommunityPage,
  CreateCommunityDTO,
} from '../interfaces/community.interface'

export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'filter communities': props<{ filters: Record <string, any> }>(),
    'communities loaded': props<{ communities: Community[] }>(),

    'save filters': props<{ filters: Record <string, any> }>(),

    'set page': props<{ page?: number }>(),

    'load community': props<{ id: number }>(),
    'load community success': props<{ communityPage: CommunityPage }>(),

    'load subscribers': props<{ id: number }>(),
    'load subscribers success': props<{ subscribers: Admin[] }>(),

    'create community': props<{ payload: CreateCommunityDTO }>(),

    'navigate to community': props<{ id: number }>(),

    'join community': props<{ id: number }>(),
    'leave community': props<{ id: number }>(),

    'update community': props<{ community: Community }>(),
  }
})
