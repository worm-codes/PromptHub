import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//get
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  try {
    const { id } = params;
    const prompt = await Prompt.findById(id)
      .populate("creator")
      .sort({ createdAt: -1 });
    if (!prompt) {
      return new Response(
        JSON.stringify({
          prompt: null,
        }),
        {
          status: 404,
        }
      );
    }
    return new Response(
      JSON.stringify({
        prompt,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
};

// pathch

export const PATCH = async (req, { params }) => {
  const { prompt, tags } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response(
        JSON.stringify({
          prompt: null,
        }),
        {
          status: 404,
        }
      );
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tags = tags;
    await existingPrompt.save();
    return new Response(
      JSON.stringify({
        prompt: existingPrompt,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(err, {
      status: 500,
    });
  }
};

// delete

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findByIdAndRemove(params.id);
    if (!existingPrompt) {
      return new Response(
        JSON.stringify({
          prompt: null,
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        prompt: existingPrompt,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(err, {
      status: 500,
    });
  }
};
