import { Module } from '@nestjs/common';
import { HelperService } from './helper.servise';

@Module({
  imports: [],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
