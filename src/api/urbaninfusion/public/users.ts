import {UserDto} from '../dto/user-dto';
import axios from 'axios';
import {baseUrl} from './public';

export async function getMe(jwt: string): Promise<UserDto> {
    return (await axios.get<UserDto>(
        `${baseUrl}/users/me`,
        { headers: { Authorization: jwt } }
    )).data;
}
