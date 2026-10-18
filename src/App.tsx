import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, Link } from 'wouter';
import { Navbar } from './components/layout/Navbar';
import Home from './pages/Home';
import Hours from './pages/Hours';
import Location from './pages/Location';
import Notices from './pages/Notices';
import Reviews from './pages/Reviews';
import Help from './pages/Help';
import Menu from './pages/Menu';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div style={{ background: "#FBF6EA", minHeight: "100vh" }} className="flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl" style={{ fontWeight: 800, color: "#D1432A" }}>404</h1>
      <p className="text-2xl font-bold mt-4 mb-2" style={{ color: "#221C14" }}>אופס! הדף לא נמצא</p>
      <p className="text-base mb-8" style={{ color: "#6b6555" }}>נראה שהלכתם לאיבוד בין המדפים...</p>
      <Link href="/" className="app-btn px-6 py-3 text-base"
        style={{ background: "#D1432A", color: "#FBF6EA", border: "2px solid #221C14", boxShadow: "2px 3px 0 rgba(0,0,0,0.2)" }}>
        חזרה לדף הבית
      </Link>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="min-h-[100dvh] flex flex-col" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: "#FBF6EA" }}>
          <Navbar />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/hours" component={Hours} />
              <Route path="/menu" component={Menu} />
              <Route path="/location" component={Location} />
              <Route path="/notices" component={Notices} />
              <Route path="/reviews" component={Reviews} />
              <Route path="/help" component={Help} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <footer className="py-8 text-center" style={{ background: "#13301F", borderTop: "2px solid #221C14" }}>
            <p style={{ fontWeight: 800, color: "#ECDBB0", fontSize: 16 }}>סנטר זול טובי</p>
            <p style={{ color: "#7FB87A", fontSize: 13, marginTop: 4 }}>רחוב צבי הרר 35, קרית אתא</p>
          </footer>
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
