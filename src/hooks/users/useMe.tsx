import {useQuery, UseQueryResult} from 'react-query';
import {getMe} from '../../api/urbaninfusion/public/users';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';
import {store} from '../../state/store';

export default function useMe(): UseQueryResult<UserDto> {
    const jwt = store.getState().user.jwt;
    return useQuery(
        ['user', jwt],
        () => getMe(jwt), {
            enabled: jwt !== undefined
        }
    );
}
