import {useMutation} from 'react-query';
import {addComment} from '../../api/urbaninfusion/public/comments';
import {AddCommentDto} from '../../api/urbaninfusion/dto/comment-dto';

export const useAddComment = () => {
    return useMutation(
        (data: AddCommentDto) => addComment(data)
    );
};
