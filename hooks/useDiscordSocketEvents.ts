import { useEffect } from 'react'
import { socketDiscord } from '../utils/socket'

export function useDiscordSocketEvents (
  events: { name: string; handler: (data: any) => void }[]
) {
  useEffect(() => {
    for (const event of events) {
      socketDiscord.on(event.name, event.handler)
    }

    return function () {
      for (const event of events) {
        socketDiscord.off(event.name)
      }
    }
  }, [])
}
