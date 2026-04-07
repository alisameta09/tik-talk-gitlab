import { createSelector } from '@ngrx/store'
import { communityFeature } from './reducer'

export const selectFilteredCommunities = createSelector(
  communityFeature.selectCommunities,
  (communities) => communities
)

export const selectCommunitiesPageble = createSelector(
  communityFeature.selectCommunityFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    }
  }
)

export const selectCommunitiesFilters = createSelector(
  communityFeature.selectCommunityFilters,
  (filters) => filters
)

export const selectSelectedCommunity = createSelector(
  communityFeature.selectCommunityPage,
  (communityPage) => communityPage
)

export const selectSelectedSubscribers = createSelector(
  communityFeature.selectSubscribers,
  (subscribers) => subscribers.slice(0, 6)
)

export const selectSelectedCommunityPosts = createSelector(
    communityFeature.selectPosts,
    (posts) => posts
)
