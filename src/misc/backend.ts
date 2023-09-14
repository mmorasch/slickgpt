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
      get: (datapoint_id: string) => fetch(settings.BACKEND + `prediction/${datapoint_id}`)
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