import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MessageOptions } from 'src/app/core/interfaces/message-options'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  success(message: string, title: string = 'Success', options: MessageOptions = {}): void {
    this.messageService.add({ severity: 'success', summary: title, detail: message, ...options });
  }

  info(message: string, title: string = 'Info', options: MessageOptions = {}): void {
    this.messageService.add({ severity: 'info', summary: title, detail: message, ...options });
  }

  warn(message: string, title: string = 'Warning', options: MessageOptions = {}): void {
    this.messageService.add({ severity: 'warn', summary: title, detail: message, ...options });
  }

  error(message: string, title: string = 'Error', options: MessageOptions = {}): void {
    this.messageService.add({ severity: 'error', summary: title, detail: message, ...options });
  }

  clear() {
    this.messageService.clear();
  }

}
