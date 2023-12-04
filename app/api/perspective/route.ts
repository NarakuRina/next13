import axios, { AxiosResponse } from 'axios';

type CommentRequest = {
  text: string;
};

type RequestedAttributes = {
  TOXICITY: Record<string, unknown>;
};

type RequestBody = {
  comment: CommentRequest;
  requestedAttributes: RequestedAttributes;
};

const getPerspectiveAPIScore = async (text: string): Promise<number> => {
  try {
    // Your Comment Analyzer API URL
    const url = process.env.PERSPECTIVE_URL;

    const requestBody: RequestBody = {
      comment: { text },
      requestedAttributes: {
        TOXICITY: {},
      },
    };

    const response: AxiosResponse = await axios.post(url, requestBody);
    const toxicityScore: number =
      response.data.attributeScores.TOXICITY.summaryScore.value || 0;

    return toxicityScore;
  } catch (error) {
    return 0;
  }
};

export default getPerspectiveAPIScore;