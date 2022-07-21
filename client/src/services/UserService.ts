import { AxiosResponse } from 'axios';
import $api from '../http';
import { IUser } from '../models/IUser';

export default class AuthService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/user/all');
  }
}
