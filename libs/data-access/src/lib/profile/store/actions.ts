import {createActionGroup, props} from '@ngrx/store'
import {Profile} from '../index'

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'filter profiles': props<{ filters: Record<string, any> }>(),
    'save filter': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>()
  }
})
