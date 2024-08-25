import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from '@app/common/common.constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Nuber <Nuber@mailgun-test.com>`);
    form.append('to', `baconbacon1231@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach(emailVar => {
      form.append(`v:${emailVar.key}`, emailVar.value);
    });

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (e) {
      console.log(e);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
