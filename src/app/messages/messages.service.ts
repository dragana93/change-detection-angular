import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
