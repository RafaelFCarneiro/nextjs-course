import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find all events..."
        />
      </Head>      
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export const getStaticProps = async (ctx) => {
  const events = await getAllEvents();
  return { props: { events, revalidate: 60 } };
};

export default AllEventsPage;
