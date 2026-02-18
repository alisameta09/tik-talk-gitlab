import { createFeature, createReducer, on } from '@ngrx/store'
import { Community } from '../interfaces/community.interface'
import { communityActions } from './actions'

export interface CommunityState {
  communities: Community[]
  communityFilters: Record<string, any>
  page: number
  size: number
}

export const initialState: CommunityState = {
  communities: [],
  communityFilters: {},
  page: 1,
  size: 10,
}

export const communityFeature = createFeature({
  name: 'communityFeature',
  reducer: createReducer(
    initialState,
    on(communityActions.communitiesLoaded, (state, payload) => {
      return {
        ...state,
        communities: state.communities.concat(payload.communities),
      }
    }),
    on(communityActions.saveFilters, (state, payload) => {
      return {
        ...state,
        communities: [],
        communityFilters: payload.filters,
        page: 1,
      }
    }),
    on(communityActions.setPage, (state, payload) => {
      let page = payload.page

      if (!page) page = state.page + 1

      return {
        ...state,
        page,
      }
    })
  ),
})
