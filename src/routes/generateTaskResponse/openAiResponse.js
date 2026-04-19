import express from "express";

import OpenAI from "openai";
import auth from "../../config/config.js";

const openai = new OpenAI({
  apiKey: auth.openAiAPI,
});

const router = express.Router();

router.post("/openAiResponse", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const data = await openaiTaskGenerator(prompt);

    return res.status(200).json({
      success: true,
      response: data,
    });
  } catch (err) {
    console.error("OpenAI task generation error:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to get response from OpenAI",
    });
  }
});

const openaiTaskGenerator = async (prompt) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions: `
        You are SmartDo, an intelligent assistant that transforms
        user prompts into clear, actionable to-do lists.

        Format all output in Markdown.

        Rules:
        - Start with a main heading summarizing the topic.
        - The main heading must be bolded using double asterisks,
          for example: **Heading**
        - Do not use Markdown header symbols such as # or ##.
        - Break the list into logical sections using bold subheadings.
        - Use checkbox-style bullet points (- [ ]) for every individual task.
        - Do not include explanations or extra commentary.
        - Only provide the structured task list.
        - Give at least 4 sections/headings when possible and feasible.
      `,
      input: `User: ${prompt}`,
    });

    return response.output_text;
  } catch (error) {
    console.error("OpenAI API :: Text Generation :: ", error);
    throw error;
  }
};

export default router;
