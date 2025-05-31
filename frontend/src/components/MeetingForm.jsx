import React, { useState, useEffect } from 'react';
import API from '../api';

const STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'in_review', label: 'In Review' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'published', label: 'Published' },
];

export default function MeetingForm({ existingMeeting, onSuccess, onCancel }) {
  const isEdit = Boolean(existingMeeting);

  const [agenda, setAgenda] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [dateOfMeeting, setDateOfMeeting] = useState('');
  const [startTime, setStartTime] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setAgenda(existingMeeting.agenda);
      setStatus(existingMeeting.status);
      setDateOfMeeting(existingMeeting.date_of_meeting);
      setStartTime(existingMeeting.start_time);
      setMeetingUrl(existingMeeting.meeting_url);
    }
  }, [existingMeeting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      agenda,
      status,
      date_of_meeting: dateOfMeeting,
      start_time: startTime,
      meeting_url: meetingUrl,
    };

    if (isEdit) {
      API.put(`meetings/${existingMeeting.id}/`, payload)
        .then(() => onSuccess())
        .catch((err) => setError('Failed to update meeting.'));
    } else {
      API.post('meetings/', payload)
        .then(() => onSuccess())
        .catch((err) => setError('Failed to create meeting.'));
    }
  };

  return (
    <div className="bg-white p-6 mb-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">
        {isEdit ? 'Edit Meeting' : 'Add New Meeting'}
      </h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Agenda */}
        <div>
          <label className="block text-gray-700">Agenda</label>
          <input
            type="text"
            className="mt-1 w-full px-3 py-2 border rounded"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            className="mt-1 w-full px-3 py-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Meeting */}
        <div>
          <label className="block text-gray-700">Date of Meeting</label>
          <input
            type="date"
            className="mt-1 w-full px-3 py-2 border rounded"
            value={dateOfMeeting}
            onChange={(e) => setDateOfMeeting(e.target.value)}
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            className="mt-1 w-full px-3 py-2 border rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        {/* Meeting URL */}
        <div>
          <label className="block text-gray-700">Meeting URL</label>
          <input
            type="url"
            className="mt-1 w-full px-3 py-2 border rounded"
            value={meetingUrl}
            onChange={(e) => setMeetingUrl(e.target.value)}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}