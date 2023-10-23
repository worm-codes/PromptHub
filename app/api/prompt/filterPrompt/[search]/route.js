import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  const { search } = params;
  console.log(search);
  try {
    const regexSearch = new RegExp(search, "i");

    const prompts = await Prompt.find()
      .populate("creator")
      .or([
        { tags: { $regex: regexSearch } },
        { prompt: { $regex: regexSearch } },
      ]);

    return new Response(
      JSON.stringify({
        prompts,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      {
        status: 500,
      }
    );
  }
};
