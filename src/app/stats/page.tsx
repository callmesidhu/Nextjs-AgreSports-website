"use client"
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Shield, Skull, Target, TrendingUp, Users, Award, Clock } from 'lucide-react';

export default function ValorantDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock player data
  const playerData = {
    name: "Phoenix",
    tag: "#FIRE",
    rank: "Immortal 3",
    elo: 1850,
    winRate: 67,
    kda: "1.8",
    matches: 128,
    mainAgent: "Jett",
    playtime: "245h"
  };
  
  // Mock match history data
  const matchHistory = [
    { id: 1, map: "Ascent", result: "Win", kda: "17/4/9", agent: "Jett", score: "13-7", rating: 289 },
    { id: 2, map: "Haven", result: "Win", kda: "21/10/3", agent: "Reyna", score: "13-11", rating: 315 },
    { id: 3, map: "Bind", result: "Loss", kda: "9/13/5", agent: "Jett", score: "7-13", rating: 178 },
    { id: 4, map: "Split", result: "Win", kda: "14/8/10", agent: "Chamber", score: "13-5", rating: 267 },
    { id: 5, map: "Icebox", result: "Loss", kda: "11/14/2", agent: "Jett", score: "10-13", rating: 210 }
  ];
  
  // Mock performance data for graphs
  const kdrData = [
    { name: 'Jan', kdr: 1.5 },
    { name: 'Feb', kdr: 1.6 },
    { name: 'Mar', kdr: 1.4 },
    { name: 'Apr', kdr: 1.8 },
    { name: 'May', kdr: 2.0 },
    { name: 'Jun', kdr: 1.7 },
  ];
  
  const agentUsageData = [
    { name: 'Jett', value: 45 },
    { name: 'Reyna', value: 25 },
    { name: 'Chamber', value: 15 },
    { name: 'Omen', value: 10 },
    { name: 'Sova', value: 5 },
  ];
  
  const mapPerformanceData = [
    { name: 'Ascent', winRate: 75 },
    { name: 'Bind', winRate: 62 },
    { name: 'Haven', winRate: 80 },
    { name: 'Split', winRate: 58 },
    { name: 'Icebox', winRate: 45 },
    { name: 'Breeze', winRate: 70 },
  ];
  
  const COLORS = ['#6B46C1', '#9F7AEA', '#B794F4', '#D6BCFA', '#E9D8FD'];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-900 to-purple-800 shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2 mr-4">
              <img src="/api/placeholder/120/120" alt="Player avatar" className="w-16 h-16 rounded-full border-2 border-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{playerData.name} <span className="text-gray-300 text-sm">{playerData.tag}</span></h1>
              <div className="flex items-center">
                <span className="bg-gradient-to-r from-violet-600 to-purple-500 px-2 py-1 rounded text-xs font-semibold mr-2">{playerData.rank}</span>
                <span className="text-sm text-gray-300">{playerData.elo} ELO</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <div className="text-center">
              <p className="text-xs text-gray-300">Win Rate</p>
              <p className="text-xl font-bold text-violet-300">{playerData.winRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300">K/D/A</p>
              <p className="text-xl font-bold text-violet-300">{playerData.kda}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300">Matches</p>
              <p className="text-xl font-bold text-violet-300">{playerData.matches}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-black bg-opacity-60 border-b border-violet-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-3 text-sm font-medium relative ${activeTab === 'overview' ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
            >
              Overview
              {activeTab === 'overview' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('matches')}
              className={`py-4 px-3 text-sm font-medium relative ${activeTab === 'matches' ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
            >
              Match History
              {activeTab === 'matches' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('weapons')}
              className={`py-4 px-3 text-sm font-medium relative ${activeTab === 'weapons' ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
            >
              Weapon Stats
              {activeTab === 'weapons' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('agents')}
              className={`py-4 px-3 text-sm font-medium relative ${activeTab === 'agents' ? 'text-violet-400' : 'text-gray-400 hover:text-white'}`}
            >
              Agents
              {activeTab === 'agents' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500"></span>}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Key stats */}
            <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 flex items-center">
                <div className="p-3 rounded-full bg-violet-900 mr-4">
                  <TrendingUp size={20} className="text-violet-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-xl font-bold">{playerData.winRate}%</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 flex items-center">
                <div className="p-3 rounded-full bg-violet-900 mr-4">
                  <Skull size={20} className="text-violet-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">K/D/A</p>
                  <p className="text-xl font-bold">{playerData.kda}</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 flex items-center">
                <div className="p-3 rounded-full bg-violet-900 mr-4">
                  <Shield size={20} className="text-violet-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Main Agent</p>
                  <p className="text-xl font-bold">{playerData.mainAgent}</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 flex items-center">
                <div className="p-3 rounded-full bg-violet-900 mr-4">
                  <Clock size={20} className="text-violet-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Playtime</p>
                  <p className="text-xl font-bold">{playerData.playtime}</p>
                </div>
              </div>
            </div>
            
            {/* K/D/R Trend */}
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 col-span-3 md:col-span-2">
              <h3 className="text-lg font-medium mb-4">K/D/R Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kdrData}>
                    <XAxis dataKey="name" stroke="#A78BFA" />
                    <YAxis stroke="#A78BFA" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                      itemStyle={{ color: '#E9D8FD' }}
                    />
                    <Line type="monotone" dataKey="kdr" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#6B46C1' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Agent Usage */}
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
              <h3 className="text-lg font-medium mb-4">Agent Usage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={agentUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {agentUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                      itemStyle={{ color: '#E9D8FD' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Map Performance */}
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800 col-span-3">
              <h3 className="text-lg font-medium mb-4">Map Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mapPerformanceData}>
                    <XAxis dataKey="name" stroke="#A78BFA" />
                    <YAxis stroke="#A78BFA" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                      itemStyle={{ color: '#E9D8FD' }}
                    />
                    <Bar dataKey="winRate" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                      {mapPerformanceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.winRate > 65 ? '#8B5CF6' : entry.winRate > 50 ? '#A78BFA' : '#C4B5FD'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'matches' && (
          <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
            <h3 className="text-lg font-medium mb-4">Recent Matches</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-900 text-violet-300">
                    <th className="px-4 py-2 text-left">Map</th>
                    <th className="px-4 py-2 text-left">Result</th>
                    <th className="px-4 py-2 text-left">K/D/A</th>
                    <th className="px-4 py-2 text-left">Agent</th>
                    <th className="px-4 py-2 text-left">Score</th>
                    <th className="px-4 py-2 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {matchHistory.map((match) => (
                    <tr key={match.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3">{match.map}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${match.result === 'Win' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                          {match.result}
                        </span>
                      </td>
                      <td className="px-4 py-3">{match.kda}</td>
                      <td className="px-4 py-3">{match.agent}</td>
                      <td className="px-4 py-3">{match.score}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${match.rating > 250 ? 'text-violet-400' : match.rating > 200 ? 'text-blue-400' : 'text-gray-400'}`}>
                          {match.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'weapons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
              <h3 className="text-lg font-medium mb-4">Weapon Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Vandal', kills: 450, headshots: 230 },
                      { name: 'Phantom', kills: 320, headshots: 175 },
                      { name: 'Operator', kills: 120, headshots: 80 },
                      { name: 'Sheriff', kills: 95, headshots: 60 },
                      { name: 'Spectre', kills: 85, headshots: 40 },
                    ]}
                  >
                    <XAxis dataKey="name" stroke="#A78BFA" />
                    <YAxis stroke="#A78BFA" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                      itemStyle={{ color: '#E9D8FD' }} 
                    />
                    <Legend wrapperStyle={{ color: '#E9D8FD' }} />
                    <Bar dataKey="kills" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Kills" />
                    <Bar dataKey="headshots" fill="#C4B5FD" radius={[4, 4, 0, 0]} name="Headshots" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
              <h3 className="text-lg font-medium mb-4">Accuracy Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Headshot %</p>
                    <p className="font-bold text-violet-300">42%</p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-600 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Body %</p>
                    <p className="font-bold text-violet-300">48%</p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-600 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Leg %</p>
                    <p className="font-bold text-violet-300">10%</p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-600 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-gray-400">First Shot Accuracy</p>
                    <p className="font-bold text-violet-300">78%</p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-600 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-sm text-gray-300 mb-3">Top Weapon Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center mr-3">
                        <Target size={18} className="text-violet-300" />
                      </div>
                      <div>
                        <p className="font-medium">Vandal</p>
                        <p className="text-xs text-gray-400">450 Kills</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-violet-300">51%</p>
                      <p className="text-xs text-gray-400">Headshot Rate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center mr-3">
                        <Target size={18} className="text-violet-300" />
                      </div>
                      <div>
                        <p className="font-medium">Phantom</p>
                        <p className="text-xs text-gray-400">320 Kills</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-violet-300">54%</p>
                      <p className="text-xs text-gray-400">Headshot Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
              <h3 className="text-lg font-medium mb-4">Agent Performance</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-violet-900 rounded-full flex items-center justify-center mr-3">
                      <Users size={24} className="text-violet-300" />
                    </div>
                    <div>
                      <h4 className="font-bold">Jett</h4>
                      <p className="text-xs text-gray-300">58 Matches</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-violet-300">75%</p>
                      <p className="text-xs text-gray-300">Win Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">K/D</p>
                      <p className="font-medium">1.85</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">ACS</p>
                      <p className="font-medium">245</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">HS%</p>
                      <p className="font-medium">52%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-violet-900 rounded-full flex items-center justify-center mr-3">
                      <Users size={24} className="text-violet-300" />
                    </div>
                    <div>
                      <h4 className="font-bold">Reyna</h4>
                      <p className="text-xs text-gray-300">32 Matches</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-violet-300">68%</p>
                      <p className="text-xs text-gray-300">Win Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">K/D</p>
                      <p className="font-medium">2.10</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">ACS</p>
                      <p className="font-medium">278</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">HS%</p>
                      <p className="font-medium">48%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-violet-900 rounded-full flex items-center justify-center mr-3">
                      <Users size={24} className="text-violet-300" />
                    </div>
                    <div>
                      <h4 className="font-bold">Chamber</h4>
                      <p className="text-xs text-gray-300">19 Matches</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-violet-300">63%</p>
                      <p className="text-xs text-gray-300">Win Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">K/D</p>
                      <p className="font-medium">1.67</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">ACS</p>
                      <p className="font-medium">235</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-xs text-gray-400">HS%</p>
                      <p className="font-medium">45%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-violet-800">
              <h3 className="text-lg font-medium mb-4">Agent Abilities Usage</h3>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Jett', ult: 85, ability1: 92, ability2: 75 },
                      { name: 'Reyna', ult: 78, ability1: 95, ability2: 68 },
                      { name: 'Chamber', ult: 90, ability1: 84, ability2: 70 },
                    ]}
                    layout="vertical"
                  >
                    <XAxis type="number" stroke="#A78BFA" />
                    <YAxis dataKey="name" type="category" stroke="#A78BFA" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                      itemStyle={{ color: '#E9D8FD' }} 
                    />
                    <Legend wrapperStyle={{ color: '#E9D8FD' }} />
                    <Bar dataKey="ult" fill="#8B5CF6" name="Ultimate Efficiency" />
                    <Bar dataKey="ability1" fill="#A78BFA" name="Primary Ability" />
                    <Bar dataKey="ability2" fill="#C4B5FD" name="Secondary Ability" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Agent Role Breakdown</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                                              data={[
                                                  { name: 'Duelist', value: 70 },
                                                  { name: 'Sentinel', value: 15 },
                                                  { name: 'Controller', value: 10 },
                                                  { name: 'Initiator', value: 5 },
                                              ]}
                                              cx="50%"
                                              cy="50%"
                                              outerRadius={80}
                                              fill="#8884d8"
                                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} dataKey={''}                      >
                        {agentUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#6B46C1' }}
                        itemStyle={{ color: '#E9D8FD' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }