import {CategoriesDto} from '../dto/categories-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {LoginFormDto} from '../dto/login-dto';

export async function login(data: LoginFormDto): Promise<string | undefined> {
    const r = (await axios.post<string | undefined>(`${baseUrl}/login`, data));
    return r.headers.authorization;
}
