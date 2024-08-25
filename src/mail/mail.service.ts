import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('testing', 'test');
  }
  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Nuber <Nuber@mailgun-test.com>`);
    form.append('to', `baconbacon1231@gmail.com`);
    form.append('subject', subject);
    form.append('template', 'verify-email');
    form.append('v:code', 'as');
    form.append('v:username', 'Gorani');
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log(response.body);
  }
}
