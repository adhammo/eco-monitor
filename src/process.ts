import { OnMessageCallback } from "./topic";
import { saveTemp } from "./save";

export const TempMsgCallback: OnMessageCallback = (message) => {
  console.log(`[monitor]: received message (${message}) on temperature topic.`);

  const tempVal = parseFloat(message.toString());
  if (isNaN(tempVal))
    console.log(`[monitor]: temperature message (${message}) was ill formatted.`);

  saveTemp(tempVal);
};
