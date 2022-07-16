import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationMail(to: string, link: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: `Email confirmation for ${process.env.API_URL}`,
        template: '../templates/confirmation',
        context: {
          name: to,
          url: link,
        },
      });
    } catch (error) {
      Logger.error(`Error while sending email ${error.message}`);
    }
  }
}
