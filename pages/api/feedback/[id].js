import { getFeedbacks } from ".";

function handler(req, res) {
  const { method, query } = req;
  if (method == "GET") {
    const allFeedbacks = getFeedbacks();
    const feedback = allFeedbacks.find((fb) => fb.id === query.id);
    res.status(200).json(feedback);
  }
}

export default handler;
