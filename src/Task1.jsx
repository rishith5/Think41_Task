import React, { useState } from 'react';

function EventScheduler() {
  const [startDate, setStartDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [occurrences, setOccurrences] = useState(1);
  const [viewStart, setViewStart] = useState('');
  const [viewEnd, setViewEnd] = useState('');
  const [instances, setInstances] = useState([]);

  const generateInstances = () => {
    const daysMap = {
      Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6
    };
    const eventDates = [];
    const baseDate = new Date(startDate);
    let date = new Date(baseDate);

    while (eventDates.length < occurrences) {
      if (date.getDay() === daysMap[dayOfWeek]) {
        eventDates.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }

    const viewStartDate = new Date(viewStart);
    const viewEndDate = new Date(viewEnd);
    const filtered = eventDates.filter(d => d >= viewStartDate && d <= viewEndDate);

    setInstances(filtered);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Event Scheduler</h2>

      <label>Event Start Date:</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />

      <br /><br />

      <label>Day of Week:</label>
      <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
        {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(day =>
          <option key={day} value={day}>{day}</option>
        )}
      </select>

      <br /><br />

      <label>Number of Occurrences:</label>
      <input type="number" min="1" value={occurrences} onChange={e => setOccurrences(e.target.value)} />

      <br /><br />

      <label>View Window Start:</label>
      <input type="date" value={viewStart} onChange={e => setViewStart(e.target.value)} />

      <br /><br />

      <label>View Window End:</label>
      <input type="date" value={viewEnd} onChange={e => setViewEnd(e.target.value)} />

      <br /><br />

      <button onClick={generateInstances}>Generate Instances</button>

      <h3>Generated Event Instances:</h3>
      <ul>
        {instances.map((date, idx) => (
          <li key={idx}>{date.toDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventScheduler;