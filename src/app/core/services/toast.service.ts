import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MessageOptions } from 'src/app/core/interfaces/message-options'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  success(message: string, options: MessageOptions = {}): void {
    this.messageService.add({ 
      severity: 'success',
      summary: options?.title ?? 'Success',
      detail: message,
      ...options 
    });
  }

  info(message: string, options: MessageOptions = {}): void {
    this.messageService.add({
      severity: 'info',
      summary: options?.title ?? 'Info',
      detail: message,
      ...options
    });
  }

  warn(message: string, options: MessageOptions = {}): void {
    this.messageService.add({
      severity: 'warn',
      summary: options?.title ?? 'Warning',
      detail: message,
      ...options
    });
  }

  error(message: string, options: MessageOptions = {}): void {
    this.messageService.add({ 
      severity: 'error',
      summary: options?.title ?? 'Error',
      detail: message,
      ...options
    });
  }

  clear() {
    this.messageService.clear();
  }

}
