import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
}

interface Message {
  sender: any;
  receiver: any;
  content: string;
  timestamp: Date;
}

import {
  Database,
  ref,
  push,
  onChildAdded,
  query,
  orderByChild,
  onValue,
} from '@angular/fire/database';
import { SidebarService } from '../loginservice/loginservice';

@Component({
  selector: 'app-chatbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css',
})
export class ChatboxComponent implements OnInit {
  constructor(private sidebarservice: SidebarService, private db: Database) {}

  ngOnInit(): void {
    this.sidebarservice.emailsget().then((data) => {
      this.users = data;
    });

    this.sidebarservice.email$.subscribe((data) => {
      this.currentUser = data;
    });
  }
  currentUser = 'uday';
  selectedUser: any | null = null;
  messageText = '';
  showChatbox = true;

  users: User[] = [];

  messages: Message[] = [];

  get filteredMessages(): Message[] {
    if (this.selectedUser === null) return [];
    return this.messages.filter(
      (msg) =>
        (msg.sender === this.currentUser &&
          msg.receiver === this.selectedUser) ||
        (msg.sender === this.selectedUser && msg.receiver === this.currentUser)
    );
  }

  getmessage() {
    if (this.selectedUser) {
      const username1 = this.currentUser.split('@')[0];
      const username2 = this.selectedUser.split('@')[0];

      const sorted = [username1, username2].sort();
      const chatcode = sorted.join('');
      const messagesRef = ref(this.db, `personalchat/${chatcode}`);
      const orderedQuery = query(messagesRef, orderByChild('timestamp'));

      onValue(orderedQuery, (snapshot: any) => {
        const data = snapshot.val();
        this.messages = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
      });
    }
    console.log(this.messages);
  }

  getSenderName(senderId: any): string {
    if (senderId === this.currentUser) return 'You';
    const user = this.users.find((u) => u.id === senderId);
    return user ? user.name : 'Unknown';
  }

  sendMessage() {
    if (this.messageText.trim() && this.selectedUser !== null) {
      const username1 = this.currentUser.split('@')[0];
      const username2 = this.selectedUser.split('@')[0];

      const sorted = [username1, username2].sort(); // alphabetical sort
      const chatcode = sorted.join('');

      let messagesent = {
        sender: this.currentUser,
        receiver: this.selectedUser,
        content: this.messageText,
        timestamp: new Date(),
      };

      const chatRef = ref(this.db, `personalchat/${chatcode}`);
      push(chatRef, messagesent)
        .then(() => console.log('Message sent'))
        .catch((error) => console.error('Error:', error));

      this.messageText = '';
    }
  }

  closeChatbox() {
    this.sidebarservice.chatboxfun(false);
  }
}
