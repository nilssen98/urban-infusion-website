import {UserDto} from '../dto/user-dto';
import axios from 'axios';
import {baseUrl} from './public';

export async function getMe(jwt: string): Promise<UserDto> {
    return (await axios.get<UserDto>(
        `${baseUrl}/users/me`,
        { headers: { Authorization: jwt } }
    )).data;
}

export async function updateUser(id: number, data: Partial<UserDto>): Promise<any> {
    return axios.patch(`${baseUrl}/users/${id}`, {data});
}
