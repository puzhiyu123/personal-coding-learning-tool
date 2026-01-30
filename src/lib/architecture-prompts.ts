export interface ArchitecturePrompt {
  id: string;
  title: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  thinkAbout: string[];
  suggestedApproach: {
    components: string[];
    dataModel: string;
    trickyParts: string[];
    codeSketch: {
      code: string;
      language: string;
      title: string;
    };
  };
  keyInsight: string;
}

export const architecturePrompts: ArchitecturePrompt[] = [
  {
    id: "bookmark-manager",
    title: "Bookmark manager with auto-tagging",
    category: "React UI",
    difficulty: "beginner",
    thinkAbout: [
      "How do you extract meaningful tags from a URL or page title automatically?",
      "Should tags be stored as a flat array or a normalized structure with IDs?",
      "How would you let users override or add to the auto-generated tags?",
    ],
    suggestedApproach: {
      components: [
        "BookmarkForm - input for URL with auto-tag preview",
        "BookmarkList - filterable list grouped by tags",
        "TagChip - reusable tag display with remove action",
        "TagFilter - sidebar or toolbar for filtering by tag",
      ],
      dataModel:
        "Each bookmark has an id, url, title, description, an array of Tag objects (id + label), a createdAt timestamp, and a favicon URL. Tags are derived from URL domain and path segments, then stored alongside user-added tags.",
      trickyParts: [
        "Deriving useful tags from a raw URL without a server-side scraper — you need heuristics like splitting the pathname and mapping known domains to categories.",
        "Deduplicating tags when the user adds one that matches an auto-generated tag in different casing.",
        "Persisting bookmarks in localStorage while keeping the tag index fast for filtering.",
      ],
      codeSketch: {
        code: `interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: Tag[];
  createdAt: number;
}

interface Tag {
  id: string;
  label: string;
  source: "auto" | "user";
}

function extractTags(url: string): Tag[] {
  const { hostname, pathname } = new URL(url);
  const domain = hostname.replace("www.", "").split(".")[0];
  const segments = pathname.split("/").filter(Boolean);

  return [domain, ...segments.slice(0, 2)].map((s) => ({
    id: crypto.randomUUID(),
    label: s.toLowerCase(),
    source: "auto" as const,
  }));
}`,
        language: "typescript",
        title: "Bookmark data model and auto-tag extraction",
      },
    },
    keyInsight:
      "Auto-tagging is really a data-extraction problem. The architecture win is separating the tag source ('auto' vs 'user') so you can regenerate auto-tags without losing manual ones.",
  },
  {
    id: "realtime-chat",
    title: "Real-time chat app",
    category: "Full-Stack",
    difficulty: "intermediate",
    thinkAbout: [
      "What transport do you use for real-time delivery — WebSockets, SSE, or polling — and what are the tradeoffs?",
      "How do you handle message ordering when two users send messages at nearly the same time?",
      "Where does the message history live — do you load it all on mount or paginate?",
      "How do you show 'user is typing' indicators without flooding the server?",
    ],
    suggestedApproach: {
      components: [
        "ChatRoom - manages the socket connection lifecycle and message state",
        "MessageList - virtualized list that auto-scrolls to the latest message",
        "MessageInput - textarea with typing-indicator debounce logic",
        "TypingIndicator - shows who is currently typing",
        "UserPresence - online/offline badge per user",
      ],
      dataModel:
        "A Message has id, roomId, senderId, content, a server-assigned timestamp, and a status enum (sending | sent | delivered | read). Rooms hold a list of participant IDs and a lastMessagePreview. Typing events are ephemeral and never persisted.",
      trickyParts: [
        "Optimistic UI — you display the message instantly on the sender's side, then reconcile with the server-assigned ID and timestamp.",
        "Reconnection — if the WebSocket drops, you need to fetch missed messages since the last known timestamp without duplicating existing ones.",
        "Throttling typing indicators to one event per second to avoid overwhelming the server.",
      ],
      codeSketch: {
        code: `type MessageStatus = "sending" | "sent" | "delivered" | "read";

interface Message {
  id: string;
  localId: string; // optimistic ID before server confirms
  roomId: string;
  senderId: string;
  content: string;
  timestamp: number;
  status: MessageStatus;
}

function useChatMessages(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const sendMessage = (content: string) => {
    const localMsg: Message = {
      id: "", localId: crypto.randomUUID(),
      roomId, senderId: "me", content,
      timestamp: Date.now(), status: "sending",
    };
    setMessages((prev) => [...prev, localMsg]);
    socketRef.current?.send(JSON.stringify(localMsg));
  };

  return { messages, sendMessage };
}`,
        language: "typescript",
        title: "Optimistic message sending with local ID reconciliation",
      },
    },
    keyInsight:
      "The core architectural challenge is optimistic updates plus reconciliation. Every message has two identities — a local ID for immediate display and a server ID for truth — and your state logic must merge them cleanly.",
  },
  {
    id: "ecommerce-product-page",
    title: "E-commerce product page",
    category: "React UI",
    difficulty: "beginner",
    thinkAbout: [
      "How do you model product variants (size, color) without an explosion of state combinations?",
      "What happens to the 'Add to Cart' button when a variant is out of stock?",
      "How should the image gallery sync with the selected variant?",
    ],
    suggestedApproach: {
      components: [
        "ProductPage - fetches product data and passes it down",
        "ImageGallery - carousel with thumbnail strip, syncs to selected variant",
        "VariantSelector - renders option groups (size, color) and tracks selection",
        "AddToCartButton - disabled/enabled based on stock, shows quantity picker",
        "PriceDisplay - reacts to variant selection to show correct price",
      ],
      dataModel:
        "A Product has id, title, description, and an array of Variants. Each Variant is a unique combination of options (e.g., size:M + color:blue) with its own price, stock count, SKU, and image URL. The selected variant is derived state from the user's option choices.",
      trickyParts: [
        "Deriving the selected variant from independent option selections — if the user picks 'Red' then 'Large', you need to find the variant matching both, not just the last pick.",
        "Disabling impossible combinations — if 'Red + XL' is out of stock, the XL option should appear disabled when Red is selected.",
      ],
      codeSketch: {
        code: `interface Variant {
  id: string;
  options: Record<string, string>; // { size: "M", color: "Red" }
  price: number;
  stock: number;
  imageUrl: string;
}

function useVariantSelection(variants: Variant[]) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const selectedVariant = variants.find((v) =>
    Object.entries(selections).every(
      ([key, val]) => v.options[key] === val
    )
  );

  const isOptionAvailable = (key: string, value: string) =>
    variants.some(
      (v) =>
        v.options[key] === value &&
        v.stock > 0 &&
        Object.entries(selections)
          .filter(([k]) => k !== key)
          .every(([k, val]) => v.options[k] === val)
    );

  return { selections, setSelections, selectedVariant, isOptionAvailable };
}`,
        language: "typescript",
        title: "Variant selection logic with availability checks",
      },
    },
    keyInsight:
      "The real complexity is not rendering — it is the combinatorial relationship between variants. Model variants as flat objects with an options map, then derive the selected variant from user choices instead of tracking a 'selectedVariantId' directly.",
  },
  {
    id: "dashboard-live-data",
    title: "Dashboard with live data",
    category: "Full-Stack",
    difficulty: "intermediate",
    thinkAbout: [
      "Should each widget poll independently or should a single connection push all updates?",
      "How do you avoid re-rendering the entire dashboard when one metric changes?",
      "What do you show while the initial data is loading versus when a live update fails?",
      "How do you handle stale data if the user switches tabs and comes back?",
    ],
    suggestedApproach: {
      components: [
        "DashboardShell - layout grid and shared data provider",
        "MetricCard - single KPI display with sparkline",
        "ChartWidget - configurable chart (line, bar) connected to a data stream",
        "DataProvider - context that manages SSE or polling and distributes updates",
        "ConnectionStatus - banner indicating live/stale/disconnected state",
      ],
      dataModel:
        "A DashboardConfig holds an array of WidgetConfigs, each with a widgetType, a dataSourceKey, and layout coordinates. A DataSource maps a key to an endpoint, a refresh interval, and a transform function. The runtime DataStore is a Record<string, { data: unknown; updatedAt: number; status: 'fresh' | 'stale' | 'error' }>.",
      trickyParts: [
        "Preventing cascade re-renders — each widget should subscribe only to its own data slice, not the entire store.",
        "Handling the tab-visibility API so you pause polling when hidden and fetch fresh data when the user returns.",
        "Gracefully degrading when a single data source errors without taking down the whole dashboard.",
      ],
      codeSketch: {
        code: `interface DataSlice<T = unknown> {
  data: T | null;
  updatedAt: number;
  status: "fresh" | "stale" | "error";
}

function useDataSource<T>(key: string, interval = 5000): DataSlice<T> {
  const [slice, setSlice] = useState<DataSlice<T>>({
    data: null, updatedAt: 0, status: "stale",
  });

  useEffect(() => {
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(\`/api/metrics/\${key}\`);
        const data = await res.json();
        if (active) setSlice({ data, updatedAt: Date.now(), status: "fresh" });
      } catch {
        if (active) setSlice((s) => ({ ...s, status: "error" }));
      }
    };
    poll();
    const id = setInterval(poll, interval);
    return () => { active = false; clearInterval(id); };
  }, [key, interval]);

  return slice;
}`,
        language: "typescript",
        title: "Per-widget polling hook with status tracking",
      },
    },
    keyInsight:
      "The key architectural decision is granularity of data subscriptions. One global store that every widget reads causes render storms. Instead, give each widget its own subscription hook so updates are isolated and you get fine-grained reactivity for free.",
  },
  {
    id: "multi-step-form",
    title: "Multi-step form wizard",
    category: "State Management",
    difficulty: "intermediate",
    thinkAbout: [
      "Where does the form state live — in each step locally, or in a shared store above all steps?",
      "How do you validate a step before allowing navigation to the next one?",
      "What happens if the user clicks the browser back button mid-wizard?",
    ],
    suggestedApproach: {
      components: [
        "FormWizard - orchestrator that tracks current step and accumulated data",
        "StepRenderer - dynamically renders the correct step component",
        "StepIndicator - progress breadcrumb showing completed, current, and upcoming steps",
        "NavigationButtons - Next/Back/Submit with validation gating",
      ],
      dataModel:
        "A WizardState holds the currentStepIndex, an array of StepDefinitions (each with an id, title, validation schema, and component reference), and a formData record that accumulates values from all steps. Each step writes to its own slice of formData on Next.",
      trickyParts: [
        "Keeping data from previous steps intact when the user navigates back — you must merge, not replace, the accumulated form data.",
        "Conditional steps — some wizards skip steps based on earlier answers, so the step list must be dynamic.",
        "Syncing wizard state with the URL so refresh does not lose progress, without leaking sensitive fields into the query string.",
      ],
      codeSketch: {
        code: `interface StepDef {
  id: string;
  title: string;
  validate: (data: Record<string, unknown>) => string[];
  component: React.ComponentType<StepProps>;
}

interface StepProps {
  data: Record<string, unknown>;
  onUpdate: (patch: Record<string, unknown>) => void;
}

function useWizard(steps: StepDef[]) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const currentStep = steps[stepIndex];
  const errors = currentStep.validate(formData);

  const next = () => {
    if (errors.length === 0 && stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    }
  };
  const back = () => setStepIndex((i) => Math.max(0, i - 1));
  const update = (patch: Record<string, unknown>) =>
    setFormData((prev) => ({ ...prev, ...patch }));

  return { stepIndex, currentStep, formData, errors, next, back, update };
}`,
        language: "typescript",
        title: "Wizard hook with validation gating and accumulated state",
      },
    },
    keyInsight:
      "The fundamental choice is lifting all form data above the steps. If each step owns its own state, navigating back and forth causes data loss. A single accumulated formData record with per-step validation is simpler and more reliable than distributed state.",
  },
  {
    id: "file-upload-progress",
    title: "File upload with progress",
    category: "Full-Stack",
    difficulty: "intermediate",
    thinkAbout: [
      "How do you report upload progress — XMLHttpRequest's progress events, or a fetch-based approach with streams?",
      "What happens if the user queues five files — do you upload in parallel or sequentially?",
      "How do you handle a failed upload mid-way — retry the whole file or support resumable uploads?",
    ],
    suggestedApproach: {
      components: [
        "FileDropzone - drag-and-drop area with click-to-browse fallback",
        "UploadQueue - manages the list of pending, active, and completed uploads",
        "UploadItem - single file row showing name, size, progress bar, and cancel button",
        "UploadManager - non-visual hook/service that coordinates XHR requests and concurrency",
      ],
      dataModel:
        "An UploadTask has id, file (File object), progress (0-100), status ('queued' | 'uploading' | 'success' | 'error'), and an optional errorMessage. The UploadManager keeps an array of UploadTasks and a concurrency limit (e.g., 2 simultaneous uploads).",
      trickyParts: [
        "You cannot get upload progress from the native fetch API — you need XMLHttpRequest or a wrapper that exposes the progress event.",
        "Cancellation requires keeping a reference to each XHR so you can call abort(), and you must clean up the UI state accordingly.",
        "Large files may need chunked uploads where each chunk is a separate request, adding retry logic per chunk.",
      ],
      codeSketch: {
        code: `type UploadStatus = "queued" | "uploading" | "success" | "error";

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  xhr?: XMLHttpRequest;
}

function uploadFile(
  task: UploadTask,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    task.xhr = xhr;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => (xhr.status < 400 ? resolve() : reject());
    xhr.onerror = () => reject(new Error("Network error"));

    const form = new FormData();
    form.append("file", task.file);
    xhr.open("POST", "/api/upload");
    xhr.send(form);
  });
}`,
        language: "typescript",
        title: "XHR-based upload with progress callback",
      },
    },
    keyInsight:
      "The architecture hinges on the fact that fetch cannot report upload progress. This single constraint forces you toward XMLHttpRequest and shapes the entire upload manager around keeping XHR references for progress and cancellation.",
  },
  {
    id: "notification-system",
    title: "Notification system",
    category: "Full-Stack",
    difficulty: "intermediate",
    thinkAbout: [
      "How do you distinguish between in-app toasts (ephemeral) and persistent notifications (stored in a list)?",
      "Should the notification store live in global state, a context, or a dedicated service?",
      "How do you handle notification preferences — can users mute certain categories?",
      "What is the delivery mechanism — polling, SSE, or WebSocket push?",
    ],
    suggestedApproach: {
      components: [
        "NotificationProvider - context that holds the notification queue and exposes push/dismiss actions",
        "ToastContainer - renders ephemeral toast notifications with auto-dismiss timers",
        "NotificationBell - icon with unread count badge, opens the notification panel",
        "NotificationPanel - dropdown list of persistent notifications with mark-as-read",
        "NotificationItem - single notification with icon, message, timestamp, and actions",
      ],
      dataModel:
        "A Notification has id, type ('info' | 'success' | 'warning' | 'error'), title, message, createdAt, readAt (nullable), a category string, and an optional actionUrl. Toasts are a subset that also carry a duration. The store separates the toast queue (ephemeral, max 3 visible) from the notification list (persistent, paginated).",
      trickyParts: [
        "Managing toast stacking — you need to limit visible toasts, queue overflow, and animate exits without layout jumps.",
        "Keeping the unread count in sync across tabs — if the user reads a notification in one tab, the badge should update in others.",
        "Deduplication — if the server pushes the same event twice (e.g., on reconnect), you must not show a duplicate toast.",
      ],
      codeSketch: {
        code: `interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  category: string;
  createdAt: number;
  readAt: number | null;
  actionUrl?: string;
}

interface NotificationStore {
  notifications: Notification[];
  toastQueue: Notification[];
  unreadCount: number;
}

function notificationReducer(
  state: NotificationStore,
  action:
    | { type: "PUSH"; payload: Notification }
    | { type: "DISMISS_TOAST"; id: string }
    | { type: "MARK_READ"; id: string }
): NotificationStore {
  switch (action.type) {
    case "PUSH":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        toastQueue: [...state.toastQueue, action.payload].slice(-3),
        unreadCount: state.unreadCount + 1,
      };
    case "MARK_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, readAt: Date.now() } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    default:
      return state;
  }
}`,
        language: "typescript",
        title: "Notification reducer with toast queue management",
      },
    },
    keyInsight:
      "The crucial architectural split is ephemeral vs. persistent. Toasts and stored notifications share a data shape but have completely different lifecycles. A single reducer that manages both queues gives you one source of truth while keeping the rendering logic separate.",
  },
  {
    id: "search-autocomplete",
    title: "Search with autocomplete",
    category: "React UI",
    difficulty: "intermediate",
    thinkAbout: [
      "How do you debounce keystrokes so you do not fire a request on every character?",
      "What happens when a slow response arrives after a fast one — how do you prevent stale results from overwriting fresh ones?",
      "How do you handle keyboard navigation (arrow keys, Enter, Escape) in the suggestion dropdown?",
    ],
    suggestedApproach: {
      components: [
        "SearchBar - the input field with debounced onChange",
        "SuggestionDropdown - positioned list of autocomplete results",
        "SuggestionItem - single row with highlight matching text",
        "useAutocomplete - custom hook managing query, results, loading, and selection state",
      ],
      dataModel:
        "The hook tracks the raw inputValue, a debouncedQuery, an array of Suggestion objects (id, label, category, optional icon), the activeIndex for keyboard navigation, and isOpen. A request counter or AbortController ensures only the latest request's response is used.",
      trickyParts: [
        "Race conditions — if the user types 'rea' then 'react', the response for 'rea' might arrive after 'react' and overwrite the correct results. Use an AbortController or a request sequence counter.",
        "Accessibility — the dropdown needs proper ARIA roles (listbox, option), aria-activedescendant for the highlighted item, and screen-reader announcements.",
        "Closing the dropdown at the right time — clicking a suggestion should select it, but clicking outside should close without selecting.",
      ],
      codeSketch: {
        code: `interface Suggestion {
  id: string;
  label: string;
  category: string;
}

function useAutocomplete(fetchSuggestions: (q: string) => Promise<Suggestion[]>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const timer = setTimeout(async () => {
      try {
        const data = await fetchSuggestions(query);
        if (!ctrl.signal.aborted) { setResults(data); setIsOpen(true); }
      } catch { /* aborted or network error */ }
    }, 300);

    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [query, fetchSuggestions]);

  return { query, setQuery, results, activeIndex, setActiveIndex, isOpen, setIsOpen };
}`,
        language: "typescript",
        title: "Autocomplete hook with debounce and abort control",
      },
    },
    keyInsight:
      "Autocomplete is fundamentally a race-condition problem disguised as a UI feature. The architecture must guarantee that only the latest request's response ever reaches the UI — everything else is secondary to that invariant.",
  },
  {
    id: "kanban-board",
    title: "Kanban board with drag-and-drop",
    category: "State Management",
    difficulty: "advanced",
    thinkAbout: [
      "How do you represent card ordering within and across columns — array index, a sort-order number, or a linked list?",
      "What state changes during a drag — do you optimistically move the card or wait for a drop?",
      "How do you persist reordering so the server and client stay in sync?",
      "What happens if two users drag cards at the same time in a shared board?",
    ],
    suggestedApproach: {
      components: [
        "KanbanBoard - top-level layout holding columns, manages drag context",
        "Column - droppable zone with a header (title, card count) and a card list",
        "Card - draggable item showing title, assignee, labels",
        "DragOverlay - the floating visual of the card being dragged",
        "useBoardState - hook encapsulating the column/card data and reorder logic",
      ],
      dataModel:
        "A Board has an ordered array of Column objects. Each Column has id, title, and an ordered array of Card IDs. Cards are stored in a normalized map (Record<string, Card>). Ordering uses a fractional index (e.g., LexoRank strings) so inserting between two cards does not require renumbering the entire list.",
      trickyParts: [
        "Drag between columns — you must remove the card from the source column's array and insert it at the correct index in the destination column, all in one state update to avoid flicker.",
        "Fractional ordering — using simple integers means every reorder shifts all subsequent items. LexoRank or similar fractional keys let you insert between two items without touching anything else.",
        "Optimistic reorder with rollback — you move the card immediately in the UI, fire an API call, and revert if it fails.",
      ],
      codeSketch: {
        code: `interface Card {
  id: string;
  title: string;
  columnId: string;
  order: string; // LexoRank fractional index
}

interface BoardState {
  columns: { id: string; title: string; cardIds: string[] }[];
  cards: Record<string, Card>;
}

function moveCard(
  state: BoardState,
  cardId: string,
  toColumnId: string,
  toIndex: number
): BoardState {
  const card = state.cards[cardId];
  const fromCol = state.columns.find((c) => c.cardIds.includes(cardId))!;
  const toCol = state.columns.find((c) => c.id === toColumnId)!;

  const updatedColumns = state.columns.map((col) => {
    if (col.id === fromCol.id) {
      return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
    }
    if (col.id === toCol.id) {
      const ids = col.id === fromCol.id
        ? col.cardIds.filter((id) => id !== cardId)
        : [...col.cardIds];
      ids.splice(toIndex, 0, cardId);
      return { ...col, cardIds: ids };
    }
    return col;
  });

  return { columns: updatedColumns, cards: { ...state.cards, [cardId]: { ...card, columnId: toColumnId } } };
}`,
        language: "typescript",
        title: "Immutable card move across columns",
      },
    },
    keyInsight:
      "The ordering strategy is the most impactful architectural choice. Array indices seem simple but cause O(n) updates on every drag. Fractional ordering (LexoRank) gives you O(1) inserts and makes server sync trivial — you only send the moved card's new rank.",
  },
  {
    id: "social-media-feed",
    title: "Social media feed with infinite scroll",
    category: "React UI",
    difficulty: "advanced",
    thinkAbout: [
      "How do you detect that the user has scrolled near the bottom — Intersection Observer or scroll event math?",
      "What happens to memory when the user scrolls through thousands of posts — do you virtualize or unmount old items?",
      "How do you handle new posts appearing at the top while the user is reading mid-feed?",
      "What is your caching strategy so navigating away and back does not refetch everything?",
    ],
    suggestedApproach: {
      components: [
        "Feed - manages the paginated post list and scroll listener",
        "PostCard - individual post with content, media, reactions, and comments preview",
        "InfiniteScrollSentinel - invisible element observed by IntersectionObserver to trigger next page",
        "NewPostsBanner - 'X new posts' banner at the top that does not push content down",
        "VirtualList - optional windowing wrapper for DOM performance at scale",
      ],
      dataModel:
        "Posts are fetched in cursor-based pages. Each page response includes an array of Post objects and a nextCursor string. The client accumulates pages into a flat array. Each Post has id, author, content, mediaUrls, likeCount, commentCount, and createdAt. A separate 'pending new posts' buffer holds items that arrived via real-time push but have not been merged into the visible feed yet.",
      trickyParts: [
        "Cursor-based pagination is essential — offset-based pagination breaks when new posts are inserted at the top, causing duplicates or skipped items.",
        "Virtualization vs. simplicity tradeoff — without virtualization, 500+ posts will degrade scrolling performance, but virtualizing adds complexity to scroll position restoration.",
        "Prepending new posts without scroll jank — you buffer them and let the user choose when to load them, preserving their reading position.",
      ],
      codeSketch: {
        code: `interface Page {
  posts: Post[];
  nextCursor: string | null;
}

function useInfiniteFeed() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cursor = pages.at(-1)?.nextCursor ?? null;

  const loadMore = async () => {
    if (isLoading || cursor === null) return;
    setIsLoading(true);
    const page = await fetchPosts(cursor);
    setPages((prev) => [...prev, page]);
    setIsLoading(false);
  };

  const posts = pages.flatMap((p) => p.posts);
  const hasMore = cursor !== null;

  return { posts, loadMore, hasMore, isLoading };
}

// Sentinel component triggers loadMore when it enters the viewport
function ScrollSentinel({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) onVisible();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onVisible]);
  return <div ref={ref} />;
}`,
        language: "typescript",
        title: "Cursor-based infinite feed with IntersectionObserver",
      },
    },
    keyInsight:
      "Cursor-based pagination is non-negotiable for feeds where new content appears at the top. The cursor is a pointer into an immutable timeline, so insertions never cause duplicates. This one data-fetching choice prevents an entire class of bugs.",
  },
  {
    id: "auth-flow",
    title: "Authentication flow",
    category: "Full-Stack",
    difficulty: "intermediate",
    thinkAbout: [
      "Where do you store the auth token — cookie, localStorage, or in-memory — and what are the security tradeoffs?",
      "How does your app know the user is still authenticated after a page refresh?",
      "How do you protect routes so unauthenticated users are redirected to login?",
    ],
    suggestedApproach: {
      components: [
        "AuthProvider - context that holds user state and exposes login/logout/refresh",
        "LoginPage - form that posts credentials and stores the returned token",
        "ProtectedRoute - wrapper that checks auth state and redirects if missing",
        "useAuth - hook for components to read user info and auth status",
        "TokenRefresher - silent background process that refreshes the access token before expiry",
      ],
      dataModel:
        "An AuthState holds the current User (id, email, name, role) or null, an accessToken string, a refreshToken string, an isLoading boolean (true during initial hydration), and an isAuthenticated derived boolean. Tokens are short-lived JWTs; the refresh token is stored in an httpOnly cookie for security.",
      trickyParts: [
        "The initial load race — on refresh, you must verify the token before rendering protected content, which means every protected page sees a loading state first.",
        "Token refresh timing — you can either refresh on a timer before expiry, or intercept 401 responses and refresh on demand. The interceptor approach handles clock skew better.",
        "Logout everywhere — revoking the refresh token server-side so other tabs/devices also lose access.",
      ],
      codeSketch: {
        code: `interface AuthState {
  user: { id: string; email: string; role: string } | null;
  isLoading: boolean;
}

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  useEffect(() => {
    // On mount, try to restore session from httpOnly cookie
    fetch("/api/auth/me").then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        setState({ user, isLoading: false });
      } else {
        setState({ user: null, isLoading: false });
      }
    });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const user = await res.json();
    setState({ user, isLoading: false });
  };

  const logout = () => {
    fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false });
  };

  return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
}`,
        language: "typescript",
        title: "Auth provider with session restoration on mount",
      },
    },
    keyInsight:
      "The hardest part of auth is not login — it is session restoration. Every page load starts in an 'unknown' auth state. Your architecture must treat isLoading as a first-class state and block protected content until verification completes, or users will see flashes of the wrong UI.",
  },
  {
    id: "blog-cms-markdown",
    title: "Blog CMS with markdown",
    category: "Full-Stack",
    difficulty: "advanced",
    thinkAbout: [
      "Do you render markdown on the server at publish time, on the client at read time, or both?",
      "How do you handle images inside markdown — inline base64, upload to a CDN, or reference by path?",
      "What is the content model — is a Post just a big markdown string, or structured blocks?",
      "How do you implement live preview without re-parsing the entire document on every keystroke?",
    ],
    suggestedApproach: {
      components: [
        "PostEditor - split-pane layout with markdown input and live HTML preview",
        "MarkdownRenderer - converts markdown to sanitized HTML using a parser like remark/rehype",
        "MetadataForm - title, slug, tags, publish date, SEO fields",
        "MediaUploader - drag-drop image upload that inserts a markdown image reference",
        "PostList - admin dashboard listing drafts and published posts",
      ],
      dataModel:
        "A Post has id, title, slug (unique, URL-safe), content (raw markdown), htmlContent (pre-rendered HTML for read performance), status ('draft' | 'published'), author, tags array, featuredImage URL, createdAt, updatedAt, and publishedAt. The slug is auto-generated from the title but editable.",
      trickyParts: [
        "Live preview performance — debounce the markdown-to-HTML conversion so it does not block typing. Consider running the parser in a Web Worker for large documents.",
        "Slug uniqueness — auto-generating from the title is convenient, but you must check for collisions and append a suffix if needed.",
        "XSS prevention — user-authored markdown can contain raw HTML. You must sanitize the rendered output to strip script tags and event handlers.",
      ],
      codeSketch: {
        code: `interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;       // raw markdown
  htmlContent: string;   // pre-rendered, sanitized HTML
  status: "draft" | "published";
  tags: string[];
  publishedAt: string | null;
}

function useMarkdownPreview(source: string) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      // remark + rehype pipeline (simplified)
      const { unified } = await import("unified");
      const remarkParse = (await import("remark-parse")).default;
      const remarkRehype = (await import("remark-rehype")).default;
      const rehypeSanitize = (await import("rehype-sanitize")).default;
      const rehypeStringify = (await import("rehype-stringify")).default;

      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(source);

      setHtml(String(result));
    }, 300);

    return () => clearTimeout(timer);
  }, [source]);

  return html;
}`,
        language: "typescript",
        title: "Debounced markdown-to-HTML pipeline with sanitization",
      },
    },
    keyInsight:
      "Store both raw markdown and pre-rendered HTML. Rendering markdown is surprisingly expensive with full plugin pipelines, so doing it once at save time means readers get instant HTML while editors get live preview. This dual-storage pattern is how every production CMS works.",
  },
  {
    id: "rest-api-todo",
    title: "REST API for a todo app",
    category: "API Design",
    difficulty: "beginner",
    thinkAbout: [
      "What are the correct HTTP methods for each operation — and when would you use PATCH vs PUT?",
      "How do you design the URL structure — nested resources (/users/:id/todos) or flat (/todos?userId=)?",
      "What should error responses look like — just a status code, or a structured error body?",
    ],
    suggestedApproach: {
      components: [
        "GET /api/todos - list with filtering (status, search) and pagination",
        "POST /api/todos - create a new todo, returns the created resource",
        "PATCH /api/todos/:id - partial update (e.g., toggle completed)",
        "DELETE /api/todos/:id - remove a todo, returns 204 No Content",
        "GET /api/todos/:id - single todo detail",
      ],
      dataModel:
        "A Todo has id (UUID), title (string, required, 1-200 chars), completed (boolean, default false), priority ('low' | 'medium' | 'high'), createdAt, and updatedAt timestamps. List responses use an envelope: { data: Todo[], meta: { total, page, perPage } }. Error responses use { error: { code, message, details? } }.",
      trickyParts: [
        "PATCH vs PUT semantics — PATCH sends only changed fields, PUT replaces the entire resource. Most UIs want PATCH, but many developers default to PUT incorrectly.",
        "Idempotency — DELETE and PUT should be idempotent (calling twice has the same effect), but POST is not. This matters for retry logic.",
        "Consistent error shapes — every error (validation, not found, server) should return the same JSON structure so the client has one error-handling path.",
      ],
      codeSketch: {
        code: `interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  data: T;
  meta?: { total: number; page: number; perPage: number };
}

interface ApiError {
  error: { code: string; message: string; details?: Record<string, string> };
}

// Next.js API route handler example
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const todo = await db.todo.findUnique({ where: { id: params.id } });

  if (!todo) {
    return Response.json(
      { error: { code: "NOT_FOUND", message: "Todo not found" } },
      { status: 404 }
    );
  }

  const updated = await db.todo.update({
    where: { id: params.id },
    data: { ...body, updatedAt: new Date().toISOString() },
  });

  return Response.json({ data: updated });
}`,
        language: "typescript",
        title: "PATCH handler with consistent error envelope",
      },
    },
    keyInsight:
      "Good API design is about contracts, not code. Define your response envelope (data + meta for success, error object for failures) before writing a single handler. When every endpoint returns the same shape, the client needs only one fetch wrapper instead of per-endpoint parsing logic.",
  },
  {
    id: "collaborative-editor",
    title: "Real-time collaborative editor",
    category: "Full-Stack",
    difficulty: "advanced",
    thinkAbout: [
      "How do two users editing the same paragraph simultaneously avoid overwriting each other's changes?",
      "What conflict resolution strategy do you use — Operational Transformation (OT), CRDTs, or last-write-wins?",
      "How do you show other users' cursors and selections in real time?",
      "What is the latency budget — can you afford a server roundtrip before showing the user's own edit?",
    ],
    suggestedApproach: {
      components: [
        "Editor - the text editing surface (could wrap a library like Tiptap, Slate, or CodeMirror)",
        "CollaborationProvider - manages the WebSocket connection and document sync",
        "CursorOverlay - renders remote users' cursor positions and selection highlights",
        "PresenceList - sidebar showing who is currently viewing the document",
        "VersionHistory - timeline of document snapshots for undo/rollback",
      ],
      dataModel:
        "The document is represented as a CRDT (e.g., Yjs Y.Doc) where each character has a unique ID and position in a tree structure. Operations are local-first: applied immediately to the local CRDT, then broadcast to peers. Each peer merges incoming operations into its local copy — CRDTs guarantee convergence without a central server ordering. Awareness state (cursor, selection, user info) is a separate ephemeral channel.",
      trickyParts: [
        "CRDTs solve conflict resolution but add significant payload overhead — a document's CRDT state can be 5-10x larger than the plain text. You need efficient encoding (e.g., Yjs uses a binary format).",
        "Cursor positions are invalidated by remote edits — if another user inserts text before your cursor, your cursor's character offset shifts. You must transform cursor positions using the same operations.",
        "Initial sync — when a new user joins, they need the full document state. Sending the entire CRDT history is expensive, so you use document snapshots plus a small tail of recent operations.",
      ],
      codeSketch: {
        code: `import * as Y from "yjs";

interface CollabState {
  doc: Y.Doc;
  provider: WebSocketProvider;
  awareness: Awareness;
}

function useCollaboration(docId: string): CollabState {
  const [state] = useState(() => {
    const doc = new Y.Doc();
    const provider = new WebSocketProvider(
      "wss://collab.example.com",
      docId,
      doc
    );
    return { doc, provider, awareness: provider.awareness };
  });

  useEffect(() => {
    // Set local user awareness (cursor, name, color)
    state.awareness.setLocalState({
      user: { name: "Alice", color: "#e06c75" },
      cursor: null,
    });

    return () => {
      state.provider.disconnect();
      state.doc.destroy();
    };
  }, [state]);

  return state;
}

// The Y.Doc text type is bound to your editor:
// const yText = doc.getText("content");
// editor.bind(yText);`,
        language: "typescript",
        title: "Yjs CRDT setup with awareness for cursor sharing",
      },
    },
    keyInsight:
      "Real-time collaboration is not a networking problem — it is a data structure problem. Choosing CRDTs (like Yjs) over manual conflict resolution means the document mathematically converges regardless of operation order. This eliminates an entire class of consistency bugs at the cost of learning a new data model.",
  },
  {
    id: "payment-checkout",
    title: "Payment checkout flow",
    category: "Full-Stack",
    difficulty: "advanced",
    thinkAbout: [
      "Where does sensitive payment data live — does it ever touch your server, or go directly to the payment provider?",
      "How do you handle the case where the payment succeeds but your server crashes before recording it?",
      "What state machine governs the checkout — and what are all the possible states beyond 'success' and 'failure'?",
      "How do you prevent double charges if the user clicks 'Pay' twice?",
    ],
    suggestedApproach: {
      components: [
        "CheckoutPage - orchestrates the multi-section form (address, shipping, payment)",
        "OrderSummary - live-updating cart total with tax and discount calculations",
        "PaymentForm - embeds the payment provider's secure iframe (e.g., Stripe Elements)",
        "CheckoutStateManager - state machine tracking idle > processing > confirming > success | error",
        "WebhookHandler - server-side endpoint that receives payment confirmation from the provider",
      ],
      dataModel:
        "An Order has id, status ('pending' | 'processing' | 'paid' | 'failed' | 'refunded'), lineItems array, shippingAddress, billingAddress, subtotal, tax, total, paymentIntentId (from provider), and timestamps. The paymentIntentId is created server-side before the client submits card details, ensuring the server always has a reference to reconcile against webhooks.",
      trickyParts: [
        "Idempotency for payments — create a unique paymentIntentId on the server before the user submits. If the client retries, it sends the same intent, and the provider deduplicates automatically.",
        "The webhook vs. client confirmation race — the payment provider confirms via webhook, but the client also gets a success callback. You must handle both, and the webhook is the source of truth because the client might close the tab.",
        "PCI compliance — card numbers must never touch your server. Use the provider's embedded UI components (Stripe Elements, Braintree Drop-in) so card data goes directly to them.",
      ],
      codeSketch: {
        code: `type CheckoutStatus = "idle" | "processing" | "confirming" | "success" | "error";

interface CheckoutState {
  status: CheckoutStatus;
  paymentIntentId: string | null;
  error: string | null;
}

async function handleCheckout(
  state: CheckoutState,
  setState: (s: CheckoutState) => void,
  stripe: Stripe,
  elements: StripeElements
) {
  // Prevent double submission
  if (state.status === "processing") return;
  setState({ ...state, status: "processing", error: null });

  // 1. Create intent on server (idempotent with order ID)
  const res = await fetch("/api/checkout/create-intent", { method: "POST" });
  const { clientSecret } = await res.json();

  // 2. Confirm with Stripe (card data never hits our server)
  setState({ ...state, status: "confirming", paymentIntentId: clientSecret });
  const { error } = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: { return_url: window.location.origin + "/checkout/result" },
  });

  if (error) {
    setState({ ...state, status: "error", error: error.message ?? "Payment failed" });
  }
  // Success is confirmed via redirect + webhook, not here
}`,
        language: "typescript",
        title: "Checkout flow with idempotent payment intent creation",
      },
    },
    keyInsight:
      "The cardinal rule of payment architecture is: never trust the client for confirmation. Create the payment intent on your server, let the provider's iframe collect card details, and treat the webhook as the only reliable signal that money moved. The client-side success callback is a UX convenience, not a source of truth.",
  },
];
