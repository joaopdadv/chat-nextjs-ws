import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {

  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.message.findMany();
  }

  receivedByUser(id: string) {
    return this.prisma.message.findMany({
      where:{
        to: id
      }
    });
  }

  sendedUser(id: string) {
    return this.prisma.message.findMany({
      where:{
        from: id
      }
    });
  }

  chat(sender: string, receiver: string) {
    return this.prisma.message.findMany({
      where:{
        to: receiver,
        from: receiver
      }
    });
  }

  findOne(id: string) {
    return this.prisma.message.findUnique({
      where:{
        id,
      }
    });
  }

}
