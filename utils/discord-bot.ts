export const startDiscordBotServer = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_DISCORD_BOT_API}`)
}
