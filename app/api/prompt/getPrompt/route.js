import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";
export const GET = async (req, res) => {
  const { id } = req.query;
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  try {
    const prompt = await Prompt.findById(id);
    const promptOwner = await User.findById(prompt?.creator);
    const promptOwnerUsername = promptOwner?.username;
    const promptOwnerImage = promptOwner?.image;
    return new Response(
      JSON.stringify({
        prompt,
        promptOwnerUsername,
        promptOwnerImage,
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
