import { useState, useEffect } from "react";
import { BookOpen, Star, Award, BarChart3, User, CheckCircle, BookMarked, Brain, LineChart, Settings as SettingsIcon, LogOut } from "lucide-react";

// Main App Component
export default function PersonalizedPathways() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Simulate login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setPassword("");
    setActiveTab("dashboard");
  };

  // Replace static data with state
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", progress: 68, level: 4, streak: 7 },
    { id: 2, name: "Science", progress: 42, level: 3, streak: 3 },
    { id: 3, name: "Language Arts", progress: 85, level: 5, streak: 12 },
    { id: 4, name: "History", progress: 29, level: 2, streak: 1 },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, title: "Algebra Quiz", score: "90%", date: "Today" },
    { id: 2, title: "Science Experiment", score: "85%", date: "Yesterday" },
    { id: 3, title: "Reading Comprehension", score: "95%", date: "3 days ago" },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Math Master", description: "Complete 10 math modules", completed: true },
    { id: 2, title: "Science Explorer", description: "Finish 5 science experiments", completed: true },
    { id: 3, title: "Reading Champion", description: "Read 20 articles", completed: false },
    { id: 4, title: "History Buff", description: "Complete all history modules", completed: false },
  ]);

  const [suggestedContent, setSuggestedContent] = useState([
    { id: 1, title: "Advanced Algebra", difficulty: "Challenging", match: "98%" },
    { id: 2, title: "Scientific Method Deep Dive", difficulty: "Intermediate", match: "92%" },
    { id: 3, title: "Essay Writing Techniques", difficulty: "Intermediate", match: "87%" },
  ]);

  const [recommendations, setRecommendations] = useState([
    { id: 1, type: "content", title: "Quadratic Equations", reason: "Based on your progress in Algebra" },
    { id: 2, type: "strategy", title: "Try visual learning for Science concepts", reason: "Your response patterns indicate visual learning preference" },
    { id: 3, type: "schedule", title: "Short daily practice sessions", reason: "You perform better with spaced repetition" },
  ]);

  const [mathContent, setMathContent] = useState({
    title: "Mathematics",
    currentModule: "Algebra Fundamentals",
    units: [
      { 
        id: 1, 
        title: "Variables and Expressions", 
        status: "completed", 
        mastery: 95,
        lessons: [
          { id: 101, title: "Introduction to Variables", completed: true },
          { id: 102, title: "Building Expressions", completed: true },
          { id: 103, title: "Simplifying Expressions", completed: true }
        ]
      },
      { 
        id: 2, 
        title: "Solving Equations", 
        status: "in-progress", 
        mastery: 68,
        lessons: [
          { id: 201, title: "One-Step Equations", completed: true },
          { id: 202, title: "Two-Step Equations", completed: true },
          { id: 203, title: "Multi-Step Equations", completed: false }
        ]
      },
      { 
        id: 3, 
        title: "Graphing Linear Equations", 
        status: "locked", 
        mastery: 0,
        lessons: [
          { id: 301, title: "The Coordinate Plane", completed: false },
          { id: 302, title: "Plotting Points", completed: false },
          { id: 303, title: "Graphing Lines", completed: false }
        ]
      }
    ],
    skills: [
      { name: "Problem Solving", level: 4 },
      { name: "Logical Reasoning", level: 3 },
      { name: "Pattern Recognition", level: 5 },
      { name: "Numerical Fluency", level: 4 }
    ]
  });

  const [aiFeedback, setAiFeedback] = useState([
    "You've shown consistent improvement in equation solving",
    "Consider spending more time on graphing concepts",
    "Your visual learning style suggests you'd benefit from more diagram-based lessons",
    "Based on your pace, you're on track to complete this module 2 days ahead of schedule"
  ]);

  // Add useEffect to simulate data fetching
  useEffect(() => {
    // Simulate API calls to fetch data when component mounts
    const fetchData = async () => {
      try {
        // In a real application, these would be actual API calls
        // For now, we'll just simulate loading the initial state
        // You can replace these with actual API endpoints later
        
        // Example of how to update state:
        // const subjectsData = await fetchSubjects();
        // setSubjects(subjectsData);
        
        // const activitiesData = await fetchRecentActivities();
        // setRecentActivities(activitiesData);
        
        // etc...
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen 
      userName={userName} 
      setUserName={setUserName} 
      password={password} 
      setPassword={setPassword}
      userType={userType}
      setUserType={setUserType}
      handleLogin={handleLogin}
      loading={loading}
    />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} userType={userType} />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "dashboard" && (
          <Dashboard 
            subjects={subjects} 
            recentActivities={recentActivities} 
            userType={userType}
            recommendations={recommendations}
            suggestedContent={suggestedContent}
            setSelectedSubject={setSelectedSubject}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === "subjects" && !selectedSubject && (
          <SubjectsOverview 
            subjects={subjects} 
            setSelectedSubject={setSelectedSubject}
          />
        )}
        
        {activeTab === "subjects" && selectedSubject && (
          <SubjectDetail 
            subject={mathContent} 
            setSelectedSubject={setSelectedSubject}
            aiFeedback={aiFeedback}
          />
        )}
        
        {activeTab === "achievements" && (
          <Achievements achievements={achievements} />
        )}
        
        {activeTab === "analytics" && (
          <Analytics subjects={subjects} />
        )}
        
        {activeTab === "settings" && (
          <SettingsPage userType={userType} />
        )}
      </div>
    </div>
  );
}

// Login Screen Component
function LoginScreen({ userName, setUserName, password, setPassword, userType, setUserType, handleLogin, loading }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Personalized Pathways</h1>
          <p className="text-gray-500 text-sm mb-6">AI-powered personalized learning experiences</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">I am a:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : "Sign In"}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            Demo credentials: Use any username/password
          </p>
        </div>
      </div>
    </div>
  );
}

// Side Navigation Component
function SideNavigation({ activeTab, setActiveTab, handleLogout, userType }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <BookMarked size={20} /> },
    { id: "subjects", label: "My Subjects", icon: <BookOpen size={20} /> },
    { id: "achievements", label: "Achievements", icon: <Award size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon size={20} /> }
  ];
  
  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col">
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold">Personalized Pathways</h1>
        <p className="text-indigo-200 text-sm">AI-Powered Learning</p>
      </div>
      
      <div className="p-4 border-b border-indigo-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="ml-3">
            <p className="font-medium">{userType === "student" ? "Student" : userType === "teacher" ? "Teacher" : "Parent"}</p>
            <p className="text-xs text-indigo-200">Alex Johnson</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? "bg-indigo-700 text-white" 
                    : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-indigo-200 hover:bg-indigo-700 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ 
  subjects, 
  recentActivities, 
  userType, 
  recommendations, 
  suggestedContent,
  setSelectedSubject,
  setActiveTab
}) {
  const handleSubjectClick = (subjectId) => {
    setSelectedSubject(subjectId);
    setActiveTab("subjects");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, Alex!</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">Daily Streak</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800">7</span>
            <span className="ml-2 text-orange-500"><Star size={20} /></span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Days in a row</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">Weekly Progress</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800">68%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">Achievements</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800">12</span>
            <span className="ml-2 text-yellow-500"><Award size={20} /></span>
          </div>
          <p className="text-sm text-gray-500 mt-1">2 new this week</p>
        </div>
      </div>
      
      {/* Subjects Overview */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {subjects.map(subject => (
          <div 
            key={subject.id} 
            className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSubjectClick(subject.id)}
          >
            <h3 className="font-semibold text-gray-800 mb-2">{subject.name}</h3>
            <div className="flex items-center mb-2">
              <div className="text-sm text-gray-500 mr-2">Progress:</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 ml-2">{subject.progress}%</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-gray-500">
                <span className="font-medium text-gray-700">Level {subject.level}</span>
              </div>
              <div className="text-orange-500 flex items-center">
                <Star size={16} className="mr-1" /> {subject.streak} day streak
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-green-500 font-medium">
                  {activity.score}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800">
            View all activities
          </button>
        </div>
        
        {/* AI Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-purple-500" />
            AI Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.map(rec => (
              <div key={rec.id} className="border-l-4 border-purple-400 pl-3 py-1">
                <h3 className="font-medium text-gray-800">{rec.title}</h3>
                <p className="text-sm text-gray-500">{rec.reason}</p>
              </div>
            ))}
          </div>
          
          <h3 className="font-medium text-gray-800 mt-6 mb-3">Suggested For You</h3>
          <div className="space-y-3">
            {suggestedContent.map(content => (
              <div key={content.id} className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{content.title}</h4>
                  <p className="text-xs text-gray-500">{content.difficulty}</p>
                </div>
                <div className="text-green-500 text-sm font-medium">
                  {content.match} match
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subjects Overview Component
function SubjectsOverview({ subjects, setSelectedSubject }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Subjects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map(subject => (
          <div 
            key={subject.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedSubject(subject.id)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{subject.name}</h2>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Overall Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{subject.level}</div>
                  <div className="text-xs text-gray-500">Current Level</div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center">
                    {subject.streak} <Star size={16} className="ml-1" />
                  </div>
                  <div className="text-xs text-gray-500">Day Streak</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Last accessed: Yesterday</span>
              <span className="text-indigo-600 text-sm font-medium">View Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Subject Detail Component
function SubjectDetail({ subject, setSelectedSubject, aiFeedback }) {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setSelectedSubject(null)}
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        >
          ← Back to Subjects
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{subject.title}</h1>
        <p className="text-gray-500">Current Module: {subject.currentModule}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {subject.skills.map(skill => (
            <div key={skill.name} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">{skill.name}</h3>
              <div className="flex items-center mt-2">
                <div className="text-indigo-600 font-bold">{skill.level}</div>
                <div className="text-gray-400 text-sm ml-1">/5</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Path</h2>
            <div className="space-y-6">
              {subject.units.map(unit => (
                <div key={unit.id} className={`border-l-4 ${
                  unit.status === 'completed' ? 'border-green-500' :
                  unit.status === 'in-progress' ? 'border-blue-500' :
                  'border-gray-300'
                } pl-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{unit.title}</h3>
                    <div className="flex items-center">
                      <div className="text-sm text-gray-500 mr-2">{unit.mastery}%</div>
                      {unit.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {unit.lessons.map(lesson => (
                      <div key={lesson.id} className="flex items-center text-sm">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          lesson.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                        <span className={lesson.completed ? 'text-gray-800' : 'text-gray-500'}>
                          {lesson.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-purple-500" />
            AI Insights
          </h2>
          <div className="space-y-4">
            {aiFeedback.map((feedback, index) => (
              <div key={index} className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                {feedback}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Component
function Analytics({ subjects }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Learning Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Overview</h2>
          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-800">{subject.name}</span>
                  <span className="text-gray-500">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Streaks</h2>
          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-500">Level {subject.level}</p>
                </div>
                <div className="flex items-center text-orange-500">
                  <Star size={16} className="mr-1" />
                  <span className="font-medium">{subject.streak} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Component
function SettingsPage({ userType }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <div className="text-gray-800">{userType.charAt(0).toUpperCase() + userType.slice(1)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Style</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>Visual</option>
                <option>Auditory</option>
                <option>Reading/Writing</option>
                <option>Kinesthetic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Achievements Component
function Achievements({ achievements }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
              achievement.completed ? 'border-green-500' : 'border-gray-300'
            }`}
          >
            <div className="flex items-center mb-3">
              {achievement.completed ? (
                <Award size={24} className="text-green-500" />
              ) : (
                <Award size={24} className="text-gray-400" />
              )}
              <h2 className="text-lg font-semibold text-gray-800 ml-2">
                {achievement.title}
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              {achievement.description}
            </p>
            {achievement.completed && (
              <div className="mt-4 flex items-center text-green-500 text-sm">
                <CheckCircle size={16} className="mr-1" />
                Completed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}