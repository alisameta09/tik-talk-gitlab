import { createActionGroup, props } from '@ngrx/store'
import { Community } from '../interfaces/community.interface'


export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'filter communities': props<{ filters: Record <string, any> }>(),
    'communities loaded': props<{ communities: Community[] }>(),
    'save filters': props<{ filters: Record <string, any> }>()
  }
})
