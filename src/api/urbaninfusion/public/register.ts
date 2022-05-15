import axios from 'axios';
import {baseUrl} from './public';
import {RegisterFormDto} from '../dto/register-dto';

export async function register(data: RegisterFormDto): Promise<any> {
    return (await axios.post<any>(`${baseUrl}/register`, data)).data;
}
