import { AppThunk } from '../app/store';
import { updateReviewInList } from '../features/bookReviews/bookReviewsSlice';
// import { updateReviewDetail } from '../features/bookReviewDetail/bookReviewDetailSlice';
import { BookReview } from '../types/bookReview';

// Homeがマウントされるたびにデータをフェッチするようになっているから意味ない
export const updateReviewInBothSlices = (updatedReview: BookReview): AppThunk => async (dispatch) => {
  // レビュー一覧を更新
  dispatch(updateReviewInList(updatedReview));
  
  // レビュー詳細を更新
//   dispatch(updateReviewDetail(updatedReview));
};
