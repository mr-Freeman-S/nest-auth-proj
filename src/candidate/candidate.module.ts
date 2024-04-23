import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { PrismaService } from '../core/prisma/prisma.service';

@Module({
  providers: [CandidateService, PrismaService],
  exports: [CandidateService],
})
export class CandidateModule {}
