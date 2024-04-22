import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class twilioSMSService {
  public constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async sendSMS(targetNumber: string, codeForVerify: string) {
    return this.twilioService.client.messages.create({
      body: `Your code for verify ${codeForVerify}`,
      from: this.configService.getOrThrow('TWILIO_PHONE_NUMBER'),
      to: targetNumber,
    });
  }
}
