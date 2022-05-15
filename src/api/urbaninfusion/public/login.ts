import {CategoriesDto} from '../dto/categories-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {LoginFormDto} from '../dto/login-dto';

export async function login(data: LoginFormDto): Promise<string | undefined> {
    return (await axios.post<string | undefined>(`${baseUrl}/login`, data)).headers.authorization;
}
