"use client";

import React, { useEffect, useState } from "react";

export interface IMessage {
  _id: string;
  createdAt: string;
}

export function DashboardTab() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/admin/messages");
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages for dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Process data
  const queryCountsByDate = messages.reduce((acc, msg) => {
    const date = new Date(msg.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Generate and sort existing dates
  const sortedDates = Object.keys(queryCountsByDate).sort();
  const maxQueries = Math.max(...Object.values(queryCountsByDate), 1);

  // Queries on selected date
  const selectedDateCount = selectedDate ? queryCountsByDate[selectedDate] || 0 : 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-transparent">
        <div className="text-lg font-medium text-gray-500 animate-pulse">Decrypting Analytics...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Total Metric Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center transition-all hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#FDFBF7] border border-[#C7A074]/30 rounded-xl flex items-center justify-center text-[#C7A074] shadow-inner">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Active Queries</h3>
              <p className="text-3xl font-serif font-bold text-gray-900">{messages.length}</p>
            </div>
          </div>
        </div>

        {/* Selected Date Metric Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden transition-all hover:shadow-md">
           <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
           </div>
           
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 z-10 flex items-center gap-2">
             <svg className="w-4 h-4 text-[#C7A074]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             Query Lookup by Date
           </h3>
           <div className="flex items-center gap-4 z-10 w-full sm:w-auto">
             <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#FDFBF7] border border-[#C7A074]/30 text-[#8B6E4E] font-semibold px-4 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C7A074]/50 cursor-pointer"
             />
             {selectedDate && (
               <div className="flex-1 flex items-center justify-between bg-[#FDFBF7] px-4 py-2.5 rounded-xl border border-[#C7A074]/30">
                 <span className="text-sm font-bold text-[#C7A074]">Queries Found:</span>
                 <span className="text-xl font-bold text-[#8B6E4E]">{selectedDateCount}</span>
               </div>
             )}
           </div>
           {selectedDate && selectedDateCount === 0 && (
             <p className="text-[11px] uppercase tracking-wider text-red-500 mt-2.5 font-bold z-10">No queries registered for this specific date.</p>
           )}
        </div>

      </div>

      {/* Analytics Graph */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
           <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
        </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
           <div>
             <h2 className="text-2xl font-serif text-gray-900 font-bold tracking-tight">Query Volume Graph</h2>
             <p className="text-sm text-gray-400 font-medium mt-1">Select any bar to check the specific amount of inquiries for that date.</p>
           </div>
           
           {selectedDate && (
               <button 
                 onClick={() => setSelectedDate("")} 
                 className="text-xs text-red-500 hover:text-white bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 px-5 py-2.5 rounded-xl font-bold tracking-wider uppercase transition-all shadow-sm"
               >
                 Clear Selection
               </button>
            )}
        </div>

        {sortedDates.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#FAF9F6] rounded-2xl border-2 border-dashed border-[#E8DCCB] relative z-10">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-gray-300">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <p className="font-bold text-[#8B6E4E] tracking-wide">No data available to construct graph.</p>
          </div>
        ) : (
          <div className="relative h-[380px] w-full pt-12 pb-8 relative z-10">
            {/* Y Axis Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between hidden sm:flex pb-14 pt-16">
               {[...Array(5)].map((_, i) => {
                 const guidelineValue = Math.round(maxQueries - (maxQueries / 4) * i);
                 // Skip negative or duplicated zeroes due to rounding
                 if (guidelineValue < 0) return null;
                 return (
                  <div key={i} className="flex w-full items-center">
                    <span className="w-8 text-right text-xs font-bold text-gray-300 mr-4">
                      {guidelineValue}
                    </span>
                    <div className="flex-1 border-t border-dashed border-gray-100"></div>
                  </div>
                 );
               })}
            </div>

            {/* Bars container */}
            <div className="absolute inset-0 px-6 sm:pl-16 sm:pr-10 flex items-end gap-3 lg:gap-5 overflow-x-auto custom-scrollbar pb-6 pt-20">
              {sortedDates.map((date) => {
                const count = queryCountsByDate[date];
                const heightPercent = maxQueries > 0 ? (count / maxQueries) * 100 : 0;
                const isSelected = selectedDate === date;
                
                return (
                  <div 
                    key={date}
                    className="relative flex flex-col items-center justify-end h-full min-w-[45px] lg:min-w-[55px] group cursor-pointer"
                    onClick={() => setSelectedDate(date)}
                    title={`Queries on ${date}: ${count}`}
                  >
                    {/* Tooltip */}
                    <div className={`transition-all duration-300 absolute -top-12 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg pointer-events-none z-20 shadow-xl flex items-center justify-center gap-1.5 whitespace-nowrap ${isSelected ? 'opacity-100 -translate-y-2' : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'}`}>
                       <span className="text-[#C7A074]">{count}</span> queries
                    </div>
                    
                    {/* Bar */}
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 ease-out relative z-10 ${
                        isSelected 
                          ? 'bg-gradient-to-t from-[#C7A074] to-[#8B6E4E] shadow-[0_0_20px_rgba(199,160,116,0.4)]' 
                          : 'bg-gradient-to-t from-[#f4eee6] to-[#FAF9F6] group-hover:from-[#dcd0bf] group-hover:to-[#ebdcd1] border border-b-0 border-[#E8DCCB]'
                      }`}
                      style={{ height: `${heightPercent}%`, minHeight: '12px' }}
                    ></div>
                    
                    {/* Date Label */}
                    <div className="absolute -bottom-7 w-full flex justify-center">
                       <span className={`text-[11px] font-extrabold whitespace-nowrap transform transition-colors ${isSelected ? 'text-[#8B6E4E]' : 'text-gray-400 group-hover:text-[#C7A074]'}`}>
                         {new Date(date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                       </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
