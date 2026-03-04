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

    'create community': props<{ payload: CreateCommunityDTO }>(),
    'community loaded': props<{ community: CommunityPage }>(),

    'fetch community by id': props<{ communityId: number }>(),

    'fetch subscribers': props<{ communityId: number }>(),
    'subscribers loaded': props<{ subscribers: Admin[] }>(),
  }
})
