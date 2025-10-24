import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {

  private messageService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);
  messages: string[] = [];
  private destroyRef = inject(DestroyRef);

  // messages = this.messageService.allMessages;

  ngOnInit(): void {
    const subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // get messages() {
  //   return this.messageService.allMessages;
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
