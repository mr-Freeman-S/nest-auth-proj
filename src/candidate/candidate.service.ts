import { Injectable } from '@nestjs/common';
import { Candidate, Prisma } from '@prisma/client';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async createCandidate(
    candidate: Prisma.CandidateCreateInput,
  ): Promise<Candidate> {
    return this.prisma.candidate.create({ data: candidate });
  }

  async removeCandidate(id: string): Promise<Candidate> {
    return this.prisma.candidate.delete({ where: { id } });
  }

  async getCandidate(
    candidateWhereUniqueInput: Prisma.CandidateWhereUniqueInput,
  ): Promise<Candidate> {
    return this.prisma.candidate.findUnique({
      where: candidateWhereUniqueInput,
    });
  }
}
