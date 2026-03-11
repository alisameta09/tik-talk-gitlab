import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Post, PostComment} from '../index';
import {CommentCreateDto, PostCreateDto} from '../interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'posts',
  events: {
    'create post': props<{ payload: PostCreateDto }>(),
    'fetch posts': emptyProps(),
    'posts loaded': props<{ posts: Post[] }>(),

    'create comment': props<{ payload: CommentCreateDto }>(),
    'fetch comments': props<{ postId: number }>(),
    'comments loaded': props<{ comments: PostComment[] }>()
  }
})
