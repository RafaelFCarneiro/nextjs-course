import { useRouter } from "next/dist/client/router";
import { Fragment } from "react";

import { getFilteredEvents } from "../../dummy-data";
import Button from "../../components/ui/button";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filters = router.query.slug || [];

  if (!filters.length) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filters.map((v) => Number(v));
  if (!isValidYear(year) || !isValidMonth(month)) {
    return showError({ msg: "Invalid filter. Please adjust your values!" });
  }

  const filteredEvents = getFilteredEvents({ year, month }) || [];
  if (!filteredEvents.length) {
    return showError({ msg: "No events found for the chosen filter!" });
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

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
