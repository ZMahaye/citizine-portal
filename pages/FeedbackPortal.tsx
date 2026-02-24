import React, { useState } from 'react';
import { MOCK_FEEDBACK_TICKETS } from '../constants';

interface FeedbackPortalProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const FeedbackPortal: React.FC<FeedbackPortalProps> = ({ t, highContrast }) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'track' | 'survey'>('submit');
  const [feedbackType, setFeedbackType] = useState<'complaint' | 'compliment' | 'suggestion' | 'inquiry'>('complaint');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [searchReference, setSearchReference] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [ratings, setRatings] = useState({ overall: 0, staff: 0, resolution: 0, digital: 0, nps: 5 });

  const fb = t.feedback;

  const feedbackTypes = [
    { id: 'complaint', label: fb.type_complaint, icon: 'fa-circle-exclamation', color: 'red' },
    { id: 'compliment', label: fb.type_compliment, icon: 'fa-heart', color: 'pink' },
    { id: 'suggestion', label: fb.type_suggestion, icon: 'fa-lightbulb', color: 'yellow' },
    { id: 'inquiry', label: fb.type_inquiry, icon: 'fa-circle-question', color: 'blue' },
  ];

  const departments = [
    fb.dept_licensing,
    fb.dept_transport,
    fb.dept_roads,
    fb.dept_traffic,
    fb.dept_general,
  ];

  const handleSubmitFeedback = () => {
    const refNumber = `KZN-FB-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    alert(`${fb.reference_generated}: ${refNumber}`);
    setSubject('');
    setDescription('');
  };

  const handleSearch = () => {
    const result = MOCK_FEEDBACK_TICKETS.find((t) => t.reference === searchReference);
    setSearchResult(result || null);
  };

  const handleSubmitSurvey = () => {
    alert('Thank you for your feedback!');
    setRatings({ overall: 0, staff: 0, resolution: 0, digital: 0, nps: 5 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'acknowledged': return 'bg-purple-100 text-purple-700';
      case 'in_progress': return 'bg-amber-100 text-amber-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted': return fb.status_submitted;
      case 'acknowledged': return fb.status_acknowledged;
      case 'in_progress': return fb.status_in_progress;
      case 'resolved': return fb.status_resolved;
      default: return status;
    }
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${
            star <= value ? 'text-yellow-400' : 'text-slate-300'
          } hover:text-yellow-400`}
        >
          <i className={`fa-${star <= value ? 'solid' : 'regular'} fa-star`}></i>
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
          {fb.title}
        </h1>
        <p className="text-slate-500 leading-relaxed">{fb.subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className={`flex gap-2 border-b ${highContrast ? 'border-zinc-700' : 'border-slate-200'}`}>
        {[
          { id: 'submit', label: fb.tab_submit, icon: 'fa-paper-plane' },
          { id: 'track', label: fb.tab_track, icon: 'fa-magnifying-glass' },
          { id: 'survey', label: fb.tab_survey, icon: 'fa-star' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === tab.id
                ? (highContrast ? 'border-yellow-400 text-yellow-400' : 'border-green-700 text-green-700')
                : (highContrast ? 'border-transparent text-zinc-500 hover:text-white' : 'border-transparent text-slate-500 hover:text-slate-700')
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in">
        {/* Tab 1: Submit Feedback */}
        {activeTab === 'submit' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Feedback Type Selector */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                Select Feedback Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFeedbackType(type.id as any)}
                    className={`p-6 rounded-3xl border-2 text-center transition-all ${
                      feedbackType === type.id
                        ? (highContrast ? 'border-yellow-400 bg-zinc-900' : 'border-green-700 bg-green-50')
                        : (highContrast ? 'border-zinc-700 bg-zinc-900 hover:border-zinc-600' : 'border-slate-100 bg-white hover:border-slate-200')
                    }`}
                  >
                    <i
                      className={`fa-solid ${type.icon} text-3xl mb-3 block ${
                        type.color === 'red'
                          ? 'text-red-500'
                          : type.color === 'pink'
                            ? 'text-pink-500'
                            : type.color === 'yellow'
                              ? 'text-yellow-500'
                              : 'text-blue-500'
                      }`}
                    ></i>
                    <span className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className={`p-8 rounded-3xl border ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'
            }`}>
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.department}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                      highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="">Select Department...</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.subject}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your feedback..."
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                      highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.description}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                    rows={6}
                    placeholder="Provide detailed information..."
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none resize-none ${
                      highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  ></textarea>
                  <div className="text-right text-xs text-slate-400 mt-1">
                    {description.length}/500 {fb.chars_remaining}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.attachment}
                  </label>
                  <div
                    className={`p-6 rounded-2xl border-2 border-dashed text-center transition-colors ${
                      highContrast ? 'border-zinc-700 hover:border-yellow-400 bg-zinc-800' : 'border-slate-200 hover:border-green-300 bg-slate-50'
                    }`}
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-300 mb-2"></i>
                    <p className="text-sm text-slate-500">
                      Click to upload or drag and drop (PDF, JPG, PNG - Max 10MB)
                    </p>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.priority}
                  </label>
                  <div className="flex gap-3">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                          priority === p
                            ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white')
                            : (highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                        }`}
                      >
                        {p === 'low' ? fb.priority_low : p === 'medium' ? fb.priority_medium : fb.priority_high}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmitFeedback}
                  disabled={!department || !subject || !description}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    department && subject && description
                      ? (highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg')
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                  {fb.submit}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Track Feedback */}
        {activeTab === 'track' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className={`p-8 rounded-3xl border ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                {fb.track_title}
              </h3>

              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  value={searchReference}
                  onChange={(e) => setSearchReference(e.target.value)}
                  placeholder={fb.enter_reference}
                  className={`flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                    highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
                <button
                  onClick={handleSearch}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800'
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass mr-2"></i>
                  {fb.search}
                </button>
              </div>

              {/* Search Result or Recent Tickets */}
              {searchResult ? (
                <div className={`p-6 rounded-2xl space-y-6 ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`text-lg font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {searchResult.subject}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {searchResult.reference} • {searchResult.department}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(searchResult.status)}`}>
                      {getStatusLabel(searchResult.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Type:</span>
                      <span className={`ml-2 font-medium capitalize ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {searchResult.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Priority:</span>
                      <span className={`ml-2 font-medium capitalize ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {searchResult.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Submitted:</span>
                      <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {searchResult.dateSubmitted}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Last Updated:</span>
                      <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {searchResult.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-bold mb-3 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      {fb.responses}
                    </h5>
                    <div className="space-y-3">
                      {searchResult.responses.map((response: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl ${highContrast ? 'bg-zinc-900' : 'bg-white'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-bold text-sm ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                              {response.from}
                            </span>
                            <span className="text-xs text-slate-500">{response.date}</span>
                          </div>
                          <p className="text-sm text-slate-600">{response.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                    Recent Feedback
                  </h4>
                  <div className="space-y-4">
                    {MOCK_FEEDBACK_TICKETS.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                          highContrast ? 'bg-zinc-800 border-zinc-700 hover:border-yellow-400' : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:shadow-md'
                        }`}
                        onClick={() => {
                          setSearchReference(ticket.reference);
                          setSearchResult(ticket);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className={`font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                              {ticket.subject}
                            </h5>
                            <p className="text-sm text-slate-500 mb-2">{ticket.reference}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span>
                                <i className="fa-solid fa-building mr-1"></i>
                                {ticket.department}
                              </span>
                              <span>
                                <i className="fa-solid fa-calendar mr-1"></i>
                                {ticket.dateSubmitted}
                              </span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                            {getStatusLabel(ticket.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Satisfaction Survey */}
        {activeTab === 'survey' && (
          <div className="max-w-3xl mx-auto">
            <div className={`p-8 rounded-3xl border ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'
            }`}>
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {fb.survey_title}
                </h3>
                <p className="text-slate-500">{fb.survey_desc}</p>
              </div>

              <div className="space-y-8">
                {/* Rating Questions */}
                {[
                  { key: 'overall', label: fb.overall },
                  { key: 'staff', label: fb.staff },
                  { key: 'resolution', label: fb.resolution },
                  { key: 'digital', label: fb.digital },
                ].map((item) => (
                  <div key={item.key} className={`p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                    <label className={`block font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      {item.label}
                    </label>
                    <StarRating
                      value={ratings[item.key as keyof typeof ratings] as number}
                      onChange={(v) => setRatings({ ...ratings, [item.key]: v })}
                    />
                  </div>
                ))}

                {/* NPS Question */}
                <div className={`p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                  <label className={`block font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                    {fb.nps}
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRatings({ ...ratings, nps: n })}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                          ratings.nps === n
                            ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white')
                            : (highContrast ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-slate-600 hover:bg-slate-100')
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{fb.not_likely}</span>
                    <span>{fb.very_likely}</span>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {fb.comments}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share any additional thoughts..."
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none resize-none ${
                      highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmitSurvey}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg'
                  }`}
                >
                  <i className="fa-solid fa-check mr-2"></i>
                  {fb.submit_survey}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPortal;
