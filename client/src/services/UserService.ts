import { AxiosResponse } from 'axios';
import $api from '../http/indes';
import { IUser } from '../models/IUser';

export default class AuthService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
