import React from "react"
import { Calendar as CalendarI, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

function Calendar() {
  const localizer = momentLocalizer(moment)

  React.useEffect(() => {
    getEvents()
  }, [])

  const [events, setEvents] = React.useState([])

  if (!events) {
    return "Loading.."
  }

  const getEvents = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        let eventArray = []
        for (let i = 0; i < data.length; i++) {
          eventArray.push({
            title: data[i].activity,
            start: new Date(data[i].date),
            end: moment(data[i].date).add(data[i].duration, "min").toDate(),
          })
          setEvents(eventArray)
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div style={{ height: "600px" }}>
      <CalendarI
        localizer={localizer}
        events={events}
        step={60}
        defaultView={"month"}
      />
    </div>
  )
}

export default Calendar
