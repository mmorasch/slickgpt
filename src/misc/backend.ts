import type { IChat } from './michiStores';
import settings from './settings';

export default {
  xai: {
    datapoint: {
      get: () => fetch(settings.BACKEND + 'datapoint')
    },
    expert: {
      get: (datapoint_id: string) => fetch(settings.BACKEND + `expert/${datapoint_id}`)
    },
    prediction: {
      get: () => fetch(settings.BACKEND + `prediction/0`)
    },
    threshold: {
      get: () => fetch(settings.BACKEND + `threshold`)
    },
    start_prompt: {
      get: (slug: string, prediction: "0" | "1") => fetch(settings.BACKEND + `start_prompt/${slug}?prediction=${prediction}`)
    },
    message: {
      post: (slug: string, chat: IChat) => fetch(settings.BACKEND + `message/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chat)
      })
    }
  }
}