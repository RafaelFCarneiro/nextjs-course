import fs from "fs";
import path from "path";

function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    res.status(201).json({
      message: "Success!",
      feedback: saveFeedback(body),
    });  
  } else {
    const { data } = getFileInfo();
    res.status(200).json(data);
  }  
}

export default handler;
export const getFeedbacks = () => getFileInfo().data;

const saveFeedback = ({ email, text }) => {
  const newFeedback = {
    id: new Date().toISOString(),
    email,
    text,
  };
  
  const { data, filePath } = getFileInfo();
  data.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(data));
  
  return newFeedback;
}

const getFileInfo = () => {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData) || [];
  return { data, filePath };
}

