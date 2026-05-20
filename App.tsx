import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Download,
  Eye,
  EyeOff,
  FileText,
  Gauge,
  Globe2,
  Layers3,
  Lock,
  Mail,
  Menu,
  Moon,
  PieChart,
  Plus,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  formatMoney,
  formatNumber,
  founderOwnershipAfter,
  ownershipPercent,
  roundInvestorOwnership,
  rounds,
  scenarioRows,
  stakeholders,
  totalShares,
} from './data';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Page = 'home' | 'signin' | 'signup' | 'dashboard';

const routeToPage = (): Page => {
  const path = window.location.pathname;
  if (path.includes('signin')) return 'signin';
  if (path.includes('signup')) return 'signup';
  if (path.includes('app')) return 'dashboard';
  return 'home';
};

const navigate = (page: Page) => {
  const path = page === 'home' ? '/' : page === 'dashboard' ? '/app' : `/${page}`;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const ownershipData = stakeholders.map((holder) => ({
  name: holder.name,
  value: Number(ownershipPercent(holder.shares).toFixed(1)),
  color: holder.color,
}));

const runwayData = [
  { month: 'Jan', cash: 920 },
  { month: 'Feb', cash: 860 },
  { month: 'Mar', cash: 790 },
  { month: 'Apr', cash: 720 },
  { month: 'May', cash: 650 },
  { month: 'Jun', cash: 580 },
  { month: 'Jul', cash: 510 },
  { month: 'Aug', cash: 450 },
];

export function App() {
  const [page, setPage] = useState<Page>(routeToPage);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setPage(routeToPage());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const go = (next: Page) => navigate(next);

  return (
    <div className={dark ? 'app dark' : 'app'}>
      {page === 'home' && <HomePage go={go} dark={dark} setDark={setDark} />}
      {page === 'signin' && <AuthPage mode="signin" go={go} dark={dark} setDark={setDark} />}
      {page === 'signup' && <AuthPage mode="signup" go={go} dark={dark} setDark={setDark} />}
      {page === 'dashboard' && <Dashboard go={go} dark={dark} setDark={setDark} />}
    </div>
  );
}

function TopNav({ go, dark, setDark }: { go: (page: Page) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <button className="brand" onClick={() => go('home')} aria-label="Go home">
        <span className="brand-mark">D</span>
        <span>Dilute</span>
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        <a href="#platform">Platform</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div className="nav-actions">
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="ghost-button hide-mobile" onClick={() => go('signin')}>Sign in</button>
        <button className="primary-button hide-mobile" onClick={() => go('signup')}>
          Start free <ArrowRight size={17} />
        </button>
        <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function HomePage({ go, dark, setDark }: { go: (page: Page) => void; dark: boolean; setDark: (value: boolean) => void }) {
  return (
    <>
      <TopNav go={go} dark={dark} setDark={setDark} />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> Founder finance command center</div>
            <h1>Dilute</h1>
            <p>
              Model funding rounds, investor ownership, option pools, and founder dilution before you sign the term sheet.
            </p>
            <div className="hero-actions">
              <button className="primary-button large" onClick={() => go('signup')}>
                Build my cap table <ArrowRight size={19} />
              </button>
              <button className="secondary-button large" onClick={() => go('dashboard')}>
                Preview dashboard
              </button>
            </div>
          </div>
          <div className="hero-panel" aria-label="Cap table preview">
            <div className="panel-toolbar">
              <span />
              <span />
              <span />
              <strong>Series A model</strong>
            </div>
            <div className="metric-grid">
              <Metric icon={<CircleDollarSign />} label="Post-money" value="$13.5M" />
              <Metric icon={<Users />} label="Founder stake" value="51.8%" />
              <Metric icon={<Gauge />} label="Runway" value="18 mo" />
            </div>
            <div className="chart-shell">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={scenarioRows}>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(37, 99, 235, .08)' }} />
                  <Bar dataKey="founders" stackId="a" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="investor" stackId="a" fill="#0f766e" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="optionPool" stackId="a" fill="#ea580c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="hero-table">
              {rounds.slice(0, 2).map((round) => (
                <div key={round.name}>
                  <span>{round.name}</span>
                  <strong>{roundInvestorOwnership(round).toFixed(1)}% investor</strong>
                  <em>{founderOwnershipAfter(round).toFixed(1)}% founders</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <span>Built for founder-led teams preparing for</span>
          <strong>Seed</strong>
          <strong>Series A</strong>
          <strong>Bridge rounds</strong>
          <strong>ESOP refreshes</strong>
        </section>

        <section id="platform" className="section">
          <div className="section-heading">
            <p>Platform</p>
            <h2>Everything founders need before investor conversations.</h2>
          </div>
          <div className="feature-grid">
            <Feature icon={<PieChart />} title="Live cap table" text="Track shareholders, classes, ownership, and dilution in one calm operating view." />
            <Feature icon={<Layers3 />} title="Scenario planner" text="Compare round structures, pre-money valuations, and option pool expansions side by side." />
            <Feature icon={<FileText />} title="Investor-ready reports" text="Export clean summaries for board updates, investor meetings, and internal planning." />
            <Feature icon={<ShieldCheck />} title="Decision clarity" text="See founder impact, investor ownership, runway, and implied pricing before the negotiation." />
          </div>
        </section>

        <section id="scenarios" className="section split-section">
          <div>
            <p className="section-kicker">Scenario engine</p>
            <h2>Choose the round that gives your company the most room to breathe.</h2>
            <p className="muted">
              Dilute makes the trade-offs visible: investor ownership, founder dilution, option pool pressure, and post-money valuation.
            </p>
            <div className="check-list">
              <span><Check size={17} /> Pre and post-money views</span>
              <span><Check size={17} /> Option pool expansion modeling</span>
              <span><Check size={17} /> Founder ownership tracking</span>
            </div>
          </div>
          <div className="scenario-card">
            {scenarioRows.map((row) => (
              <div className="scenario-row" key={row.name}>
                <div>
                  <strong>{row.name}</strong>
                  <span>{row.founders}% founders retained</span>
                </div>
                <div className="scenario-bars">
                  <i style={{ width: `${row.founders}%`, background: '#1d4ed8' }} />
                  <i style={{ width: `${row.investor}%`, background: '#0f766e' }} />
                  <i style={{ width: `${row.optionPool}%`, background: '#ea580c' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="section-heading">
            <p>Pricing</p>
            <h2>Simple plans for serious planning.</h2>
          </div>
          <div className="pricing-grid">
            {[
              ['Starter', '$9', 'One company, one active scenario'],
              ['Growth', '$19', 'Multiple scenarios and investor reports'],
              ['Studio', '$49', 'Team workflows and board-ready exports'],
            ].map(([name, price, text], index) => (
              <div className={index === 1 ? 'price-card featured' : 'price-card'} key={name}>
                <h3>{name}</h3>
                <strong>{price}<span>/mo</span></strong>
                <p>{text}</p>
                <button className={index === 1 ? 'primary-button' : 'secondary-button'} onClick={() => go('signup')}>
                  Choose plan
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Know the dilution before the dilution knows you.</h2>
          <button className="primary-button inverted" onClick={() => go('signup')}>
            Start modeling <ArrowRight size={18} />
          </button>
        </section>
      </main>
    </>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="feature-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function AuthPage({ mode, go, dark, setDark }: { mode: 'signin' | 'signup'; go: (page: Page) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TopNav go={go} dark={dark} setDark={setDark} />
      <main className="auth-layout">
        <section className="auth-card">
          <button className="brand auth-brand" onClick={() => go('home')} aria-label="Go home">
            <span className="brand-mark">D</span>
            <span>Dilute</span>
          </button>
          <h1>{mode === 'signup' ? 'Create your workspace' : 'Welcome back'}</h1>
          <p>{mode === 'signup' ? 'Start with a guided cap table and your first funding scenario.' : 'Open your cap table, scenarios, and investor reports.'}</p>
          <label>
            <span>Email</span>
            <div className="input-wrap"><Mail size={18} /><input placeholder="founder@company.com" /></div>
          </label>
          <label>
            <span>Password</span>
            <div className="input-wrap">
              <Lock size={18} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
              <button onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {mode === 'signup' && (
            <label>
              <span>Company name</span>
              <div className="input-wrap"><Building2 size={18} /><input placeholder="Acme AI" /></div>
            </label>
          )}
          <button className="primary-button full" onClick={() => go('dashboard')}>
            {mode === 'signup' ? 'Create workspace' : 'Sign in'} <ArrowRight size={18} />
          </button>
          <button className="link-button" onClick={() => go(mode === 'signup' ? 'signin' : 'signup')}>
            {mode === 'signup' ? 'Already have an account?' : 'Need a new workspace?'}
          </button>
        </section>
      </main>
    </>
  );
}

function Dashboard({ go, dark, setDark }: { go: (page: Page) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const [selectedRound, setSelectedRound] = useState(rounds[1]);
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <button className="brand" onClick={() => go('home')} aria-label="Go home">
          <span className="brand-mark">D</span>
          <span>Dilute</span>
        </button>
        <nav>
          <a className="active"><BarChart3 size={18} /> Overview</a>
          <a><Users size={18} /> Shareholders</a>
          <a><Layers3 size={18} /> Scenarios</a>
          <a><FileText size={18} /> Reports</a>
          <a><Globe2 size={18} /> Investor portal</a>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p>Workspace</p>
            <h1>EquivatorAI cap table</h1>
          </div>
          <div className="dashboard-actions">
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="secondary-button"><Share2 size={17} /> Share</button>
            <button className="primary-button"><Download size={17} /> Export</button>
          </div>
        </header>

        <section className="dashboard-grid">
          <Metric icon={<Users />} label="Total shares" value={formatNumber(totalShares())} />
          <Metric icon={<CircleDollarSign />} label="Pre-money" value={formatMoney(selectedRound.preMoney)} />
          <Metric icon={<PieChart />} label="Investor ownership" value={`${roundInvestorOwnership(selectedRound).toFixed(1)}%`} />
          <Metric icon={<Gauge />} label="Founder ownership" value={`${Math.max(founderOwnershipAfter(selectedRound), 0).toFixed(1)}%`} />
        </section>

        <section className="workbench">
          <div className="workspace-card large-card">
            <div className="card-heading">
              <div>
                <p>Ownership</p>
                <h2>Current cap table</h2>
              </div>
              <button className="secondary-button"><Plus size={16} /> Add holder</button>
            </div>
            <div className="ownership-layout">
              <ResponsiveContainer width="100%" height={260}>
                <RePieChart>
                  <Pie data={ownershipData} innerRadius={72} outerRadius={104} paddingAngle={3} dataKey="value">
                    {ownershipData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="holder-list">
                {stakeholders.map((holder) => (
                  <div key={holder.name}>
                    <span style={{ background: holder.color }} />
                    <strong>{holder.name}</strong>
                    <small>{holder.role}</small>
                    <em>{ownershipPercent(holder.shares).toFixed(1)}%</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-heading">
              <div>
                <p>Round model</p>
                <h2>{selectedRound.name}</h2>
              </div>
            </div>
            <div className="round-list">
              {rounds.map((round) => (
                <button className={round.name === selectedRound.name ? 'active' : ''} key={round.name} onClick={() => setSelectedRound(round)}>
                  <span>
                    <strong>{round.name}</strong>
                    <small>{formatMoney(round.investment)} investment</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="workbench">
          <div className="workspace-card">
            <div className="card-heading">
              <div>
                <p>Runway</p>
                <h2>Cash after raise</h2>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={runwayData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="cash" stroke="#1d4ed8" fill="#bfdbfe" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="workspace-card large-card">
            <div className="card-heading">
              <div>
                <p>Scenario comparison</p>
                <h2>Founder vs investor ownership</h2>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scenarioRows}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="founders" fill="#1d4ed8" radius={[7, 7, 0, 0]} />
                <Bar dataKey="investor" fill="#0f766e" radius={[7, 7, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
