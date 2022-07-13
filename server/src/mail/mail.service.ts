import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendActivationMail(to: string, link: string): Promise<void> {}
}
