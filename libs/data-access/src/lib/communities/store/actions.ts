import { createActionGroup, props } from '@ngrx/store'
import { CommunityInterface } from '../interfaces/community.interface'


export const communityActions = createActionGroup({
  source: 'community',
  events: {
    'filter communities': props<{ filters: Record <string, any> }>(),
    'communities loaded': props<{ communities: CommunityInterface[] }>(),
    'save filters': props<{ filters: Record <string, any> }>()
  }
})
