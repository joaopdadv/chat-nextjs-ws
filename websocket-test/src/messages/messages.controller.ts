import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('received-by-user/:id')
  receivedByUser(@Param('id') id: string) {
    return this.messagesService.receivedByUser(id);
  }

  @Get('sended-by-user/:id')
  sendByUser(@Param('id') id: string) {
    return this.messagesService.sendedUser(id);
  }

  @Get('chat/:sender/:receiver')
  chatUser(@Param('sender') sender: string, @Param('receiver') receiver: string) {
    return this.messagesService.chat(sender, receiver);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

}
