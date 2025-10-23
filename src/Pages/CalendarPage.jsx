"use client";
import { useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Plus, Filter, CalendarDays, Download, Clock } from "lucide-react";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Morning Checkup",
      start: new Date(2025, 9, 21, 9, 0),
      end: new Date(2025, 9, 21, 10, 0),
    },
    {
      title: "Blood Donation Camp",
      start: new Date(2025, 9, 22, 11, 0),
      end: new Date(2025, 9, 22, 13, 0),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    setEvents([
      ...events,
      {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      },
    ]);
    setIsOpen(false);
    setNewEvent({ title: "", start: "", end: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* === Top Header === */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-xl shadow-sm">
            <CalendarDays size={18} /> Today
          </button>
          <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-xl shadow-sm">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-xl shadow-sm">
            <Download size={18} /> Export
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700"
          >
            <Plus size={18} /> Create Task
          </button>
        </div>
      </div>

      {/* === Calendar === */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          views={["week"]}
          defaultView="week"
          step={60}
          timeslots={1}
          popup
          selectable
          eventPropGetter={() => ({
            className: "bg-red-500 text-white rounded-md p-1 shadow",
          })}
        />
      </div>

      {/* === Modal for Adding Event === */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-3">
              Create New Event
            </Dialog.Title>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              value={newEvent.start}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-3 py-2 mb-3"
              value={newEvent.end}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
