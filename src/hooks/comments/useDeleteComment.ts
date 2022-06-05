import {useMutation} from 'react-query';
import {deleteComment} from '../../api/urbaninfusion/public/comments';

export const useDeleteComment = () => {
    return useMutation(
        (id: number) => deleteComment(id)
    );
};
