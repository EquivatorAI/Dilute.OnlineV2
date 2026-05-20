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
type Language = 'en' | 'ar';
type DashboardSection = 'overview' | 'shareholders' | 'scenarios' | 'reports' | 'portal';

const copy = {
  en: {
    dir: 'ltr',
    nav: {
      platform: 'Platform',
      scenarios: 'Scenarios',
      pricing: 'Pricing',
      signIn: 'Sign in',
      startFree: 'Sign Up',
      language: 'العربية',
      home: 'Go home',
      theme: 'Toggle theme',
      menu: 'Open menu',
    },
    home: {
      eyebrow: 'Founder finance command center',
      title: 'Dilute',
      subtitle: 'Model funding rounds, investor ownership, option pools, and founder dilution before you sign the term sheet.',
      build: 'Build my cap table',
      preview: 'Preview dashboard',
      seriesModel: 'Series A model',
      postMoney: 'Post-money',
      founderStake: 'Founder stake',
      runway: 'Runway',
      investor: 'investor',
      founders: 'founders',
      strip: 'Built for founder-led teams preparing for',
      seed: 'Seed',
      seriesA: 'Series A',
      bridge: 'Bridge rounds',
      esop: 'ESOP refreshes',
      platformLabel: 'Platform',
      platformTitle: 'Everything founders need before investor conversations.',
      features: [
        ['Live cap table', 'Track shareholders, classes, ownership, and dilution in one calm operating view.'],
        ['Scenario planner', 'Compare round structures, pre-money valuations, and option pool expansions side by side.'],
        ['Investor-ready reports', 'Export clean summaries for board updates, investor meetings, and internal planning.'],
        ['Decision clarity', 'See founder impact, investor ownership, runway, and implied pricing before the negotiation.'],
      ],
      scenarioLabel: 'Scenario engine',
      scenarioTitle: 'Choose the round that gives your company the most room to breathe.',
      scenarioText: 'Dilute makes the trade-offs visible: investor ownership, founder dilution, option pool pressure, and post-money valuation.',
      checks: ['Pre and post-money views', 'Option pool expansion modeling', 'Founder ownership tracking'],
      retained: 'founders retained',
      pricingLabel: 'Pricing',
      pricingTitle: 'Simple plans for serious planning.',
      plans: [
        ['Starter', '$9', 'One company, one active scenario'],
        ['Growth', '$19', 'Multiple scenarios and investor reports'],
        ['Studio', '$49', 'Team workflows and board-ready exports'],
      ],
      perMonth: '/mo',
      choosePlan: 'Choose plan',
      cta: 'Know the dilution before the dilution knows you.',
      ctaButton: 'Start modeling',
    },
    auth: {
      signupTitle: 'Create your workspace',
      signinTitle: 'Welcome back',
      signupText: 'Start with a guided cap table and your first funding scenario.',
      signinText: 'Open your cap table, scenarios, and investor reports.',
      email: 'Email',
      emailPlaceholder: 'founder@company.com',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      company: 'Company name',
      companyPlaceholder: 'Acme AI',
      create: 'Create workspace',
      signin: 'Sign in',
      already: 'Already have an account?',
      need: 'Need a new workspace?',
      passwordToggle: 'Toggle password visibility',
    },
    dashboard: {
      nav: ['Overview', 'Shareholders', 'Scenarios', 'Reports', 'Investor portal'],
      sectionTitles: {
        overview: 'Overview',
        shareholders: 'Shareholders',
        scenarios: 'Scenarios',
        reports: 'Reports',
        portal: 'Investor portal',
      },
      workspace: 'Workspace',
      title: 'EquivatorAI cap table',
      share: 'Share',
      export: 'Export',
      totalShares: 'Total shares',
      preMoney: 'Pre-money',
      investorOwnership: 'Investor ownership',
      founderOwnership: 'Founder ownership',
      ownership: 'Ownership',
      currentCapTable: 'Current cap table',
      addHolder: 'Add holder',
      roundModel: 'Round model',
      investment: 'investment',
      runway: 'Runway',
      cashAfterRaise: 'Cash after raise',
      comparison: 'Scenario comparison',
      founderVsInvestor: 'Founder vs investor ownership',
      shares: 'Shares',
      ownershipPercent: 'Ownership',
      shareClass: 'Share class',
      common: 'Common',
      preferred: 'Preferred',
      options: 'Options',
      update: 'Update',
      valuation: 'Valuation',
      optionPool: 'Option pool',
      foundersRetained: 'Founders retained',
      status: 'Status',
      ready: 'Ready',
      draft: 'Draft',
      generateReport: 'Generate report',
      reportItems: ['Board update summary', 'Investor cap table export', 'Scenario comparison memo'],
      portalIntro: 'Share selected metrics and reports with investors without exposing internal planning notes.',
      portalAccess: 'Portal access',
      enabled: 'Enabled',
      lastViewed: 'Last viewed',
      inviteInvestor: 'Invite investor',
    },
  },
  ar: {
    dir: 'rtl',
    nav: {
      platform: 'المنصة',
      scenarios: 'السيناريوهات',
      pricing: 'الأسعار',
      signIn: 'تسجيل الدخول',
      startFree: 'إنشاء حساب',
      language: 'English',
      home: 'العودة للرئيسية',
      theme: 'تبديل المظهر',
      menu: 'فتح القائمة',
    },
    home: {
      eyebrow: 'مركز قيادة مالي للمؤسسين',
      title: 'Dilute',
      subtitle: 'نمذج جولات التمويل وملكية المستثمرين وخطط خيارات الموظفين وتأثير التخفيف قبل توقيع ورقة الشروط.',
      build: 'أنشئ جدول الملكية',
      preview: 'معاينة لوحة التحكم',
      seriesModel: 'نموذج الجولة A',
      postMoney: 'التقييم بعد التمويل',
      founderStake: 'حصة المؤسسين',
      runway: 'المدى التشغيلي',
      investor: 'للمستثمر',
      founders: 'للمؤسسين',
      strip: 'مصمم لفرق المؤسسين التي تستعد لـ',
      seed: 'الجولة التأسيسية',
      seriesA: 'الجولة A',
      bridge: 'جولات الجسر',
      esop: 'تحديثات خيارات الموظفين',
      platformLabel: 'المنصة',
      platformTitle: 'كل ما يحتاجه المؤسسون قبل محادثات المستثمرين.',
      features: [
        ['جدول ملكية مباشر', 'تتبع المساهمين وفئات الأسهم والملكية والتخفيف في عرض عملي واضح.'],
        ['مخطط السيناريوهات', 'قارن هياكل الجولات والتقييمات قبل التمويل وتوسعات خطة الخيارات جنبا إلى جنب.'],
        ['تقارير جاهزة للمستثمرين', 'صدّر ملخصات مرتبة لاجتماعات المجلس والمستثمرين والتخطيط الداخلي.'],
        ['وضوح في القرار', 'اعرف أثر الجولة على المؤسسين والمستثمرين والمدى التشغيلي قبل التفاوض.'],
      ],
      scenarioLabel: 'محرك السيناريوهات',
      scenarioTitle: 'اختر الجولة التي تمنح شركتك مساحة أكبر للنمو.',
      scenarioText: 'يجعل Dilute المفاضلات واضحة: ملكية المستثمرين، تخفيف حصة المؤسسين، ضغط خطة الخيارات، والتقييم بعد التمويل.',
      checks: ['عرض قبل وبعد التمويل', 'نمذجة توسيع خطة الخيارات', 'تتبع ملكية المؤسسين'],
      retained: 'حصة المؤسسين المتبقية',
      pricingLabel: 'الأسعار',
      pricingTitle: 'خطط بسيطة لتخطيط جاد.',
      plans: [
        ['Starter', '$9', 'شركة واحدة وسيناريو نشط واحد'],
        ['Growth', '$19', 'سيناريوهات متعددة وتقارير للمستثمرين'],
        ['Studio', '$49', 'عمل جماعي وتصدير جاهز للمجلس'],
      ],
      perMonth: '/شهريا',
      choosePlan: 'اختر الخطة',
      cta: 'اعرف التخفيف قبل أن يفاجئك التخفيف.',
      ctaButton: 'ابدأ النمذجة',
    },
    auth: {
      signupTitle: 'أنشئ مساحة العمل',
      signinTitle: 'مرحبا بعودتك',
      signupText: 'ابدأ بجدول ملكية موجه وأول سيناريو تمويل لك.',
      signinText: 'افتح جدول الملكية والسيناريوهات وتقارير المستثمرين.',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'founder@company.com',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      company: 'اسم الشركة',
      companyPlaceholder: 'Acme AI',
      create: 'إنشاء مساحة العمل',
      signin: 'تسجيل الدخول',
      already: 'لديك حساب بالفعل؟',
      need: 'تحتاج مساحة عمل جديدة؟',
      passwordToggle: 'إظهار أو إخفاء كلمة المرور',
    },
    dashboard: {
      nav: ['نظرة عامة', 'المساهمون', 'السيناريوهات', 'التقارير', 'بوابة المستثمرين'],
      sectionTitles: {
        overview: 'نظرة عامة',
        shareholders: 'المساهمون',
        scenarios: 'السيناريوهات',
        reports: 'التقارير',
        portal: 'بوابة المستثمرين',
      },
      workspace: 'مساحة العمل',
      title: 'جدول ملكية EquivatorAI',
      share: 'مشاركة',
      export: 'تصدير',
      totalShares: 'إجمالي الأسهم',
      preMoney: 'التقييم قبل التمويل',
      investorOwnership: 'ملكية المستثمرين',
      founderOwnership: 'ملكية المؤسسين',
      ownership: 'الملكية',
      currentCapTable: 'جدول الملكية الحالي',
      addHolder: 'إضافة مالك',
      roundModel: 'نموذج الجولة',
      investment: 'استثمار',
      runway: 'المدى التشغيلي',
      cashAfterRaise: 'النقد بعد الجولة',
      comparison: 'مقارنة السيناريوهات',
      founderVsInvestor: 'ملكية المؤسسين مقابل المستثمرين',
      shares: 'الأسهم',
      ownershipPercent: 'الملكية',
      shareClass: 'فئة الأسهم',
      common: 'عادية',
      preferred: 'ممتازة',
      options: 'خيارات',
      update: 'تحديث',
      valuation: 'التقييم',
      optionPool: 'خطة الخيارات',
      foundersRetained: 'حصة المؤسسين المتبقية',
      status: 'الحالة',
      ready: 'جاهز',
      draft: 'مسودة',
      generateReport: 'إنشاء تقرير',
      reportItems: ['ملخص تحديث المجلس', 'تصدير جدول الملكية للمستثمرين', 'مذكرة مقارنة السيناريوهات'],
      portalIntro: 'شارك مؤشرات وتقارير مختارة مع المستثمرين من دون كشف ملاحظات التخطيط الداخلية.',
      portalAccess: 'وصول البوابة',
      enabled: 'مفعل',
      lastViewed: 'آخر مشاهدة',
      inviteInvestor: 'دعوة مستثمر',
    },
  },
} as const;

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
  const [language, setLanguage] = useState<Language>('en');
  const t = copy[language];

  useEffect(() => {
    const sync = () => setPage(routeToPage());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const go = (next: Page) => navigate(next);
  const toggleLanguage = () => setLanguage((current) => (current === 'en' ? 'ar' : 'en'));

  return (
    <div className={dark ? 'app dark' : 'app'} dir={t.dir} lang={language}>
      {page === 'home' && <HomePage go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={toggleLanguage} />}
      {page === 'signin' && <AuthPage mode="signin" go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={toggleLanguage} />}
      {page === 'signup' && <AuthPage mode="signup" go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={toggleLanguage} />}
      {page === 'dashboard' && <Dashboard go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={toggleLanguage} />}
    </div>
  );
}

type Copy = (typeof copy)[Language];

function TopNav({
  go,
  dark,
  setDark,
  t,
  onLanguageToggle,
}: {
  go: (page: Page) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  t: Copy;
  onLanguageToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <button className="brand" onClick={() => go('home')} aria-label={t.nav.home}>
        <span className="brand-mark">D</span>
        <span>Dilute</span>
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        <a href="#platform">{t.nav.platform}</a>
        <a href="#scenarios">{t.nav.scenarios}</a>
        <a href="#pricing">{t.nav.pricing}</a>
      </nav>
      <div className="nav-actions">
        <button className="language-button" onClick={onLanguageToggle}>
          <Globe2 size={16} />
          {t.nav.language}
        </button>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label={t.nav.theme}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="ghost-button hide-mobile" onClick={() => go('signin')}>{t.nav.signIn}</button>
        <button className="primary-button hide-mobile" onClick={() => go('signup')}>
          {t.nav.startFree} <ArrowRight size={17} />
        </button>
        <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label={t.nav.menu}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function HomePage({
  go,
  dark,
  setDark,
  t,
  onLanguageToggle,
}: {
  go: (page: Page) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  t: Copy;
  onLanguageToggle: () => void;
}) {
  return (
    <>
      <TopNav go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={onLanguageToggle} />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> {t.home.eyebrow}</div>
            <h1>Dilute</h1>
            <p>
              {t.home.subtitle}
            </p>
            <div className="hero-actions">
              <button className="primary-button large" onClick={() => go('signup')}>
                {t.home.build} <ArrowRight size={19} />
              </button>
              <button className="secondary-button large" onClick={() => go('dashboard')}>
                {t.home.preview}
              </button>
            </div>
          </div>
          <div className="hero-panel" aria-label="Cap table preview">
            <div className="panel-toolbar">
              <span />
              <span />
              <span />
              <strong>{t.home.seriesModel}</strong>
            </div>
            <div className="metric-grid">
              <Metric icon={<CircleDollarSign />} label={t.home.postMoney} value="$13.5M" />
              <Metric icon={<Users />} label={t.home.founderStake} value="51.8%" />
              <Metric icon={<Gauge />} label={t.home.runway} value="18 mo" />
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
                  <strong>{roundInvestorOwnership(round).toFixed(1)}% {t.home.investor}</strong>
                  <em>{founderOwnershipAfter(round).toFixed(1)}% {t.home.founders}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <span>{t.home.strip}</span>
          <strong>{t.home.seed}</strong>
          <strong>{t.home.seriesA}</strong>
          <strong>{t.home.bridge}</strong>
          <strong>{t.home.esop}</strong>
        </section>

        <section id="platform" className="section">
          <div className="section-heading">
            <p>{t.home.platformLabel}</p>
            <h2>{t.home.platformTitle}</h2>
          </div>
          <div className="feature-grid">
            <Feature icon={<PieChart />} title={t.home.features[0][0]} text={t.home.features[0][1]} />
            <Feature icon={<Layers3 />} title={t.home.features[1][0]} text={t.home.features[1][1]} />
            <Feature icon={<FileText />} title={t.home.features[2][0]} text={t.home.features[2][1]} />
            <Feature icon={<ShieldCheck />} title={t.home.features[3][0]} text={t.home.features[3][1]} />
          </div>
        </section>

        <section id="scenarios" className="section split-section">
          <div>
            <p className="section-kicker">{t.home.scenarioLabel}</p>
            <h2>{t.home.scenarioTitle}</h2>
            <p className="muted">
              {t.home.scenarioText}
            </p>
            <div className="check-list">
              {t.home.checks.map((check) => <span key={check}><Check size={17} /> {check}</span>)}
            </div>
          </div>
          <div className="scenario-card">
            {scenarioRows.map((row) => (
              <div className="scenario-row" key={row.name}>
                <div>
                  <strong>{row.name}</strong>
                  <span>{row.founders}% {t.home.retained}</span>
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
            <p>{t.home.pricingLabel}</p>
            <h2>{t.home.pricingTitle}</h2>
          </div>
          <div className="pricing-grid">
            {t.home.plans.map(([name, price, text], index) => (
              <div className={index === 1 ? 'price-card featured' : 'price-card'} key={name}>
                <h3>{name}</h3>
                <strong>{price}<span>{t.home.perMonth}</span></strong>
                <p>{text}</p>
                <button className={index === 1 ? 'primary-button' : 'secondary-button'} onClick={() => go('signup')}>
                  {t.home.choosePlan}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>{t.home.cta}</h2>
          <button className="primary-button inverted" onClick={() => go('signup')}>
            {t.home.ctaButton} <ArrowRight size={18} />
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

function AuthPage({
  mode,
  go,
  dark,
  setDark,
  t,
  onLanguageToggle,
}: {
  mode: 'signin' | 'signup';
  go: (page: Page) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  t: Copy;
  onLanguageToggle: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TopNav go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={onLanguageToggle} />
      <main className="auth-layout">
        <section className="auth-card">
          <button className="brand auth-brand" onClick={() => go('home')} aria-label={t.nav.home}>
            <span className="brand-mark">D</span>
            <span>Dilute</span>
          </button>
          <h1>{mode === 'signup' ? t.auth.signupTitle : t.auth.signinTitle}</h1>
          <p>{mode === 'signup' ? t.auth.signupText : t.auth.signinText}</p>
          <label>
            <span>{t.auth.email}</span>
            <div className="input-wrap"><Mail size={18} /><input placeholder={t.auth.emailPlaceholder} /></div>
          </label>
          <label>
            <span>{t.auth.password}</span>
            <div className="input-wrap">
              <Lock size={18} />
              <input type={showPassword ? 'text' : 'password'} placeholder={t.auth.passwordPlaceholder} />
              <button onClick={() => setShowPassword(!showPassword)} aria-label={t.auth.passwordToggle}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {mode === 'signup' && (
            <label>
              <span>{t.auth.company}</span>
              <div className="input-wrap"><Building2 size={18} /><input placeholder={t.auth.companyPlaceholder} /></div>
            </label>
          )}
          <button className="primary-button full" onClick={() => go('dashboard')}>
            {mode === 'signup' ? t.auth.create : t.auth.signin} <ArrowRight size={18} />
          </button>
          <button className="link-button" onClick={() => go(mode === 'signup' ? 'signin' : 'signup')}>
            {mode === 'signup' ? t.auth.already : t.auth.need}
          </button>
        </section>
      </main>
    </>
  );
}

function Dashboard({
  go,
  dark,
  setDark,
  t,
  onLanguageToggle,
}: {
  go: (page: Page) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  t: Copy;
  onLanguageToggle: () => void;
}) {
  const [selectedRound, setSelectedRound] = useState(rounds[1]);
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const sidebarItems: Array<[DashboardSection, ReactNode, string]> = [
    ['overview', <BarChart3 size={18} />, t.dashboard.nav[0]],
    ['shareholders', <Users size={18} />, t.dashboard.nav[1]],
    ['scenarios', <Layers3 size={18} />, t.dashboard.nav[2]],
    ['reports', <FileText size={18} />, t.dashboard.nav[3]],
    ['portal', <Globe2 size={18} />, t.dashboard.nav[4]],
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <button className="brand" onClick={() => go('home')} aria-label={t.nav.home}>
          <span className="brand-mark">D</span>
          <span>Dilute</span>
        </button>
        <nav>
          {sidebarItems.map(([section, icon, label]) => (
            <button
              className={activeSection === section ? 'active' : ''}
              key={section}
              onClick={() => setActiveSection(section)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p>{t.dashboard.workspace}</p>
            <h1>{activeSection === 'overview' ? t.dashboard.title : t.dashboard.sectionTitles[activeSection]}</h1>
          </div>
          <div className="dashboard-actions">
            <button className="language-button" onClick={onLanguageToggle}>
              <Globe2 size={16} />
              {t.nav.language}
            </button>
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label={t.nav.theme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="secondary-button"><Share2 size={17} /> {t.dashboard.share}</button>
            <button className="primary-button"><Download size={17} /> {t.dashboard.export}</button>
          </div>
        </header>

        {activeSection === 'overview' && <OverviewSection selectedRound={selectedRound} setSelectedRound={setSelectedRound} t={t} />}
        {activeSection === 'shareholders' && <ShareholdersSection t={t} />}
        {activeSection === 'scenarios' && <ScenariosSection selectedRound={selectedRound} setSelectedRound={setSelectedRound} t={t} />}
        {activeSection === 'reports' && <ReportsSection t={t} />}
        {activeSection === 'portal' && <InvestorPortalSection t={t} />}
      </main>
    </div>
  );
}

function OverviewSection({
  selectedRound,
  setSelectedRound,
  t,
}: {
  selectedRound: (typeof rounds)[number];
  setSelectedRound: (round: (typeof rounds)[number]) => void;
  t: Copy;
}) {
  return (
    <>
      <section className="dashboard-grid">
        <Metric icon={<Users />} label={t.dashboard.totalShares} value={formatNumber(totalShares())} />
        <Metric icon={<CircleDollarSign />} label={t.dashboard.preMoney} value={formatMoney(selectedRound.preMoney)} />
        <Metric icon={<PieChart />} label={t.dashboard.investorOwnership} value={`${roundInvestorOwnership(selectedRound).toFixed(1)}%`} />
        <Metric icon={<Gauge />} label={t.dashboard.founderOwnership} value={`${Math.max(founderOwnershipAfter(selectedRound), 0).toFixed(1)}%`} />
      </section>

      <section className="workbench">
        <OwnershipCard t={t} />
        <RoundModelCard selectedRound={selectedRound} setSelectedRound={setSelectedRound} t={t} />
      </section>

      <section className="workbench">
        <RunwayCard t={t} />
        <ScenarioChartCard t={t} />
      </section>
    </>
  );
}

function OwnershipCard({ t }: { t: Copy }) {
  return (
    <div className="workspace-card large-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.ownership}</p>
          <h2>{t.dashboard.currentCapTable}</h2>
        </div>
        <button className="secondary-button"><Plus size={16} /> {t.dashboard.addHolder}</button>
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
  );
}

function RoundModelCard({
  selectedRound,
  setSelectedRound,
  t,
}: {
  selectedRound: (typeof rounds)[number];
  setSelectedRound: (round: (typeof rounds)[number]) => void;
  t: Copy;
}) {
  return (
    <div className="workspace-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.roundModel}</p>
          <h2>{selectedRound.name}</h2>
        </div>
      </div>
      <div className="round-list">
        {rounds.map((round) => (
          <button className={round.name === selectedRound.name ? 'active' : ''} key={round.name} onClick={() => setSelectedRound(round)}>
            <span>
              <strong>{round.name}</strong>
              <small>{formatMoney(round.investment)} {t.dashboard.investment}</small>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}

function RunwayCard({ t }: { t: Copy }) {
  return (
    <div className="workspace-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.runway}</p>
          <h2>{t.dashboard.cashAfterRaise}</h2>
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
  );
}

function ScenarioChartCard({ t }: { t: Copy }) {
  return (
    <div className="workspace-card large-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.comparison}</p>
          <h2>{t.dashboard.founderVsInvestor}</h2>
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
  );
}

function ShareholdersSection({ t }: { t: Copy }) {
  return (
    <section className="workspace-card section-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.ownership}</p>
          <h2>{t.dashboard.nav[1]}</h2>
        </div>
        <button className="secondary-button"><Plus size={16} /> {t.dashboard.addHolder}</button>
      </div>
      <div className="data-table">
        <div className="table-row table-head">
          <span>{t.auth.company}</span>
          <span>{t.dashboard.shares}</span>
          <span>{t.dashboard.ownershipPercent}</span>
          <span>{t.dashboard.shareClass}</span>
        </div>
        {stakeholders.map((holder, index) => (
          <div className="table-row" key={holder.name}>
            <span className="person-cell"><i style={{ background: holder.color }} /> <strong>{holder.name}</strong><small>{holder.role}</small></span>
            <span>{formatNumber(holder.shares)}</span>
            <span>{ownershipPercent(holder.shares).toFixed(1)}%</span>
            <span>{index < 2 ? t.dashboard.common : index === 2 ? t.dashboard.preferred : t.dashboard.options}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScenariosSection({
  selectedRound,
  setSelectedRound,
  t,
}: {
  selectedRound: (typeof rounds)[number];
  setSelectedRound: (round: (typeof rounds)[number]) => void;
  t: Copy;
}) {
  return (
    <>
      <section className="scenario-summary">
        {rounds.map((round) => (
          <button className={round.name === selectedRound.name ? 'workspace-card active scenario-option' : 'workspace-card scenario-option'} key={round.name} onClick={() => setSelectedRound(round)}>
            <strong>{round.name}</strong>
            <span>{t.dashboard.valuation}: {formatMoney(round.preMoney)}</span>
            <span>{t.dashboard.investment}: {formatMoney(round.investment)}</span>
            <span>{t.dashboard.optionPool}: {round.optionPool}%</span>
          </button>
        ))}
      </section>
      <section className="workbench">
        <ScenarioChartCard t={t} />
        <div className="workspace-card">
          <div className="card-heading">
            <div>
              <p>{t.dashboard.roundModel}</p>
              <h2>{selectedRound.name}</h2>
            </div>
          </div>
          <div className="insight-list">
            <div><span>{t.dashboard.investorOwnership}</span><strong>{roundInvestorOwnership(selectedRound).toFixed(1)}%</strong></div>
            <div><span>{t.dashboard.foundersRetained}</span><strong>{Math.max(founderOwnershipAfter(selectedRound), 0).toFixed(1)}%</strong></div>
            <div><span>{t.dashboard.optionPool}</span><strong>{selectedRound.optionPool}%</strong></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportsSection({ t }: { t: Copy }) {
  return (
    <section className="report-grid">
      {t.dashboard.reportItems.map((item, index) => (
        <article className="workspace-card report-card" key={item}>
          <FileText size={24} />
          <h2>{item}</h2>
          <p>{index === 1 ? t.dashboard.ready : t.dashboard.draft}</p>
          <button className={index === 1 ? 'primary-button' : 'secondary-button'}>
            {t.dashboard.generateReport}
          </button>
        </article>
      ))}
    </section>
  );
}

function InvestorPortalSection({ t }: { t: Copy }) {
  return (
    <section className="workbench">
      <div className="workspace-card large-card">
        <div className="card-heading">
          <div>
            <p>{t.dashboard.nav[4]}</p>
            <h2>{t.dashboard.portalAccess}</h2>
          </div>
          <span className="status-pill">{t.dashboard.enabled}</span>
        </div>
        <p className="muted">{t.dashboard.portalIntro}</p>
        <div className="portal-metrics">
          <Metric icon={<Users />} label={t.dashboard.nav[1]} value="12" />
          <Metric icon={<Eye />} label={t.dashboard.lastViewed} value="2h" />
          <Metric icon={<FileText />} label={t.dashboard.nav[3]} value="3" />
        </div>
      </div>
      <div className="workspace-card">
        <div className="card-heading">
          <div>
            <p>{t.dashboard.status}</p>
            <h2>{t.dashboard.ready}</h2>
          </div>
        </div>
        <div className="insight-list">
          <div><span>Sequoia Capital</span><strong>{t.dashboard.enabled}</strong></div>
          <div><span>Accel Partners</span><strong>{t.dashboard.enabled}</strong></div>
          <div><span>Board observer</span><strong>{t.dashboard.draft}</strong></div>
        </div>
        <button className="primary-button full"><Plus size={16} /> {t.dashboard.inviteInvestor}</button>
      </div>
    </section>
  );
}
