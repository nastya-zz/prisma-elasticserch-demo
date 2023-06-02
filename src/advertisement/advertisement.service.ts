import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UserByIdNotFoundException } from '../user/exceptions/user-by-id-not-found.exception';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { User } from '../generated/prisma-class/user';
import { PostNotFoundException } from '../post/exceptions/postNotFound.exception';

const getAdvertisement = (
  advertisement: CreateAdvertisementDto | UpdateAdvertisementDto,
) => ({
  title: advertisement.title,
  description: advertisement.description,
  userId: advertisement.userId,
  isNew: advertisement.isNew,
  isArchive: advertisement.isArchive,
  canCall: advertisement.canCall,
  canMessage: advertisement.canMessage,
  coordinateX: advertisement.coordinateX,
  coordinateY: advertisement.coordinateY,
  address: advertisement.address,
  images: advertisement.images,
  views: 'views' in advertisement ? advertisement.views : 0,
});

@Injectable()
export class AdvertisementService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAdvertisement(advertisement: CreateAdvertisementDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: advertisement.userId,
      },
    });

    if (!user) {
      throw new UserByIdNotFoundException(advertisement.userId);
    }

    return this.prismaService.advertisement.create({
      data: {
        ...getAdvertisement(advertisement),
      },
    });
  }

  async updateAdvertisement(advertisement: UpdateAdvertisementDto) {
    return this.prismaService.advertisement.update({
      where: {
        id: advertisement.id,
      },
      data: {
        ...getAdvertisement(advertisement),
      },
    });
  }

  async updateAdvertisementViews(id: number) {
    return this.prismaService.advertisement.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  async getAllAdvertisement() {
    return this.prismaService.advertisement.findMany();
  }

  async getAdvertisementByUserId(userId: number) {
    return this.prismaService.advertisement.findMany({
      where: {
        userId,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async delete(id: number, user: User) {
    const advertisement = await this.prismaService.advertisement.findUnique({
      where: { id },
    });

    if (!advertisement) {
      throw new PostNotFoundException(id);
    }

    if (advertisement.userId !== user.id) {
      throw new ForbiddenException(
        'Действие запрещено. Данный пользователь не может удалить эту запись!',
      );
    }

    return this.prismaService.advertisement.delete({
      where: {
        id,
      },
    });
  }
}
