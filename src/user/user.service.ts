import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AuthExceptions } from '../core/constants/auth.contacts';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getUserByUsername(number: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        number,
      },
    });
    if (!user) {
      throw new HttpException(
        AuthExceptions.USERS_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async getUserByUsernameThrow(number: string): Promise<User> {
    console.log('number', number);
    const user = await this.prisma.user.findUnique({
      where: {
        number,
      },
    });

    if (user) {
      throw new HttpException(
        AuthExceptions.ALREDY_REGISTERED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
