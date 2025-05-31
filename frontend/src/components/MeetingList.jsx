import React, { useEffect, useState } from 'react';
import API from '../api';
import MeetingForm from './MeetingForm';

const STATUS_STYLES = {
  upcoming: 'bg-green-100 text-green-800',
  in_review: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  overdue: 'bg-red-200 text-red-900',
  published: 'bg-blue-100 text-blue-800',
};

export default function MeetingList() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editableMeeting, setEditableMeeting] = useState(null);

  const fetchMeetings = () => {
    API.get('meetings/')
      .then((res) => {
        setMeetings(res.data);
      })
      .catch((err) => {
        console.error('Error fetching meetings', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleAddNew = () => {
    setEditableMeeting(null);
    setShowForm(true);
  };

  const handleEdit = (meeting) => {
    setEditableMeeting(meeting);
    setShowForm(true);
  };

  const handleDelete = (meetingId) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      API.delete(`meetings/${meetingId}/`)
        .then(() => fetchMeetings())
        .catch((err) => console.error('Delete error', err));
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditableMeeting(null);
    fetchMeetings();
  };

  if (loading) {
    return <p>Loading meetings...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meetings</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={handleAddNew}
        >
          + Add New
        </button>
      </div>

      {/* Render form above list if showForm is true */}
      {showForm && (
        <MeetingForm
          existingMeeting={editableMeeting}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditableMeeting(null);
          }}
        />
      )}

      {/* Meetings Table/List */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Agenda</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Meeting URL</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {meetings.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3 text-sm">{m.agenda}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      STATUS_STYLES[m.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {m.status.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{m.date_of_meeting}</td>
                <td className="px-4 py-3 text-sm">{m.start_time}</td>
                <td className="px-4 py-3 text-sm">
                  <a
                    href={m.meeting_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </a>
                </td>
                <td className="px-4 py-3 text-right text-sm space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={() => handleEdit(m)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {meetings.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  No meetings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}