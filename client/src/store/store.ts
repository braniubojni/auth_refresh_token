import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      console.log(error);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      console.log(error);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      console.log(error);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/user/refresh`,
        {
          withCredentials: true
        }
      );
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }
}
