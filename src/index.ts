import * as mqtt from "mqtt";

import { options, topics } from "./config";

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("[monitor]: connected to mqtt broker.");

  const topicsNames = topics.map((topic) => topic.name);
  client.subscribe(topicsNames, { qos: 1 }, (err, granted) => {
    if (!err)
      granted.forEach((grant) =>
        console.log(`[monitor]: subscribed to ${grant.topic} with qos ${grant.qos}`)
      );
    else console.log(`[monitor]: subscribe error (${err.name}: ${err.message}).`);
  });
});

client.on("error", (err) => {
  console.log(`[monitor]: connection error (${err.name}: ${err.message}).`);
});

client.on("message", (topicName, message) => {
  const foundTopic = topics.find((topic) => topic.name === topicName);
  if (!foundTopic || !foundTopic.callback) return;
  foundTopic.callback(message);
});

client.on("reconnect", () => {
  console.log("[monitor]: reconnecting to mqtt broker.");
});

client.on("close", () => {
  console.log("[monitor]: disconnected from mqtt broker.");
});
