import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { getFeedbacks } from "../api/feedback";

function FeedbackPage({ feedbackItems }) {
  const [feedback, setFeedback] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then(setFeedback);
  }

  return (
    <Fragment>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export const getStaticProps = async (ctx) => {
  return { props: { feedbackItems: getFeedbacks() } };
};

export default FeedbackPage;
