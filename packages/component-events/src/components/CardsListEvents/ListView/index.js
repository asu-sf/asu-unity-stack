// @ts-check
import { FeedContext, Card } from "@asu-design-system/components-core";
import React, { useContext } from "react";

import { formatDate, formatTime } from "../../../core/utils";
import { ListViewWrapper } from "./index.styles";

const ListView = () => {
  const { feeds } = useContext(FeedContext);

  return (
    <ListViewWrapper>
      {feeds?.map(event => (
        <li key={event.id}>
          <Card
            type="event"
            eventFormat="inline"
            horizontal
            eventTime={`<span>
                ${formatDate(event.startDate, "COMPLETE")} <br /> ${formatTime(
              event.startDate,
              event.endDate
            )}
              </span>`}
            eventLocation={event.location}
            clickable={!!event.alias}
            clickHref={`${event.alias}/?eventDate=${formatDate(
              event.startDate,
              "ISO"
            )}`}
            title={event.title}
            image={event.imageUrl}
            imageAltText={event.title}
            linkLabel={event.eventButtonText}
            linkUrl={event.eventButtonUrl}
          />
        </li>
      ))}
    </ListViewWrapper>
  );
};

export { ListView };
