import {store} from '../../state/store';
import {useMutation, useQueryClient} from 'react-query';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {changePassword, updateUser} from '../../api/urbaninfusion/public/users';

export const useChangePassword = (user: UserDto) => {
    const jwt = store.getState().user.jwt;
    const query = useQueryClient();

    return useMutation(
        (password: string) => changePassword(user, password, jwt), {
            onSuccess: () => query.invalidateQueries(['user', jwt])
        }
    );
};
