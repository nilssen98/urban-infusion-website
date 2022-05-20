import {useMutation, useQueryClient} from 'react-query';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {updateUser} from '../../api/urbaninfusion/public/users';
import {store} from '../../state/store';

export const useUpdateUser = () => {
    const jwt = store.getState().user.jwt;
    const query = useQueryClient();

    return useMutation(
        (data: UserDto) => updateUser(data, jwt), {
            onSuccess: () => query.invalidateQueries(['user', jwt])
        }
    );
};
