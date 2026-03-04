import {createActionGroup, props} from '@ngrx/store'
import {Profile} from '../index'

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter profiles': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),

    'save filter': props<{ filters: Record<string, any> }>(),

    'set page': props<{ page?: number }>()
  }
})
