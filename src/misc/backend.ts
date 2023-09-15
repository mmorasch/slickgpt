import type { IChat } from './michiStores';
import settings from './settings';
import type { IDatapoint } from './types';

export default {
  xai: {
    datapoint: {
      post: (slug: string, score: string) => fetch(settings.BACKEND + slug + '/datapoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score
        })
      })
    },
    start_prompt: {
      post: (slug: string, prediction: "0" | "1", datapoint: IDatapoint, score: string) => fetch(settings.BACKEND + slug + '/start_prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          datapoint,
          prediction,
          score
        })

      })
    },
    message: {
      post: (slug: string, chat: IChat, datapoint: IDatapoint, score: string) => fetch(settings.BACKEND + `message/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: chat.messages,
          datapoint,
          score
        })
      })
    }
  }
}