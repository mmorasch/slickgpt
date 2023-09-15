import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export interface IChatMessage {
  role: 'user' | 'assistant' | 'system';
  message: string
}

export interface IChat {
  messages: IChatMessage[];
}

export interface IChatStore extends Writable<{ [key: string]: IChat }> {
  addMessage(slug: string, message: IChatMessage): void;
  clear(slug: string): void;
}
const _chatStore: Writable<{ [key: string]: IChat }> = localStorageStore('chatStore', {});

export const chatStore: IChatStore = {
  subscribe: _chatStore.subscribe,
  set: _chatStore.set,
  update: _chatStore.update,
  addMessage: (slug: string, message: IChatMessage) => {
    _chatStore.update((chatStore) => {
      const chat = chatStore[slug];
      if (!chat) {
        return chatStore;
      }
      chat.messages.push(message);
      return {
        ...chatStore,
        [slug]: chat
      }
    });
  },
  clear: (slug: string) => {
    _chatStore.update((chatStore) => {
      const chat = chatStore[slug];
      if (!chat) {
        return chatStore;
      }
      return {
        ...chatStore,
        [slug]: {
          ...chat,
          messages: []
        }
      }
    });
  }
}