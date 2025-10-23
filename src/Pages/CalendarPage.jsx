"use client";
import { useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Plus,
  Filter,
  CalendarDays,
  Download,
  Trash2,
  XCircle,
  Edit,
} from "lucide-react";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(BigCalendar);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    label: "",
    priority: "",
    color: "#3B82F6",
    start: "",
    end: "",
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsViewOpen(false);
    setIsEditing(false);
    setSelectedEvent(null);
  };

  const openCreateModal = () => {
    setFormData({
      title: "",
      description: "",
      label: "",
      priority: "",
      color: "#3B82F6",
      start: "",
      end: "",
    });
    setIsEditing(false);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.start || !formData.end) return;

    if (isEditing && selectedEvent) {
      setEvents(
        events.map((ev) =>
          ev === selectedEvent
            ? {
                ...ev,
                ...formData,
                start: new Date(formData.start),
                end: new Date(formData.end),
              }
            : ev
        )
      );
    } else {
      setEvents([
        ...events,
        {
          ...formData,
          start: new Date(formData.start),
          end: new Date(formData.end),
        },
      ]);
    }
    closeModal();
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsViewOpen(true);
  };

  const handleEdit = () => {
    setFormData({
      ...selectedEvent,
      start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
      end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
    });
    setIsEditing(true);
    setIsViewOpen(false);
    setIsOpen(true);
  };

  const handleDelete = (event) => {
    setEvents(events.filter((ev) => ev !== event));
    closeModal();
  };

  const onEventResize = ({ event, start, end }) => {
    setEvents(events.map((e) => (e === event ? { ...e, start, end } : e)));
  };

  const onEventDrop = ({ event, start, end }) => {
    setEvents(events.map((e) => (e === event ? { ...e, start, end } : e)));
  };

  // === STYLE each event ===
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || "#2563EB",
      borderRadius: "10px",
      color: "white",
      border: "none",
      padding: "6px 10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  });

  // === CUSTOM EVENT CARD ===
  const EventCard = ({ event }) => (
    <div className="flex flex-col text-xs leading-tight">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{event.title}</span>
        {event.priority && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              event.priority === "Urgent"
                ? "bg-red-500"
                : event.priority === "High"
                ? "bg-orange-500"
                : event.priority === "Normal"
                ? "bg-blue-500"
                : "bg-gray-400"
            }`}
          >
            {event.priority}
          </span>
        )}
      </div>
      {event.label && (
        <span className="italic opacity-90">{event.label}</span>
      )}
      {event.description && (
        <p className="text-[11px] opacity-90 mt-0.5 truncate">
          {event.description}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* === Header === */}
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
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700"
          >
            <Plus size={18} /> Create Task
          </button>
        </div>
      </div>

      {/* === Calendar === */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          views={["month", "week", "day", "agenda"]}
          defaultView="week"
          popup
          selectable
          resizable
          onSelectEvent={handleSelectEvent}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventCard,
          }}
        />
      </div>

      {/* === Add/Edit Modal === */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Task" : "Create New Task"}
            </Dialog.Title>

            {/* === Title === */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Task Title</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter task title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* === Description === */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Write Description
              </label>
              <textarea
                className="w-full border rounded-lg px-3 py-2"
                rows="3"
                placeholder="Write short task description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* === Label & Priority === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Add Label</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                >
                  <option value="">Select Label</option>
                  <option>Meeting</option>
                  <option>Design</option>
                  <option>Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Set Priority</label>
                <div className="flex gap-2 flex-wrap">
                  {["Urgent", "High", "Normal", "Low"].map((priority) => (
                    <button
                      key={priority}
                      onClick={() =>
                        setFormData({ ...formData, priority })
                      }
                      className={`px-3 py-1 rounded-lg border text-sm ${
                        formData.priority === priority
                          ? "bg-red-600 text-white border-red-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* === Color Picker === */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Choose Event Color
              </label>
              <div className="flex gap-2">
                {["#7C3AED", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#F97316"].map(
                  (color) => (
                    <div
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${
                        formData.color === color
                          ? "border-4 border-gray-800"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
            </div>

            {/* === Start/End === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Start</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.start}
                  onChange={(e) =>
                    setFormData({ ...formData, start: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.end}
                  onChange={(e) =>
                    setFormData({ ...formData, end: e.target.value })
                  }
                />
              </div>
            </div>

            {/* === Buttons === */}
            <div className="flex justify-end gap-3">
              {isEditing && (
                <button
                  onClick={() => handleDelete(selectedEvent)}
                  className="bg-gray-200 text-red-600 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>

      {/* === View Event Modal === */}
      <Dialog open={isViewOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-semibold">
                  {selectedEvent.title}
                </Dialog.Title>
                <button onClick={closeModal}>
                  <XCircle size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Label:</strong> {selectedEvent.label || "N/A"}
                </p>
                <p>
                  <strong>Priority:</strong> {selectedEvent.priority || "Normal"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedEvent.description || "No description provided."}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {selectedEvent.start.toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {selectedEvent.end.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedEvent)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </Dialog.Panel>
          </motion.div>
        )}
      </Dialog>
    </div>
  );
};

export default CalendarPage;
