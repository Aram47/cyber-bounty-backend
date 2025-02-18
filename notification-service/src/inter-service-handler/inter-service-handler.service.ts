import { Injectable } from '@nestjs/common';
import { ObserverService } from '../observer/observer.service';

@Injectable()
export class InterServiceHandlerService {
  constructor(private readonly observer: ObserverService) {}
  findOne(id: string) {
    if (!this.observer.getFromDb('users', id)) {
      this.observer.addStatusToDb(id);
      return 'Okay';
    }
    this.observer.removeStatusFromDb(id);
    this.observer.sendMessageToUser(id, 'Albulda ok');
    return 'Okay Nema';
  }
}
