import io from "socket.io-client";
//SOCKET OBJECT
export const socketDiscord = io(`${process.env.NEXT_PUBLIC_DISCORD_BOT_API}`, {
  autoConnect: false,
  auth: {
    token: "",
  },
});
