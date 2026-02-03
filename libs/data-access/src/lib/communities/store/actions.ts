import { createActionGroup, props } from '@ngrx/store'
import { Community } from '../interfaces/community.interface'


export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'communities loaded': props<{ communities: Community[] }>(),
    'filter communities': props<{ filters: Record <string, any> }>(),
    'save filters': props<{ filters: Record <string, any> }>(),
    'set page': props<{ page?: number }>(),
  }
})
