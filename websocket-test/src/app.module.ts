import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [PrismaModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
