import { createFeature, createReducer, on } from '@ngrx/store'
import { Admin, Community, CommunityPage } from '../interfaces/community.interface'
import { communityActions } from './actions'
import { Post } from '../../posts/interfaces/post.interface'

export interface CommunityState {
  communities: Community[]
  communityFilters: Record<string, any>
  page: number
  size: number
  subscribers: Admin[]
  communityPage: CommunityPage | null
  posts: Post[]
}

export const initialState: CommunityState = {
  communities: [],
  communityFilters: {},
  page: 1,
  size: 10,
  subscribers: [],
  communityPage: null,
  posts: [],
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
    }),
    on(communityActions.loadCommunitySuccess, (state, payload) => {
      return {
        ...state,
        communityPage: payload.communityPage,
      }
    }),
    on(communityActions.loadSubscribersSuccess, (state, payload) => {
      return {
        ...state,
        subscribers: payload.subscribers,
      }
    }),
    on(communityActions.updateCommunity, (state, { community }) => ({
      ...state,
      communities: state.communities.map(c =>
        c.id === community.id
          ? {
            ...c,
            isJoined: community.isJoined,
            subscribersAmount: c.subscribersAmount + (community.isJoined ? 1 : -1)
          }
          : c
      )
    })),
    on(communityActions.loadCommunityPostsSuccess, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      }
    }),
  )
})
