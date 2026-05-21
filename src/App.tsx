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
  companies,
  freeEmailDomains,
  type Company,
  formatMoney,
  formatNumber,
  founderOwnershipAfter,
  ownershipPercent,
  roundInvestorOwnership,
  rounds,
  scenarioRows,
  scenarioRowsFor,
  platformUsers,
  totalShares,
} from './data';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Page = 'home' | 'signin' | 'signup' | 'dashboard' | 'admin';
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
      admin: 'Admin',
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
      corporateOnly: 'Use your corporate email. Personal email domains are not accepted.',
      corporateError: 'Please use a corporate email address, not a personal email domain.',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      company: 'Company name',
      companyPlaceholder: 'Acme AI',
      create: 'Create workspace',
      signin: 'Sign in',
      sendCode: 'Send verification code',
      verifyTitle: 'Verify your identity',
      verifyText: 'We sent a multi-factor authentication code to your corporate email.',
      code: 'Verification code',
      codePlaceholder: 'Enter 6-digit code',
      verify: 'Verify and continue',
      codeHint: 'Prototype code: 246810',
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
      companies: 'Companies',
      addCompany: 'Add company',
      adminTitle: 'Admin review dashboard',
      adminSubtitle: 'Review every user, corporate email status, and the companies connected to each account.',
      users: 'Users',
      emailStatus: 'Email status',
      userCompanies: 'User companies',
      review: 'Review',
      approve: 'Approve',
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
      admin: 'المسؤول',
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
      corporateOnly: 'استخدم بريد الشركة فقط. لا تقبل عناوين البريد الشخصية.',
      corporateError: 'يرجى استخدام بريد شركة وليس نطاق بريد شخصي.',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      company: 'اسم الشركة',
      companyPlaceholder: 'Acme AI',
      create: 'إنشاء مساحة العمل',
      signin: 'تسجيل الدخول',
      sendCode: 'إرسال رمز التحقق',
      verifyTitle: 'تحقق من هويتك',
      verifyText: 'أرسلنا رمز تحقق متعدد العوامل إلى بريد الشركة.',
      code: 'رمز التحقق',
      codePlaceholder: 'أدخل الرمز من 6 أرقام',
      verify: 'تحقق وتابع',
      codeHint: 'رمز النموذج: 246810',
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
      companies: 'الشركات',
      addCompany: 'إضافة شركة',
      adminTitle: 'لوحة مراجعة المسؤول',
      adminSubtitle: 'راجع كل مستخدم وحالة بريد الشركة والشركات المرتبطة بكل حساب.',
      users: 'المستخدمون',
      emailStatus: 'حالة البريد',
      userCompanies: 'شركات المستخدم',
      review: 'مراجعة',
      approve: 'اعتماد',
    },
  },
} as const;

const routeToPage = (): Page => {
  const path = window.location.pathname;
  if (path.includes('signin')) return 'signin';
  if (path.includes('signup')) return 'signup';
  if (path.includes('admin')) return 'admin';
  if (path.includes('app')) return 'dashboard';
  return 'home';
};

const navigate = (page: Page) => {
  const path = page === 'home' ? '/' : page === 'dashboard' ? '/app' : `/${page}`;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

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
      {page === 'admin' && <AdminDashboard go={go} dark={dark} setDark={setDark} t={t} onLanguageToggle={toggleLanguage} />}
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
        <button className="ghost-button hide-mobile" onClick={() => go('admin')}>{t.nav.admin}</button>
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
  const [email, setEmail] = useState('');
  const [mfaSent, setMfaSent] = useState(false);
  const [code, setCode] = useState('');
  const emailDomain = email.split('@')[1]?.toLowerCase().trim() ?? '';
  const isCorporateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !freeEmailDomains.includes(emailDomain);
  const showCorporateError = email.length > 3 && !isCorporateEmail;
  const canSendCode = isCorporateEmail;
  const canVerify = code.trim().length >= 6;

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
          <p>{mfaSent ? t.auth.verifyText : mode === 'signup' ? t.auth.signupText : t.auth.signinText}</p>
          {!mfaSent ? (
            <>
              <div className="security-note"><ShieldCheck size={17} /> {t.auth.corporateOnly}</div>
              <label>
                <span>{t.auth.email}</span>
                <div className={showCorporateError ? 'input-wrap input-error' : 'input-wrap'}>
                  <Mail size={18} />
                  <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.auth.emailPlaceholder} />
                </div>
                {showCorporateError && <small className="form-error">{t.auth.corporateError}</small>}
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
              <button className="primary-button full" disabled={!canSendCode} onClick={() => setMfaSent(true)}>
                {t.auth.sendCode} <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <>
              <div className="mfa-box">
                <ShieldCheck size={22} />
                <div>
                  <strong>{t.auth.verifyTitle}</strong>
                  <span>{email}</span>
                </div>
              </div>
              <label>
                <span>{t.auth.code}</span>
                <div className="input-wrap"><Lock size={18} /><input value={code} onChange={(event) => setCode(event.target.value)} placeholder={t.auth.codePlaceholder} /></div>
                <small className="code-hint">{t.auth.codeHint}</small>
              </label>
              <button className="primary-button full" disabled={!canVerify} onClick={() => go('dashboard')}>
                {t.auth.verify} <ArrowRight size={18} />
              </button>
            </>
          )}
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
  const [activeCompanyId, setActiveCompanyId] = useState(companies[0].id);
  const activeCompany = companies.find((company) => company.id === activeCompanyId) ?? companies[0];
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(1);
  const selectedRound = activeCompany.rounds[selectedRoundIndex] ?? activeCompany.rounds[0];
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const sidebarItems: Array<[DashboardSection, ReactNode, string]> = [
    ['overview', <BarChart3 size={18} />, t.dashboard.nav[0]],
    ['shareholders', <Users size={18} />, t.dashboard.nav[1]],
    ['scenarios', <Layers3 size={18} />, t.dashboard.nav[2]],
    ['reports', <FileText size={18} />, t.dashboard.nav[3]],
    ['portal', <Globe2 size={18} />, t.dashboard.nav[4]],
  ];

  const selectCompany = (companyId: string) => {
    setActiveCompanyId(companyId);
    setSelectedRoundIndex(1);
    setActiveSection('overview');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <button className="brand" onClick={() => go('home')} aria-label={t.nav.home}>
          <span className="brand-mark">D</span>
          <span>Dilute</span>
        </button>
        <div className="company-tree">
          <div className="sidebar-label">
            <span>{t.dashboard.companies}</span>
            <button aria-label={t.dashboard.addCompany}><Plus size={15} /></button>
          </div>
          {companies.map((company) => (
            <div className={company.id === activeCompany.id ? 'company-node active' : 'company-node'} key={company.id}>
              <button
                className="company-button"
                onClick={() => selectCompany(company.id)}
              >
                <span>{company.name.charAt(0)}</span>
                <strong>{company.name}</strong>
                <small>{company.stage}</small>
              </button>
              {company.id === activeCompany.id && (
                <nav className="company-section-list" aria-label={`${company.name} sections`}>
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
              )}
            </div>
          ))}
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p>{t.dashboard.workspace}</p>
            <h1>{activeSection === 'overview' ? `${activeCompany.name} ${t.dashboard.sectionTitles.overview}` : `${activeCompany.name} · ${t.dashboard.sectionTitles[activeSection]}`}</h1>
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

        {activeSection === 'overview' && <OverviewSection company={activeCompany} selectedRound={selectedRound} selectedRoundIndex={selectedRoundIndex} setSelectedRoundIndex={setSelectedRoundIndex} t={t} />}
        {activeSection === 'shareholders' && <ShareholdersSection company={activeCompany} t={t} />}
        {activeSection === 'scenarios' && <ScenariosSection company={activeCompany} selectedRound={selectedRound} selectedRoundIndex={selectedRoundIndex} setSelectedRoundIndex={setSelectedRoundIndex} t={t} />}
        {activeSection === 'reports' && <ReportsSection company={activeCompany} t={t} />}
        {activeSection === 'portal' && <InvestorPortalSection company={activeCompany} t={t} />}
      </main>
    </div>
  );
}

function OverviewSection({
  company,
  selectedRound,
  selectedRoundIndex,
  setSelectedRoundIndex,
  t,
}: {
  company: Company;
  selectedRound: Company['rounds'][number];
  selectedRoundIndex: number;
  setSelectedRoundIndex: (index: number) => void;
  t: Copy;
}) {
  return (
    <>
      <section className="dashboard-grid">
        <Metric icon={<Users />} label={t.dashboard.totalShares} value={formatNumber(totalShares(company.stakeholders))} />
        <Metric icon={<CircleDollarSign />} label={t.dashboard.preMoney} value={formatMoney(selectedRound.preMoney)} />
        <Metric icon={<PieChart />} label={t.dashboard.investorOwnership} value={`${roundInvestorOwnership(selectedRound).toFixed(1)}%`} />
        <Metric icon={<Gauge />} label={t.dashboard.founderOwnership} value={`${Math.max(founderOwnershipAfter(selectedRound, company.stakeholders), 0).toFixed(1)}%`} />
      </section>

      <section className="workbench">
        <OwnershipCard company={company} t={t} />
        <RoundModelCard company={company} selectedRoundIndex={selectedRoundIndex} setSelectedRoundIndex={setSelectedRoundIndex} t={t} />
      </section>

      <section className="workbench">
        <RunwayCard company={company} t={t} />
        <ScenarioChartCard company={company} t={t} />
      </section>
    </>
  );
}

function OwnershipCard({ company, t }: { company: Company; t: Copy }) {
  const ownershipData = company.stakeholders.map((holder) => ({
    name: holder.name,
    value: Number(ownershipPercent(holder.shares, totalShares(company.stakeholders)).toFixed(1)),
    color: holder.color,
  }));

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
          {company.stakeholders.map((holder) => (
            <div key={holder.name}>
              <span style={{ background: holder.color }} />
              <strong>{holder.name}</strong>
              <small>{holder.role}</small>
              <em>{ownershipPercent(holder.shares, totalShares(company.stakeholders)).toFixed(1)}%</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoundModelCard({
  company,
  selectedRoundIndex,
  setSelectedRoundIndex,
  t,
}: {
  company: Company;
  selectedRoundIndex: number;
  setSelectedRoundIndex: (index: number) => void;
  t: Copy;
}) {
  const selectedRound = company.rounds[selectedRoundIndex] ?? company.rounds[0];

  return (
    <div className="workspace-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.roundModel}</p>
          <h2>{selectedRound.name}</h2>
        </div>
      </div>
      <div className="round-list">
        {company.rounds.map((round, index) => (
          <button className={round.name === selectedRound.name ? 'active' : ''} key={round.name} onClick={() => setSelectedRoundIndex(index)}>
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

function RunwayCard({ company, t }: { company: Company; t: Copy }) {
  return (
    <div className="workspace-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.runway}</p>
          <h2>{t.dashboard.cashAfterRaise}</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={company.runway}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis hide />
          <Tooltip />
          <Area type="monotone" dataKey="cash" stroke="#1d4ed8" fill="#bfdbfe" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ScenarioChartCard({ company, t }: { company: Company; t: Copy }) {
  const companyScenarioRows = scenarioRowsFor(company.stakeholders, company.rounds);

  return (
    <div className="workspace-card large-card">
      <div className="card-heading">
        <div>
          <p>{t.dashboard.comparison}</p>
          <h2>{t.dashboard.founderVsInvestor}</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={companyScenarioRows}>
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

function ShareholdersSection({ company, t }: { company: Company; t: Copy }) {
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
        {company.stakeholders.map((holder, index) => (
          <div className="table-row" key={holder.name}>
            <span className="person-cell"><i style={{ background: holder.color }} /> <strong>{holder.name}</strong><small>{holder.role}</small></span>
            <span>{formatNumber(holder.shares)}</span>
            <span>{ownershipPercent(holder.shares, totalShares(company.stakeholders)).toFixed(1)}%</span>
            <span>{index < 2 ? t.dashboard.common : index === 2 ? t.dashboard.preferred : t.dashboard.options}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScenariosSection({
  company,
  selectedRound,
  selectedRoundIndex,
  setSelectedRoundIndex,
  t,
}: {
  company: Company;
  selectedRound: Company['rounds'][number];
  selectedRoundIndex: number;
  setSelectedRoundIndex: (index: number) => void;
  t: Copy;
}) {
  return (
    <>
      <section className="scenario-summary">
        {company.rounds.map((round, index) => (
          <button className={index === selectedRoundIndex ? 'workspace-card active scenario-option' : 'workspace-card scenario-option'} key={round.name} onClick={() => setSelectedRoundIndex(index)}>
            <strong>{round.name}</strong>
            <span>{t.dashboard.valuation}: {formatMoney(round.preMoney)}</span>
            <span>{t.dashboard.investment}: {formatMoney(round.investment)}</span>
            <span>{t.dashboard.optionPool}: {round.optionPool}%</span>
          </button>
        ))}
      </section>
      <section className="workbench">
        <ScenarioChartCard company={company} t={t} />
        <div className="workspace-card">
          <div className="card-heading">
            <div>
              <p>{t.dashboard.roundModel}</p>
              <h2>{selectedRound.name}</h2>
            </div>
          </div>
          <div className="insight-list">
            <div><span>{t.dashboard.investorOwnership}</span><strong>{roundInvestorOwnership(selectedRound).toFixed(1)}%</strong></div>
            <div><span>{t.dashboard.foundersRetained}</span><strong>{Math.max(founderOwnershipAfter(selectedRound, company.stakeholders), 0).toFixed(1)}%</strong></div>
            <div><span>{t.dashboard.optionPool}</span><strong>{selectedRound.optionPool}%</strong></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportsSection({ company, t }: { company: Company; t: Copy }) {
  return (
    <section className="report-grid">
      {t.dashboard.reportItems.map((item, index) => (
        <article className="workspace-card report-card" key={item}>
          <FileText size={24} />
          <h2>{company.name} · {item}</h2>
          <p>{index === 1 ? t.dashboard.ready : t.dashboard.draft}</p>
          <button className={index === 1 ? 'primary-button' : 'secondary-button'}>
            {t.dashboard.generateReport}
          </button>
        </article>
      ))}
    </section>
  );
}

function InvestorPortalSection({ company, t }: { company: Company; t: Copy }) {
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
          <Metric icon={<Users />} label={t.dashboard.nav[1]} value={String(company.investorCount)} />
          <Metric icon={<Eye />} label={t.dashboard.lastViewed} value={company.portalViews} />
          <Metric icon={<FileText />} label={t.dashboard.nav[3]} value={String(company.reportCount)} />
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
          <div><span>{company.name} lead investor</span><strong>{t.dashboard.enabled}</strong></div>
          <div><span>{company.name} board observer</span><strong>{t.dashboard.enabled}</strong></div>
          <div><span>{company.name} diligence room</span><strong>{t.dashboard.draft}</strong></div>
        </div>
        <button className="primary-button full"><Plus size={16} /> {t.dashboard.inviteInvestor}</button>
      </div>
    </section>
  );
}

function AdminDashboard({
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
  const [selectedUserId, setSelectedUserId] = useState(platformUsers[0].id);
  const selectedUser = platformUsers.find((user) => user.id === selectedUserId) ?? platformUsers[0];
  const userCompanies = companies.filter((company) => selectedUser.companyIds.includes(company.id));
  const totalManagedCompanies = platformUsers.reduce((count, user) => count + user.companyIds.length, 0);

  return (
    <div className="dashboard admin-dashboard">
      <aside className="sidebar">
        <button className="brand" onClick={() => go('home')} aria-label={t.nav.home}>
          <span className="brand-mark">D</span>
          <span>Dilute</span>
        </button>
        <nav>
          <button className="active"><ShieldCheck size={18} /> {t.nav.admin}</button>
          <button onClick={() => go('dashboard')}><BarChart3 size={18} /> {t.dashboard.workspace}</button>
          <button onClick={() => go('home')}><Globe2 size={18} /> {t.nav.platform}</button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p>{t.nav.admin}</p>
            <h1>{t.dashboard.adminTitle}</h1>
          </div>
          <div className="dashboard-actions">
            <button className="language-button" onClick={onLanguageToggle}>
              <Globe2 size={16} />
              {t.nav.language}
            </button>
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label={t.nav.theme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <p className="admin-subtitle">{t.dashboard.adminSubtitle}</p>

        <section className="dashboard-grid">
          <Metric icon={<Users />} label={t.dashboard.users} value={String(platformUsers.length)} />
          <Metric icon={<Building2 />} label={t.dashboard.companies} value={String(companies.length)} />
          <Metric icon={<ShieldCheck />} label={t.dashboard.emailStatus} value="MFA" />
          <Metric icon={<FileText />} label={t.dashboard.userCompanies} value={String(totalManagedCompanies)} />
        </section>

        <section className="workbench admin-workbench">
          <div className="workspace-card large-card">
            <div className="card-heading">
              <div>
                <p>{t.dashboard.users}</p>
                <h2>{t.dashboard.emailStatus}</h2>
              </div>
            </div>
            <div className="data-table">
              <div className="table-row admin-user-row table-head">
                <span>{t.dashboard.users}</span>
                <span>{t.auth.email}</span>
                <span>{t.dashboard.status}</span>
                <span>{t.dashboard.userCompanies}</span>
              </div>
              {platformUsers.map((user) => (
                <button className={selectedUser.id === user.id ? 'table-row admin-user-row active' : 'table-row admin-user-row'} key={user.id} onClick={() => setSelectedUserId(user.id)}>
                  <span className="person-cell"><i /> <strong>{user.name}</strong><small>{user.role}</small></span>
                  <span>{user.email}</span>
                  <span>{user.status}</span>
                  <span>{user.companyIds.length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-heading">
              <div>
                <p>{selectedUser.email}</p>
                <h2>{selectedUser.name}</h2>
              </div>
              <span className="status-pill">{selectedUser.status}</span>
            </div>
            <div className="insight-list">
              {userCompanies.map((company) => (
                <div key={company.id}>
                  <span>{company.name}</span>
                  <strong>{company.stage}</strong>
                </div>
              ))}
            </div>
            <button className="primary-button full"><ShieldCheck size={16} /> {t.dashboard.approve}</button>
          </div>
        </section>

        <section className="workspace-card section-card">
          <div className="card-heading">
            <div>
              <p>{t.dashboard.companies}</p>
              <h2>{t.dashboard.review}</h2>
            </div>
          </div>
          <div className="data-table">
            <div className="table-row table-head">
              <span>{t.auth.company}</span>
              <span>{t.dashboard.status}</span>
              <span>{t.dashboard.users}</span>
              <span>{t.dashboard.review}</span>
            </div>
            {companies.map((company) => {
              const ownerCount = platformUsers.filter((user) => user.companyIds.includes(company.id)).length;
              return (
                <div className="table-row" key={company.id}>
                  <span className="person-cell"><i /> <strong>{company.name}</strong><small>{company.stage}</small></span>
                  <span>{company.portalViews === '1d' ? t.dashboard.draft : t.dashboard.ready}</span>
                  <span>{ownerCount}</span>
                  <span><button className="secondary-button">{t.dashboard.review}</button></span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
