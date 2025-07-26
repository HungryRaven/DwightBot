import "dotenv/config";
import { Context, Telegraf, Input } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";

const BOT_TOKEN = process.env.TOKEN;

if (!BOT_TOKEN) {
  throw new Error("TOKEN is missing!");
}

const bot = new Telegraf<Context>(BOT_TOKEN);

/* -------------------------------------------------------------------------- */
/*                                    START                                   */
/* -------------------------------------------------------------------------- */

bot.start((ctx: Context) => ctx.reply("Welcome !"));

/* -------------------------------------------------------------------------- */
/*                                TEST MESSAGE                                */
/* -------------------------------------------------------------------------- */

bot.on("text", async (ctx: Context) => {
  if (!ctx.message) return;
  const message = ctx.message as Message.TextMessage;
  const messageText: string = message.text;
  console.log(messageText);

  if (messageText.toLocaleLowerCase() === "hello") {
    await ctx.replyWithVideo(
      Input.fromURL(
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejA4cW8zcGlsa2c5aTVjcXZwdmI0dGwzYnJ5YnlmOHU4dGc3N3J6MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xaLjIV9qDtnvrh76NF/giphy.gif"
      )
    );
    return;
  }
  await ctx.telegram.sendMessage(ctx.message.chat.id, `Not interested.`);
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
