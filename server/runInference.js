const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

const token = process.env["API_KEY"];
const endpoint = "https://models.github.ai/inference";

async function runInference({ model, messages, temperature = 1, top_p = 1 }) {
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages,
      temperature,
      top_p,
      model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body.choices[0].message.content;
}

module.exports = runInference;