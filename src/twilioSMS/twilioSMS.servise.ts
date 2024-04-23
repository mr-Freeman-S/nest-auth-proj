import { Injectable } from '@nestjs/common';
import { TwilioClient } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import { createTwilioClient } from 'nestjs-twilio/dist/utils';

@Injectable()
export class TwilioSMSService {
  public constructor(private readonly configService: ConfigService) {}
  client: TwilioClient;
  async sendSMS(targetNumber: string, codeForVerify: string) {
    this.client = createTwilioClient({
      accountSid: this.configService.getOrThrow('TWILIO_ACCOUNT_SID'),
      authToken: this.configService.getOrThrow('TWILIO_AUTH_TOKEN'),
    });

    return this.client.messages.create({
      body: `Your code for verify ${codeForVerify}`,
      from: this.configService.getOrThrow('TWILIO_PHONE_NUMBER'),
      to: targetNumber,
    });
  }
}
