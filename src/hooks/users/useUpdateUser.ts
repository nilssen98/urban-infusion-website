import {useMutation, useQueryClient} from 'react-query';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {updateUser} from '../../api/urbaninfusion/public/users';
import {store} from '../../state/store';

export const useUpdateUser = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: Partial<UserDto>) => updateUser(id, data), {
            onSuccess: () => queryClient.invalidateQueries('user')
        }
    );
};
