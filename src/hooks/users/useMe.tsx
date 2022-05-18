import {useQuery, UseQueryResult} from 'react-query';
import {getMe} from '../../api/urbaninfusion/public/users';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';

export default function useMe(jwt?: string): UseQueryResult<UserDto> {
    return useQuery(
        ['user'],
        () => getMe(jwt!), {
            enabled: jwt !== undefined
        }
    );
}
