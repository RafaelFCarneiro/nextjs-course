import { Fragment } from "react";
import Head from "next/head";
import { getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/ui/button";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const { events, date, errorMsg } = props;
  const { year, month } = date || {};

  if (!!errorMsg) {
    return (
      <Fragment>
        {headPage(month, year)}
        <ErrorAlert>
          <p>{errorMsg}</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
        ;
      </Fragment>
    );
  }

  return (
    <Fragment>
      {headPage(month, year)}
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventList items={events} />
    </Fragment>
  );
}

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  const filters = params.slug || [];
  const [year, month] = filters.map((v) => Number(v));
  const dateProps = { date: { year, month } };

  if (!isValidYear(year) || !isValidMonth(month)) {
    return {
      props: {
        ...dateProps,
        errorMsg: "Invalid filter. Please adjust your values!",
      },
    };
  }

  const events = (await getFilteredEvents({ year, month })) || [];
  if (!events.length) {
    return {
      props: {
        ...dateProps,
        errorMsg: "No events found for the chosen filter!",
      },
    };
  }

  return { props: { ...dateProps, events } };
};

export default FilteredEventsPage;

const isValidYear = (year) => !isNaN(year) && year >= 2021 && year <= 2030;
const isValidMonth = (month) => !isNaN(month) && month >= 1 && month <= 12;
const headPage = (month, year) => (
  <Head>
    <title>Filtered Events</title>
    <meta name="description" content={`All events for ${month}/${year}`} />
  </Head>
);
