import {UserDto} from '../dto/user-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {login} from './login';

export async function getMe(jwt?: string): Promise<UserDto> {
    return (await axios.get<UserDto>(
        `${baseUrl}/users/me`,
        {
            headers: {
                Authorization: jwt || ''
            }
        }
    )).data;
}

export async function updateUser(user: UserDto, jwt?: string): Promise<any> {
    return await axios.patch(`${baseUrl}/users`,
        {...user},
        {headers: {Authorization: jwt || ''}}
    );
}

export async function changePassword(user: UserDto, password: string, jwt?: string): Promise<any> {
    return await axios.patch(`${baseUrl}/users/${user.id}`,
        {password},
        {headers: {Authorization: jwt || ''}}
    );
}

export async function isValidPassword(password: string, user: UserDto): Promise<boolean> {
    return await login({username: user.username, password})
        .then(e => true)
        .catch(e => false);
}
