"use client";

import React, { useEffect, useState } from "react";

export interface IMessage {
  _id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  message: string;
  source: string;
  createdAt: string;
  location?: string;
}

export function QueriesTab() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to fetch messages database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (!selectedDate) return true;
    const msgDate = new Date(msg.createdAt).toISOString().split("T")[0];
    return msgDate === selectedDate;
  });

  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE) || 1;
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredMessages.length, currentPage, totalPages]);

  if (loading && messages.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-transparent">
        <div className="text-lg font-medium text-gray-500 animate-pulse">Decrypting Portal...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row shadow-sm border border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto bg-gray-50">
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-b sm:border-b-0 sm:border-r border-gray-200 w-full sm:w-auto">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-sm font-semibold text-gray-800 focus:outline-none w-full cursor-pointer"
            />
          </div>
          {selectedDate && (
            <button
              onClick={() => {
                setSelectedDate("");
                setCurrentPage(1);
              }}
              className="px-4 py-3 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 bg-white font-bold tracking-wider uppercase transition-colors sm:w-auto w-full"
            >
              Reset Filter
            </button>
          )}
        </div>

        <p className="mt-1 md:mt-2 text-xl text-gray-600">
          Total System Inquiries: <span className="font-bold text-[#C7A074]">{messages.length}</span>
        </p>

        <button
          onClick={fetchMessages}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FDFBF7] text-[#C7A074] border border-[#C7A074]/30 hover:bg-[#C7A074] hover:text-white transition-colors px-6 py-3.5 rounded-xl font-bold text-sm shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh Database
        </button>
      </div>

      <div className="overflow-hidden bg-white shadow-xl border border-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#FAF9F6] text-xs uppercase text-gray-500 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 md:px-8 py-5 md:py-6 font-extrabold tracking-widest">Date / Time</th>
                <th scope="col" className="px-5 md:px-6 py-5 md:py-6 font-extrabold tracking-widest">Client Name</th>
                <th scope="col" className="px-5 md:px-6 py-5 md:py-6 font-extrabold tracking-widest">Contact Identity</th>
                <th scope="col" className="px-6 md:px-8 py-5 md:py-6 font-extrabold tracking-widest min-w-[280px]">Requirement Details</th>
                <th scope="col" className="px-5 md:px-6 py-5 md:py-6 font-extrabold tracking-widest">Location</th>
                <th scope="col" className="px-5 md:px-6 py-5 md:py-6 font-extrabold tracking-widest">Source Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    {selectedDate ? (
                      <div className="text-gray-500 font-medium text-lg">No inquiries found for <span className="font-bold text-black">{selectedDate}</span>.</div>
                    ) : (
                      <div className="text-gray-500 font-medium text-lg">Your database is completely empty.</div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedMessages.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => setSelectedMessage(item)}
                    className="bg-white hover:bg-[#FDFCFB] transition-colors group cursor-pointer hover:shadow-sm relative z-10"
                  >
                    <td className="whitespace-nowrap px-6 md:px-8 py-6 md:py-7">
                      <div className="font-bold text-gray-900">
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="text-xs font-semibold tracking-wider text-gray-400 mt-1">
                        {new Date(item.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7 min-w-[140px]">
                      <div className="font-bold text-gray-900 text-[15px]">
                        {item.firstName} {item.lastName || ""}
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7 min-w-[200px]">
                      <div className="font-bold tracking-wide text-[#8B6E4E] border border-[#E8DCCB] bg-[#FCF8F2] rounded-md px-3.5 py-1.5 inline-block mb-2 shadow-sm transition-colors group-hover:bg-[#f6ebd9]">
                        {item.phone}
                      </div>
                      {item.email && (
                        <div className="text-sm font-medium text-gray-500 block truncate">
                          <a href={`mailto:${item.email}`} className="hover:text-black transition-colors">{item.email}</a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 md:px-8 py-6 md:py-7 text-gray-700 leading-relaxed max-w-xl font-medium">
                      {item.message}
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7">
                      {item.location && item.location !== "Unknown" && item.location !== "Location not provided" ? (
                        <div className="flex items-start gap-1.5 text-xs font-semibold tracking-wide text-gray-500 max-w-[200px]">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span className="line-clamp-3" title={item.location}>{item.location}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No Location</span>
                      )}
                    </td>
                    <td className="px-5 md:px-6 py-6 md:py-7">
                      <span className="rounded-full bg-gray-50 border border-gray-200 px-3.5 py-2 text-xs font-bold tracking-wide text-gray-600 shadow-sm whitespace-nowrap inline-block">
                        {item.source}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredMessages.length > 0 && (
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-gray-500">
              Displaying <span className="font-bold text-gray-900">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredMessages.length)}</span> of <span className="font-bold text-gray-900">{filteredMessages.length}</span> queries
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none px-5 py-2.5 border-2 border-gray-100 rounded-lg text-sm font-bold tracking-wide text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex-1 sm:flex-none px-5 py-2.5 border-2 border-[#C7A074] rounded-lg text-sm font-bold tracking-wide text-[#C7A074] bg-[#FDFBF7] hover:bg-[#C7A074] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 disabled:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0 z-0" onClick={() => setSelectedMessage(null)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 sm:px-8 py-5 sm:py-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Query Details</h3>
                <p className="text-xs text-gray-400 mt-1 font-semibold tracking-wider uppercase">Marbliza Data System</p>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-inner">
                 <div>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     Submitted On
                   </p>
                   <p className="font-semibold text-gray-900 sm:text-lg">{new Date(selectedMessage.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short'})}</p>
                 </div>
                 <div>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-left sm:text-right">Source Tag</p>
                   <span className="rounded-full bg-white border border-[#C7A074]/30 px-4 py-1.5 text-xs font-bold tracking-wide text-[#C7A074] shadow-sm inline-block">
                     {selectedMessage.source}
                   </span>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                 <div>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Client Name</p>
                   <p className="font-bold text-gray-900 text-lg sm:text-xl capitalize">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                 </div>
                 <div>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contact Number</p>
                   <div className="font-bold tracking-wide text-gray-900 bg-white shadow-sm rounded-lg px-4 py-2.5 border border-gray-200 inline-block text-lg">
                     {selectedMessage.phone}
                   </div>
                 </div>
                 {selectedMessage.email && (
                   <div className="sm:col-span-2">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</p>
                     <div className="flex items-center gap-2">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                       <a href={`mailto:${selectedMessage.email}`} className="font-bold text-[#8B6E4E] hover:text-black transition-colors text-lg">{selectedMessage.email}</a>
                     </div>
                   </div>
                 )}
                 {selectedMessage.location && selectedMessage.location !== 'Unknown' && selectedMessage.location !== 'Location not provided' && (
                   <div className="sm:col-span-2">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Physical Location</p>
                     <div className="flex items-start gap-3 text-gray-800 bg-red-50/40 rounded-xl p-4 sm:p-5 border border-red-100 shadow-sm">
                        <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span className="font-semibold text-[15px] leading-relaxed">{selectedMessage.location}</span>
                     </div>
                   </div>
                 )}
              </div>

              <div className="mt-2 text-left">
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Requirement Details</p>
                 <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-sm">
                    <p className="text-gray-800 leading-relaxed font-semibold text-[15px] sm:text-[16px] whitespace-pre-wrap">{selectedMessage.message}</p>
                 </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-6 flex justify-end bg-gray-50 rounded-b-3xl">
              <button onClick={() => setSelectedMessage(null)} className="px-8 py-3 rounded-xl bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-white font-bold tracking-widest uppercase text-xs shadow-xl hover:shadow-2xl transition-all">
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
