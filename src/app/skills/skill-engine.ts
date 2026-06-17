/* ─────────────────────────────────────────────────────────
   Skills Builder — generation engine.
   Ported verbatim from skills-builder-prototype.html.
   cleanProf / slugify / buildSkillMd / computeStrength keep
   their exact logic — do not change.
   ───────────────────────────────────────────────────────── */

export type Lang = "sv" | "en";

export type BuilderState = {
  use: number | null;
  profession: string;
  profChip: number | null;
  tasks: number[];
  tasksFree: string;
  tone: number | null;
  format: number | null;
  language: number | null;
  dislikes: number[];
  dislikesFree: string;
  likesFree: string;
  example: string;
};

export const initialState: BuilderState = {
  use: null,
  profession: "",
  profChip: null,
  tasks: [],
  tasksFree: "",
  tone: null,
  format: null,
  language: null,
  dislikes: [],
  dislikesFree: "",
  likesFree: "",
  example: "",
};

/* ───────────────────────── i18n ───────────────────────── */
type I18nBlock = {
  headerTitle: string;
  introLabel: string;
  introTitle: string;
  introLead: string;
  cmpWithoutH: string;
  cmpWithH: string;
  cmpQ: string;
  cmpWithout: string;
  cmpWith: string;
  ip1H: string;
  ip1: string;
  ip2H: string;
  ip2: string;
  ip3H: string;
  ip3: string;
  introCta: string;
  introNote: string;
  s1Label: string;
  s1Title: string;
  s1Sub: string;
  s1Field: string;
  s1Ph: string;
  s2Label: string;
  s2Title: string;
  s2Sub: string;
  s2Field: string;
  s2Ph: string;
  s3Label: string;
  s3Title: string;
  s3Sub: string;
  s3Tone: string;
  s3Format: string;
  s3Lang: string;
  s4Label: string;
  s4Title: string;
  s4Sub: string;
  s4Dislikes: string;
  s4DisPh: string;
  s4Likes: string;
  s4LikePh: string;
  s5Label: string;
  s5Title: string;
  s5Sub: string;
  s5Ph: string;
  s6Label: string;
  s6Title: string;
  s6Sub: string;
  s6Download: string;
  s6Copy: string;
  back: string;
  next: string;
  generate: string;
  optional: string;
  previewLabel: string;
  footerNote: string;
  copied: string;
  useChips: string[];
  profChips: string[];
  taskChips: string[];
  toneChips: string[];
  formatChips: string[];
  langChips: string[];
  dislikeChips: string[];
  md: {
    descJob: string;
    descPriv: string;
    whoAmI: string;
    whenUse: string;
    howWork: string;
    tone: string;
    format: string;
    lang: string;
    always: string;
    never: string;
    example: string;
    helpWith: string;
    useFor: string;
  };
  install: { ai: string; desktop: string; code: string };
};

export const I18N: Record<Lang, I18nBlock> = {
  sv: {
    headerTitle: "SKILLS BUILDER",
    introLabel: "SURPRISE SYSTEMS × CLAUDE SKILLS",
    introTitle:
      "Sluta förklara dig om och om igen.<br>Bygg en skill och få den bästa möjliga Claude-upplevelsen.",
    introLead:
      "En skill är en liten fil som lär Claude vem du är, ditt jobb, ditt språk, hur du vill ha dina svar. Du bygger den en gång på två minuter. Sedan vet Claude redan allt det där, i varje ny konversation, automatiskt.",
    cmpWithoutH: "Utan skill",
    cmpWithH: "Med din skill",
    cmpQ: "”Skriv ett svar till kunden om den försenade rapporten.”",
    cmpWithout:
      "”Hej! Tack för ditt meddelande! Jag förstår att detta kan vara frustrerande. Här är ett förslag på svar — säg till om du vill att jag justerar tonen!” …följt av ett mail som låter som en robot.<span class=\"verdict\">Generiskt. Fel ton. Du skriver om allt.</span>",
    cmpWith:
      "”Hej Anna, kvartalsrapporten landar hos dig på torsdag istället för imorgon — sista underlaget kom in sent. Säg till om torsdag ställer till det.”<span class=\"verdict\">Din ton. Ditt språk. Redo att skicka.</span>",
    ip1H: "Aktiveras av sig själv",
    ip1: "Du behöver inte starta eller komma ihåg något. Claude läser din skill automatiskt när den behövs.",
    ip2H: "Byggd på 2 minuter",
    ip2: "Sex enkla frågor — inget tekniskt. Filen skapas live medan du klickar.",
    ip3H: "Din fil, din kontroll",
    ip3: "Du laddar ner filen och äger den. Ändra när du vill, dela med kollegor.",
    introCta: "Bygg din skill — 2 minuter",
    introNote:
      "Gratis. Ingen registrering. Allt sker i din webbläsare — inget skickas någonstans.",
    s1Label: "KONTEXT",
    s1Title: "Vem bygger vi den här för?",
    s1Sub:
      "En skill blir bra när Claude vet vem du är. Välj användning och beskriv dig själv med en mening — inget tekniskt.",
    s1Field: "Beskriv dig själv eller din roll",
    s1Ph: "t.ex. Jag är redovisningskonsult på en mindre byrå…",
    s2Label: "ANVÄNDNING",
    s2Title: "Vad ska Claude hjälpa dig med?",
    s2Sub:
      "Välj allt som stämmer, eller skriv fritt. Det här blir skillens kärna — när den ska aktiveras och vad den ska kunna.",
    s2Field: "Eget — beskriv med egna ord",
    s2Ph: "t.ex. Skriva månadsrapporter till mina kunder och sammanfatta nya momsregler…",
    s3Label: "STIL",
    s3Title: "Hur vill du att svaren ska <em>kännas</em>?",
    s3Sub: "Det här är det folk oftast missar — och det som gör störst skillnad i vardagen.",
    s3Tone: "Tonalitet",
    s3Format: "Format",
    s3Lang: "Språk",
    s4Label: "PREFERENSER",
    s4Title: "Vad gillar du — och vad stör dig?",
    s4Sub: "Var ärlig. Det du skriver här blir regler som Claude alltid följer.",
    s4Dislikes: "Det här vill jag slippa",
    s4DisPh: "Annat som stör dig? Skriv fritt…",
    s4Likes: "Det här uppskattar jag",
    s4LikePh: "t.ex. Korta svar först, detaljer efteråt. Säg ifrån om jag tänker fel…",
    s5Label: "EXEMPEL",
    s5Title: "Har du ett exempel på bra output?",
    s5Sub:
      "Valfritt men kraftfullt. Klistra in en text du skrivit eller fått som känns helt rätt — Claude använder den som måttstock.",
    s5Ph: "Klistra in ett exempel — ett mail, en rapport, en text du gillar…",
    s6Label: "KLART",
    s6Title: "Din skill är <em>redo.</em>",
    s6Sub: "Ladda ner filen och installera den i Claude. Välj din produkt nedan för exakta steg.",
    s6Download: "Ladda ner SKILL.md",
    s6Copy: "Kopiera",
    back: "Tillbaka",
    next: "Nästa",
    generate: "Skapa min skill",
    optional: "Valfritt steg — hoppa över om du vill",
    previewLabel: "LIVE PREVIEW",
    footerNote: "SURPRISESYSTEMS.IO/SKILLS",
    copied: "Kopierad ✓",
    useChips: ["Jobbet", "Privat", "Både och"],
    profChips: [
      "Ekonom",
      "Jurist",
      "Marknadsförare",
      "Lärare",
      "Säljare",
      "Egenföretagare",
      "Student",
      "Förälder",
    ],
    taskChips: [
      "Skriva mail",
      "Rapporter & dokument",
      "Sammanfatta texter",
      "Analysera data",
      "Brainstorma idéer",
      "Översätta",
      "Planera projekt",
      "Lära mig nya saker",
      "Korrekturläsa",
      "Räkna & budget",
    ],
    toneChips: [
      "Direkt & effektiv",
      "Varm & personlig",
      "Formell & professionell",
      "Pedagogisk & tålmodig",
    ],
    formatChips: ["Korta svar", "Utförliga genomgångar", "Punktlistor", "Löpande text"],
    langChips: ["Svenska", "Engelska", "Blandat — följ mig"],
    dislikeChips: [
      "Inga emojis",
      "Ingen AI-jargong",
      "Inga onödiga motfrågor",
      "Inga långa inledningar",
      "Inga överdrivna brasklappar",
      "Ingen upprepning av min fråga",
    ],
    md: {
      descJob: "Personlig assistent för",
      descPriv: "Personlig assistent för privatbruk",
      whoAmI: "## Vem jag är",
      whenUse: "## När den här skillen används",
      howWork: "## Så här ska du arbeta",
      tone: "Tonalitet",
      format: "Format",
      lang: "Språk",
      always: "## Gör alltid",
      never: "## Undvik alltid",
      example: "## Exempel på output jag gillar",
      helpWith: "Hjälp mig med:",
      useFor: "Användning:",
    },
    install: {
      ai: "<ol><li>Gå till <code>claude.ai</code> → Inställningar → <b>Capabilities</b>.</li><li>Scrolla till <b>Skills</b> och klicka <b>Upload skill</b>.</li><li>Ladda upp din <code>SKILL.md</code> (zippa mappen om det efterfrågas).</li><li>Klart — Claude aktiverar skillen automatiskt när den behövs.</li></ol>",
      desktop:
        "<ol><li>Öppna Claude Desktop → Inställningar → <b>Capabilities</b>.</li><li>Under <b>Skills</b>, välj <b>Add skill</b> och peka på din fil.</li><li>Skillen syns nu i listan och används automatiskt i konversationer.</li></ol>",
      code: "<ol><li>Skapa mappen <code>~/.claude/skills/min-skill/</code></li><li>Lägg din fil där som <code>SKILL.md</code>.</li><li>Starta om Claude Code — skillen laddas automatiskt.</li></ol>",
    },
  },
  en: {
    headerTitle: "SKILLS BUILDER",
    introLabel: "SURPRISE SYSTEMS × CLAUDE SKILLS",
    introTitle:
      "Stop explaining yourself over and over.<br>Build a skill and get the best possible Claude experience.",
    introLead:
      "A skill is a small file that teaches Claude who you are, your job, your language, how you want your answers. You build it once, in two minutes. From then on, Claude already knows all of that, in every new conversation, automatically.",
    cmpWithoutH: "Without a skill",
    cmpWithH: "With your skill",
    cmpQ: "“Write a reply to the client about the delayed report.”",
    cmpWithout:
      "“Hi! Thanks for your message! I understand this can be frustrating. Here's a suggested reply — let me know if you'd like me to adjust the tone!” …followed by an email that sounds like a robot.<span class=\"verdict\">Generic. Wrong tone. You rewrite everything.</span>",
    cmpWith:
      "“Hi Anna, the quarterly report will reach you Thursday instead of tomorrow — the last figures came in late. Let me know if Thursday causes problems.”<span class=\"verdict\">Your tone. Your language. Ready to send.</span>",
    ip1H: "Activates on its own",
    ip1: "Nothing to launch or remember. Claude reads your skill automatically whenever it's relevant.",
    ip2H: "Built in 2 minutes",
    ip2: "Six simple questions — nothing technical. The file is created live as you click.",
    ip3H: "Your file, your control",
    ip3: "You download and own the file. Edit it anytime, share it with colleagues.",
    introCta: "Build your skill — 2 minutes",
    introNote:
      "Free. No sign-up. Everything happens in your browser — nothing is sent anywhere.",
    s1Label: "CONTEXT",
    s1Title: "Who are we building this for?",
    s1Sub:
      "A skill works when Claude knows who you are. Pick a use case and describe yourself in one sentence — nothing technical.",
    s1Field: "Describe yourself or your role",
    s1Ph: "e.g. I'm an accountant at a small firm…",
    s2Label: "USAGE",
    s2Title: "What should Claude help you with?",
    s2Sub:
      "Select everything that fits, or write freely. This becomes the core of your skill — when it activates and what it does.",
    s2Field: "Your own words",
    s2Ph: "e.g. Writing monthly client reports and summarizing new tax rules…",
    s3Label: "STYLE",
    s3Title: "How should the answers <em>feel</em>?",
    s3Sub: "This is what most people skip — and what makes the biggest difference day to day.",
    s3Tone: "Tone",
    s3Format: "Format",
    s3Lang: "Language",
    s4Label: "PREFERENCES",
    s4Title: "What do you like — and what annoys you?",
    s4Sub: "Be honest. What you write here becomes rules Claude always follows.",
    s4Dislikes: "Things I want to avoid",
    s4DisPh: "Anything else that bothers you? Write freely…",
    s4Likes: "Things I appreciate",
    s4LikePh: "e.g. Short answer first, details after. Push back if I'm wrong…",
    s5Label: "EXAMPLE",
    s5Title: "Got an example of great output?",
    s5Sub:
      "Optional but powerful. Paste a text you wrote or received that feels exactly right — Claude uses it as a benchmark.",
    s5Ph: "Paste an example — an email, a report, any text you like…",
    s6Label: "DONE",
    s6Title: "Your skill is <em>ready.</em>",
    s6Sub: "Download the file and install it in Claude. Pick your product below for exact steps.",
    s6Download: "Download SKILL.md",
    s6Copy: "Copy",
    back: "Back",
    next: "Next",
    generate: "Create my skill",
    optional: "Optional step — skip if you like",
    previewLabel: "LIVE PREVIEW",
    footerNote: "SURPRISESYSTEMS.IO/SKILLS",
    copied: "Copied ✓",
    useChips: ["Work", "Personal", "Both"],
    profChips: [
      "Accountant",
      "Lawyer",
      "Marketer",
      "Teacher",
      "Sales",
      "Founder",
      "Student",
      "Parent",
    ],
    taskChips: [
      "Writing emails",
      "Reports & documents",
      "Summarizing texts",
      "Analyzing data",
      "Brainstorming ideas",
      "Translating",
      "Planning projects",
      "Learning new things",
      "Proofreading",
      "Budgets & numbers",
    ],
    toneChips: [
      "Direct & efficient",
      "Warm & personal",
      "Formal & professional",
      "Patient & pedagogical",
    ],
    formatChips: ["Short answers", "Thorough walkthroughs", "Bullet points", "Prose"],
    langChips: ["Swedish", "English", "Mixed — follow my lead"],
    dislikeChips: [
      "No emojis",
      "No AI jargon",
      "No unnecessary questions",
      "No long preambles",
      "No excessive disclaimers",
      "Don't repeat my question",
    ],
    md: {
      descJob: "Personal assistant for",
      descPriv: "Personal assistant for private use",
      whoAmI: "## Who I am",
      whenUse: "## When to use this skill",
      howWork: "## How to work",
      tone: "Tone",
      format: "Format",
      lang: "Language",
      always: "## Always do",
      never: "## Always avoid",
      example: "## Example of output I like",
      helpWith: "Help me with:",
      useFor: "Usage:",
    },
    install: {
      ai: "<ol><li>Go to <code>claude.ai</code> → Settings → <b>Capabilities</b>.</li><li>Scroll to <b>Skills</b> and click <b>Upload skill</b>.</li><li>Upload your <code>SKILL.md</code> (zip the folder if prompted).</li><li>Done — Claude activates the skill automatically when relevant.</li></ol>",
      desktop:
        "<ol><li>Open Claude Desktop → Settings → <b>Capabilities</b>.</li><li>Under <b>Skills</b>, choose <b>Add skill</b> and point to your file.</li><li>The skill now appears in the list and is used automatically.</li></ol>",
      code: "<ol><li>Create the folder <code>~/.claude/skills/my-skill/</code></li><li>Place your file there as <code>SKILL.md</code>.</li><li>Restart Claude Code — the skill loads automatically.</li></ol>",
    },
  },
};

/* ─────────────────────────────────────────────────────────
   DIRECTIVES — Surprise Systems curated instruction library.
   ───────────────────────────────────────────────────────── */
type DirectiveBlock = {
  tone: string[][];
  format: string[][];
  language: string[];
  dislikes: string[];
  triggers: string[];
  descPattern: (prof: string, tasks: string[], trig: string[]) => string;
  benchmarkIntro: string;
  whyIntro: string;
  strengthLabel: string;
  levels: string[];
  hints: {
    context: string;
    tasks: string;
    style: string;
    rules: string;
    example: string;
    done: string;
  };
};

export const DIRECTIVES: Record<Lang, DirectiveBlock> = {
  sv: {
    tone: [
      [
        "Led med slutsatsen — svaret först, resonemanget efteråt.",
        "Hoppa över artighetsfraser, inledningar och sammanfattande avslut. Användaren vill spara tid, inte läsa uppvärmning.",
        "Skriv korta meningar. Stryk varje ord som inte tillför något.",
      ],
      [
        "Skriv som en kunnig kollega, inte som en manual — värmen sitter i språket, inte i utfyllnad.",
        "Bekräfta kort vad användaren försöker uppnå innan du löser uppgiften.",
        "Använd naturligt, mänskligt språk. Undvik stelt kanslispråk.",
      ],
      [
        "Håll genomgående samma ton som i extern affärskommunikation — texten ska kunna vidarebefordras utan redigering.",
        "Använd korrekt fackterminologi och skriv ut förkortningar första gången de används.",
        "Undvik slang, utfyllnadsord och vardagliga uttryck.",
      ],
      [
        "Förklara ett steg i taget och bygg från det enkla till det svåra — anta aldrig förkunskaper som inte bekräftats.",
        "Använd konkreta exempel och vardagsliknelser för abstrakta begrepp.",
        "Avsluta komplexa förklaringar med en mening som sammanfattar kärnan.",
      ],
    ],
    format: [
      [
        "Håll svaren korta som standard — några meningar räcker. Erbjud fördjupning i stället för att leverera den oombedd.",
      ],
      [
        "Ge kompletta, grundliga svar med bakgrund, resonemang och konsekvenser. Användaren föredrar ett helt svar framför tre korta.",
      ],
      [
        "Strukturera svar som punktlistor så fort innehållet har fler än två delar — det är så användaren skannar information.",
      ],
      ["Skriv i löpande prosa. Använd punktlistor bara när användaren uttryckligen ber om det."],
    ],
    language: [
      "Svara alltid på svenska, oavsett vilket språk källmaterialet har.",
      "Svara alltid på engelska.",
      "Matcha det språk användaren skriver på i varje enskilt meddelande.",
    ],
    dislikes: [
      "Använd aldrig emojis.",
      "Undvik typiska AI-formuleringar — ”det är viktigt att notera”, ”i dagens snabbrörliga värld” och liknande utfyllnad.",
      "Ställ motfrågor bara när något faktiskt är tvetydigt. Gör annars ett rimligt antagande och redovisa det kort.",
      "Börja direkt med svaret — ingen upprepning av frågan, ingen uppvärmning.",
      "Max en kort reservation när det verkligen behövs. Stapla aldrig disclaimers.",
      "Upprepa aldrig användarens fråga innan du svarar.",
    ],
    triggers: [
      "mail, mejl, kundsvar, utskick",
      "rapport, dokument, underlag, PM",
      "sammanfatta, summera, kortversion",
      "analysera, siffror, data, statistik",
      "idéer, brainstorm, förslag, uppslag",
      "översätt, översättning",
      "planera, tidplan, projekt, deadline",
      "förklara, lär mig, hur fungerar",
      "korrektur, språkgranska, rätta",
      "budget, kalkyl, kostnad, räkna",
    ],
    descPattern: (prof, tasks, trig) =>
      `${prof ? "Personlig assistent för " + prof.toLowerCase() : "Personlig assistent"}. ` +
      (tasks.length
        ? `Använd den här skillen när användaren vill ha hjälp med ${tasks
            .slice(0, 3)
            .join(", ")
            .toLowerCase()}` +
          (trig.length
            ? ` — eller nämner ${trig.slice(0, 2).join(", ")} — även när skillen inte efterfrågas uttryckligen.`
            : ".")
        : "Använd den här skillen i alla återkommande arbetsuppgifter."),
    benchmarkIntro:
      "Exemplet nedan visar nivån, tonen och strukturen användaren förväntar sig. Matcha stilen — kopiera aldrig innehållet.",
    whyIntro: "Reglerna nedan är inte preferenser — de är krav. Följ dem i varje svar.",
    strengthLabel: "SKILL STRENGTH",
    levels: ["BAS", "BRA", "STARK", "ELIT"],
    hints: {
      context: "Beskriv din roll i steg 1 — kontext är grunden för allt.",
      tasks: "Välj användningsområden i steg 2 — de styr när skillen aktiveras.",
      style: "Välj tonalitet och format i steg 3 — det gör störst skillnad i vardagen.",
      rules: "Fyll i vad du gillar och ogillar i steg 4 — det blir skillens hårda regler.",
      example: "Lägg till ett exempel i steg 5 — en måttstock höjer kvaliteten mest av allt.",
      done: "Komplett. Den här skillen har allt en högpresterande skill behöver.",
    },
  },
  en: {
    tone: [
      [
        "Lead with the conclusion — answer first, reasoning after.",
        "Skip pleasantries, preambles and summary outros. The user wants saved time, not warm-up.",
        "Write short sentences. Cut every word that adds nothing.",
      ],
      [
        "Write like a knowledgeable colleague, not a manual — warmth lives in the language, not in padding.",
        "Briefly acknowledge what the user is trying to achieve before solving the task.",
        "Use natural, human language. Avoid stiff corporate phrasing.",
      ],
      [
        "Maintain the register of external business communication — the text should be forwardable without editing.",
        "Use correct domain terminology and spell out abbreviations on first use.",
        "Avoid slang, filler words and casual expressions.",
      ],
      [
        "Explain one step at a time, building from simple to complex — never assume unconfirmed prior knowledge.",
        "Use concrete examples and everyday analogies for abstract concepts.",
        "End complex explanations with one sentence that captures the core.",
      ],
    ],
    format: [
      [
        "Keep answers short by default — a few sentences is enough. Offer depth instead of delivering it unasked.",
      ],
      [
        "Give complete, thorough answers with background, reasoning and implications. The user prefers one full answer over three short ones.",
      ],
      [
        "Structure answers as bullet points whenever content has more than two parts — that's how the user scans information.",
      ],
      ["Write in flowing prose. Use bullet points only when explicitly requested."],
    ],
    language: [
      "Always respond in Swedish, regardless of the source material's language.",
      "Always respond in English.",
      "Match the language the user writes in, message by message.",
    ],
    dislikes: [
      "Never use emojis.",
      "Avoid typical AI phrasing — “it's important to note”, “in today's fast-paced world” and similar filler.",
      "Only ask clarifying questions when something is genuinely ambiguous. Otherwise make a reasonable assumption and state it briefly.",
      "Start directly with the answer — no restating the question, no warm-up.",
      "At most one brief caveat when truly needed. Never stack disclaimers.",
      "Never repeat the user's question before answering.",
    ],
    triggers: [
      "email, reply, client response, outreach",
      "report, document, brief, memo",
      "summarize, recap, short version",
      "analyze, numbers, data, statistics",
      "ideas, brainstorm, suggestions, angles",
      "translate, translation",
      "plan, timeline, project, deadline",
      "explain, teach me, how does",
      "proofread, language check, correct",
      "budget, calculation, cost, estimate",
    ],
    descPattern: (prof, tasks, trig) =>
      `${prof ? "Personal assistant for " + prof.toLowerCase() : "Personal assistant"}. ` +
      (tasks.length
        ? `Use this skill whenever the user wants help with ${tasks
            .slice(0, 3)
            .join(", ")
            .toLowerCase()}` +
          (trig.length
            ? ` — or mentions ${trig.slice(0, 2).join(", ")} — even when the skill isn't explicitly requested.`
            : ".")
        : "Use this skill for all recurring tasks."),
    benchmarkIntro:
      "The example below shows the level, tone and structure the user expects. Match the style — never copy the content.",
    whyIntro: "The rules below are not preferences — they are requirements. Follow them in every response.",
    strengthLabel: "SKILL STRENGTH",
    levels: ["BASE", "GOOD", "STRONG", "ELITE"],
    hints: {
      context: "Describe your role in step 1 — context is the foundation.",
      tasks: "Pick use cases in step 2 — they control when the skill activates.",
      style: "Pick tone and format in step 3 — the biggest day-to-day difference.",
      rules: "Fill in likes and dislikes in step 4 — they become the skill's hard rules.",
      example: "Add an example in step 5 — a benchmark raises quality more than anything.",
      done: "Complete. This skill has everything a high-performing skill needs.",
    },
  },
};

/* ───────────────────────── Skill generation ───────────────────────── */
export function cleanProf(s: string): string {
  /* Strip first-person lead-ins so descriptions read naturally:
     "Jag är redovisningskonsult på..." → "redovisningskonsult på..." */
  return (s || "")
    .trim()
    .replace(/^(jag är|jag jobbar som|jag arbetar som|jag driver|i'?m|i am|i work as)\s+/i, "")
    .replace(/^(en|ett|a|an)\s+/i, "")
    .replace(/[.!]+$/, "");
}

export function slugify(s: string): string {
  const words = cleanProf(s)
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 3);
  return words.join("-").replace(/^-+|-+$/g, "") || "min-skill";
}

export function buildSkillMd(state: BuilderState, lang: Lang): string {
  const t = I18N[lang],
    m = t.md,
    D = DIRECTIVES[lang];
  const prof =
    state.profession.trim() || (state.profChip !== null ? t.profChips[state.profChip] : "");
  const taskLabels = state.tasks.map((i) => t.taskChips[i]);
  const trig = state.tasks.map((i) => D.triggers[i]);
  const allTasks = [...taskLabels];
  if (state.tasksFree.trim()) allTasks.push(state.tasksFree.trim());

  const name = slugify(prof ? prof.split(/[,.]/)[0] : "");

  /* Pushy, trigger-rich description — the primary activation mechanism */
  const desc = D.descPattern(cleanProf(prof), allTasks, trig).replace(/\s+/g, " ").trim();

  let out = `---\nname: ${name}\ndescription: ${desc}\n---\n\n`;

  if (prof || state.use !== null) {
    out += `${m.whoAmI}\n\n`;
    if (prof) out += `${prof}.\n`;
    if (state.use !== null) out += `${m.useFor} ${t.useChips[state.use]}.\n`;
    out += `\n`;
  }

  if (allTasks.length) {
    out += `${m.whenUse}\n\n${m.helpWith}\n`;
    allTasks.forEach((x, i) => {
      out += `- ${x}`;
      if (i < trig.length && trig[i]) out += ` (${trig[i]})`;
      out += `\n`;
    });
    out += `\n`;
  }

  /* Expanded imperative directives — the SS quality layer */
  const directives: string[] = [];
  if (state.tone !== null) directives.push(...D.tone[state.tone]);
  if (state.format !== null) directives.push(...D.format[state.format]);
  if (state.language !== null) directives.push(D.language[state.language]);
  if (directives.length) {
    out += `${m.howWork}\n\n`;
    directives.forEach((x) => (out += `- ${x}\n`));
    out += `\n`;
  }

  if (state.likesFree.trim()) {
    out += `${m.always}\n\n`;
    state.likesFree
      .trim()
      .split(/\n+/)
      .forEach((x) => (out += `- ${x.trim()}\n`));
    out += `\n`;
  }

  if (state.dislikes.length || state.dislikesFree.trim()) {
    out += `${m.never}\n\n${D.whyIntro}\n\n`;
    state.dislikes.forEach((i) => (out += `- ${D.dislikes[i]}\n`));
    if (state.dislikesFree.trim())
      state.dislikesFree
        .trim()
        .split(/\n+/)
        .forEach((x) => (out += `- ${x.trim()}\n`));
    out += `\n`;
  }

  if (state.example.trim()) {
    out += `${m.example}\n\n${D.benchmarkIntro}\n\n> ${state.example
      .trim()
      .replace(/\n/g, "\n> ")}\n`;
  }
  return out.trimEnd() + "\n";
}

/* ───────────────────────── Skill strength ───────────────────────── */
export function computeStrength(
  state: BuilderState,
  lang: Lang
): { score: number; level: number; hint: string } {
  const D = DIRECTIVES[lang];
  let score = 0;
  const missing: string[] = [];
  const hasContext = state.profession.trim() || state.profChip !== null;
  const hasTasks = state.tasks.length || state.tasksFree.trim();
  const hasStyle = state.tone !== null && state.format !== null;
  const hasRules = state.dislikes.length || state.dislikesFree.trim() || state.likesFree.trim();
  const hasExample = state.example.trim().length > 40;

  if (state.use !== null) score += 5;
  if (hasContext) score += 15;
  else missing.push(D.hints.context);
  if (hasTasks) score += 20;
  else missing.push(D.hints.tasks);
  if (hasStyle) score += 20;
  else missing.push(D.hints.style);
  if (state.language !== null) score += 5;
  if (hasRules) score += 15;
  else missing.push(D.hints.rules);
  if (hasExample) score += 20;
  else missing.push(D.hints.example);

  const level = score >= 90 ? 3 : score >= 70 ? 2 : score >= 40 ? 1 : 0;
  return { score, level, hint: missing.length ? missing[0] : D.hints.done };
}

/* Slug used for filename + preview label */
export function currentSlug(state: BuilderState, lang: Lang): string {
  const t = I18N[lang];
  const prof =
    state.profession.trim() || (state.profChip !== null ? t.profChips[state.profChip] : "");
  return slugify(prof ? prof.split(/[,.]/)[0] : "");
}
