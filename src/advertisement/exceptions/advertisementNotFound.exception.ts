import { NotFoundException } from '@nestjs/common';

export class AdvertisementNotFoundException extends NotFoundException {
  constructor(advertisementId: number) {
    super(`Объявление с id - ${advertisementId} не найдено`);
  }
}
