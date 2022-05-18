import {useQuery, UseQueryResult} from 'react-query';
import {getMe} from '../../api/urbaninfusion/public/users';
import {UserDto} from '../../api/urbaninfusion/dto/user-dto';

export default function useMe(): UseQueryResult<UserDto> {
    return useQuery(
        ['user'],
        () => getMe()
    );
}
