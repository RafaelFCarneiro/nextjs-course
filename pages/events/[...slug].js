import { Fragment } from "react";

import { getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/ui/button";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const { events, date, errorMsg } = props;

  if (!!errorMsg) {
    return showError({ msg: errorMsg });
  }
  
  const { year, month } = date;
  return (
    <Fragment>
      <ResultsTitle date={new Date(year, month - 1) } />
      <EventList items={events} />
    </Fragment>
  );
}

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  const filters = params.slug || [];

  const [year, month] = filters.map((v) => Number(v));
  if (!isValidYear(year) || !isValidMonth(month)) {
    return { props: { errorMsg: "Invalid filter. Please adjust your values!" } };
  }

  const events = (await getFilteredEvents({ year, month })) || [];
  if (!events.length) {
    return { props: { errorMsg: "No events found for the chosen filter!" } };
  }

  return { props: { events, date: { year, month } } };
};

export default FilteredEventsPage;

const isValidYear = (year) => !isNaN(year) && year >= 2021 && year <= 2030;
const isValidMonth = (month) => !isNaN(month) && month >= 1 && month <= 12;
const showError = ({ msg }) => (
  <Fragment>
    <ErrorAlert>
      <p>{msg}</p>
    </ErrorAlert>
    <div className="center">
      <Button link="/events">Show All Events</Button>
    </div>
    ;
  </Fragment>
);
