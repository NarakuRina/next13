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
    const url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyDG1eIgSjPYcv85sK7VsqY2N3E_DGz0LMA';

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