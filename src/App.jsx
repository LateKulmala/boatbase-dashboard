import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xzzptcztfcoolwyiudja.supabase.co",
  "sb_publishable_xK_coX_CaU1eQkDj63d0bw_o6jdbTkF"
);

const PASSWORD = "boatbase2026";

const agents = [
  { name: "JARVIS", role: "Keskusaivot", status: "online", color: "#00ff88" },
  { name: "SCOUT", role: "Markkinatutkimus", status: "building", color: "#00ccff" },
  { name: "HUNTER", role: "Partnerihankinta", status: "online", color: "#ff9900" },
  { name: "WRITER", role: "Sisallontuotanto", status: "online", color: "#cc44ff" },
  { name: "REPORTER", role: "Uutisartikkelit", status: "building", color: "#ff44aa" },
  { name: "GUARDIAN", role: "Monitorointi", status: "online", color: "#00ff88" },
  { name: "HERMES", role: "Asiakaspalvelu", status: "online", color: "#00ccff" },
  { name: "SHIELD", role: "Tietoturva", status: "online", color: "#ffcc00" },
  { name: "NURTURE", role: "Prospekti-seuranta", status: "online", color: "#ff6688" },
  { name: "CLOSER", role: "Huutokaupat", status: "online", color: "#22ddaa" },
  { name: "MATCHMAKER", role: "Sailytystarjoukset", status: "online", color: "#aa88ff" },
  { name: "ANALYST", role: "Paivaraportti", status: "online", color: "#ffaa33" },
  { name: "CONCIERGE", role: "Tervetulomailit", status: "online", color: "#33ccaa" },
  { name: "SKIPPER", role: "Vakuutusmuistutukset", status: "online", color: "#ff8844" },
  { name: "REVIEW-REQUESTER", role: "Arvostelupyynnot", status: "online", color: "#cccc44" },
  { name: "NEWSLETTER", role: "Viikkokooste", status: "online", color: "#44bbdd" },
  { name: "SELLER NUDGE", role: "Myyjamuistutukset", status: "online", color: "#ffbb55" },
  { name: "SOCIAL", role: "Somemanageri", status: "building", color: "#ffcc00" },
];

const agentColors = {
  JARVIS: "#00ff88",
  SCOUT: "#00ccff",
  HUNTER: "#ff9900",
  WRITER: "#cc44ff",
  REPORTER: "#ff44aa",
  GUARDIAN: "#00ff88",
  HERMES: "#00ccff",
  SHIELD: "#ffcc00",
  NURTURE: "#ff6688",
  CLOSER: "#22ddaa",
  MATCHMAKER: "#aa88ff",
  ANALYST: "#ffaa33",
  CONCIERGE: "#33ccaa",
  SKIPPER: "#ff8844",
  "REVIEW-REQUESTER": "#cccc44",
  NEWSLETTER: "#44bbdd",
  "SELLER NUDGE": "#ffbb55",
  SOCIAL: "#ffcc00",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (loggedIn) {
      fetchData();
      const refreshTimer = setInterval(fetchData, 30000);
      const clockTimer = setInterval(() => setTime(new Date()), 1000);
      return () => {
        clearInterval(refreshTimer);
        clearInterval(clockTimer);
      };
    }
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [loggedIn]);

  async function fetchData() {
    const { data: arts } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: conts } = await supabase
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: msgs } = await supabase
      .from("pending_responses")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: social } = await supabase
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    const { data: logsData } = await supabase
      .from("agent_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setArticles(arts || []);
    setContacts(conts || []);
    setMessages(msgs || []);
    setSocialPosts(social || []);
    setLogs(logsData || []);
    setLoading(false);
  }

  function handleLogin() {
    if (password === PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Vaara salasana!");
    }
  }

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentErrors = logs.filter(
    (l) => l.status === "error" && new Date(l.created_at) > oneDayAgo
  );

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050d1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          padding: "16px",
        }}
      >
        <div
          style={{
            background: "#0a1a2e",
            border: "1px solid #00ccff33",
            borderRadius: "12px",
            padding: "40px",
            width: "100%",
            maxWidth: "320px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#00ccff",
              letterSpacing: "4px",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            JARVIS
          </h1>
          <p
            style={{
              color: "#4488aa",
              fontSize: "12px",
              letterSpacing: "2px",
              marginBottom: "32px",
            }}
          >
            BOATBASE COMMAND CENTER
          </p>
          <input
            type="password"
            placeholder="Salasana..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "12px",
              background: "#050d1a",
              border: "1px solid #00ccff44",
              borderRadius: "6px",
              color: "#e0f0ff",
              fontFamily: "monospace",
              fontSize: "14px",
              marginBottom: "12px",
              boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ color: "#ff4444", fontSize: "12px", marginBottom: "12px" }}>
              {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              background: "#00ccff22",
              border: "1px solid #00ccff",
              borderRadius: "6px",
              color: "#00ccff",
              fontFamily: "monospace",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "2px",
            }}
          >
            KIRJAUDU
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "ARTIKKELIT", value: articles.length, color: "#cc44ff" },
    { label: "PARTNERIT", value: contacts.length, color: "#ff9900" },
    { label: "ASIAKASVIESTIT", value: messages.length, color: "#00ccff" },
    {
      label: "VIRHEET 24H",
      value: recentErrors.length,
      color: recentErrors.length > 0 ? "#ff4444" : "#00ff88",
    },
  ];

  const tabs = [
    { id: "overview", label: "ARTIKKELIT" },
    { id: "contacts", label: "CRM" },
    { id: "messages", label: "ASIAKASPALVELU" },
    { id: "social", label: "SOME" },
    { id: "logs", label: "LOKIT" },
    { id: "chat", label: "JARVIS CHAT" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050d1a",
        color: "#e0f0ff",
        fontFamily: "monospace",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          borderBottom: "1px solid #0a2a4a",
          paddingBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              color: "#00ccff",
              letterSpacing: "4px",
            }}
          >
            BOATBASE J.A.R.V.I.S.
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "11px",
              color: "#4488aa",
              letterSpacing: "2px",
            }}
          >
            JUST A RATHER VERY INTELLIGENT SYSTEM
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{ fontSize: "22px", color: "#00ff88", letterSpacing: "2px" }}
          >
            {time.toLocaleTimeString("fi-FI")}
          </div>
          <div style={{ fontSize: "11px", color: "#4488aa" }}>
            {time.toLocaleDateString("fi-FI", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            style={{
              marginTop: "4px",
              background: "none",
              border: "1px solid #ff444444",
              borderRadius: "4px",
              color: "#ff4444",
              fontSize: "10px",
              padding: "2px 8px",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            KIRJAUDU ULOS
          </button>
        </div>
      </div>

      {recentErrors.length > 0 && (
        <div
          onClick={() => setActiveTab("logs")}
          style={{
            background: "#ff444411",
            border: "1px solid #ff4444",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                color: "#ff4444",
                fontSize: "13px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              HUOMIO: {recentErrors.length} VIRHETTA VIIMEISEN 24H AIKANA
            </div>
            <div style={{ color: "#aa6666", fontSize: "11px", marginTop: "4px" }}>
              Klikkaa nahdaksesi lokit
            </div>
          </div>
          <div style={{ color: "#ff4444", fontSize: "20px" }}>{">"}</div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#0a1a2e",
              border: "1px solid " + stat.color + "33",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: stat.color,
              }}
            >
              {loading ? "..." : stat.value}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#4488aa",
                letterSpacing: "1px",
                marginTop: "4px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            color: "#00ccff",
            fontSize: "13px",
            letterSpacing: "3px",
            marginBottom: "12px",
          }}
        >
          AGENTTIJARJESTELMA
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px",
          }}
        >
          {agents.map((agent) => (
            <div
              key={agent.name}
              style={{
                background: "#0a1a2e",
                border: "1px solid " + agent.color + "44",
                borderRadius: "8px",
                padding: "12px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: agent.color,
                }}
              ></div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: agent.color,
                }}
              >
                {agent.name}
              </div>
              <div style={{ fontSize: "10px", color: "#4488aa" }}>{agent.role}</div>
              <div
                style={{
                  fontSize: "9px",
                  marginTop: "6px",
                  color: agent.status === "online" ? "#00ff88" : "#ffcc00",
                }}
              >
                {agent.status === "online" ? "LIVE" : "RAKENNETAAN"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              background: activeTab === tab.id ? "#00ccff22" : "#0a1a2e",
              border:
                "1px solid " + (activeTab === tab.id ? "#00ccff" : "#0a2a4a"),
              borderRadius: "6px",
              color: activeTab === tab.id ? "#00ccff" : "#4488aa",
              fontFamily: "monospace",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #cc44ff33",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ladataan...
            </div>
          ) : (
            articles.slice(0, 10).map((article, i) => (
              <div
                key={article.id}
                style={{
                  padding: "12px 16px",
                  borderBottom: i < 9 ? "1px solid #0a2a4a" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", color: "#e0f0ff" }}>
                    {article.title && article.title.substring(0, 60)}...
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#4488aa",
                      marginTop: "2px",
                    }}
                  >
                    {article.category} - {article.read_minutes} min
                  </div>
                </div>
                <div style={{ fontSize: "10px", color: "#cc44ff" }}>
                  {new Date(article.created_at).toLocaleDateString("fi-FI")}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "contacts" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #ff990033",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ladataan...
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ei kontakteja - HUNTER ajaa klo 10:15 ja 14:20
            </div>
          ) : (
            contacts.map((contact, i) => (
              <div
                key={contact.id}
                style={{
                  padding: "12px 16px",
                  borderBottom:
                    i < contacts.length - 1 ? "1px solid #0a2a4a" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", color: "#e0f0ff" }}>
                    {contact.yritys || "—"}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#4488aa",
                      marginTop: "2px",
                    }}
                  >
                    {contact.email} - {contact.tyyppi} - {contact.sijainti}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: "#ff990022",
                    color: "#ff9900",
                  }}
                >
                  {contact.status}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "messages" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #00ccff33",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ladataan...
            </div>
          ) : messages.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ei asiakasviesteja viela
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={msg.id}
                style={{
                  padding: "16px",
                  borderBottom:
                    i < messages.length - 1 ? "1px solid #0a2a4a" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#00ccff" }}>
                    {msg.from_email}
                  </div>
                  <div style={{ fontSize: "10px", color: "#4488aa" }}>
                    {new Date(msg.created_at).toLocaleDateString("fi-FI")}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#e0f0ff",
                    marginBottom: "4px",
                  }}
                >
                  {msg.subject}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#4488aa",
                    marginBottom: "8px",
                  }}
                >
                  {msg.message && msg.message.substring(0, 100)}...
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#00ff88",
                    background: "#00ff8811",
                    padding: "8px",
                    borderRadius: "4px",
                    borderLeft: "2px solid #00ff88",
                  }}
                >
                  {msg.draft && msg.draft.substring(0, 150)}...
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#4488aa",
                    marginTop: "6px",
                  }}
                >
                  Status: {msg.status}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "social" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #44bbdd33",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ladataan...
            </div>
          ) : socialPosts.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ei some-postauksia viela - SOCIAL luo niita ja lahettaa Telegramiin hyvaksyttavaksi
            </div>
          ) : (
            socialPosts.map((post, i) => {
              const statusColor =
                post.status === "published"
                  ? "#00ff88"
                  : post.status === "approved"
                  ? "#00ccff"
                  : post.status === "rejected"
                  ? "#ff4444"
                  : post.status === "failed"
                  ? "#ff8844"
                  : "#ffcc00";
              return (
                <div
                  key={post.id}
                  style={{
                    padding: "12px 16px",
                    borderBottom:
                      i < socialPosts.length - 1 ? "1px solid #0a2a4a" : "none",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt=""
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        flexShrink: 0,
                        border: "1px solid #0a2a4a",
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#e0f0ff",
                        marginBottom: "4px",
                      }}
                    >
                      {post.caption && post.caption.substring(0, 140)}
                      {post.caption && post.caption.length > 140 ? "..." : ""}
                    </div>
                    <div style={{ fontSize: "10px", color: "#4488aa" }}>
                      {(post.platform || "").toUpperCase()} · {post.post_type} ·{" "}
                      {new Date(post.created_at).toLocaleDateString("fi-FI")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: statusColor + "22",
                      color: statusColor,
                      minWidth: "70px",
                      textAlign: "center",
                    }}
                  >
                    {post.status}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "logs" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #00ccff33",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ladataan...
            </div>
          ) : logs.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
              Ei lokeja viela - agentit kirjaavat tanne suoritukset ja virheet
            </div>
          ) : (
            logs.map((log, i) => {
              const statusColor =
                log.status === "error"
                  ? "#ff4444"
                  : log.status === "running"
                  ? "#ffcc00"
                  : "#00ff88";
              const agentColor = agentColors[log.agent_name] || "#4488aa";
              return (
                <div
                  key={log.id}
                  style={{
                    padding: "12px 16px",
                    borderBottom:
                      i < logs.length - 1 ? "1px solid #0a2a4a" : "none",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    background:
                      log.status === "error" ? "#ff444408" : "transparent",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#4488aa",
                      minWidth: "75px",
                      paddingTop: "2px",
                    }}
                  >
                    {new Date(log.created_at).toLocaleTimeString("fi-FI")}
                    <div style={{ fontSize: "9px", color: "#2a4a6a" }}>
                      {new Date(log.created_at).toLocaleDateString("fi-FI")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: agentColor,
                      minWidth: "75px",
                      paddingTop: "2px",
                    }}
                  >
                    {log.agent_name}
                  </div>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ fontSize: "12px", color: "#e0f0ff" }}>
                      {log.action}
                    </div>
                    {log.details && (
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#4488aa",
                          marginTop: "2px",
                        }}
                      >
                        {log.details}
                      </div>
                    )}
                    {log.error_message && (
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#ff6666",
                          marginTop: "4px",
                          padding: "4px 8px",
                          background: "#ff444411",
                          borderRadius: "4px",
                        }}
                      >
                        {log.error_message}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: statusColor + "22",
                      color: statusColor,
                      minWidth: "60px",
                      textAlign: "center",
                    }}
                  >
                    {log.status}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "chat" && (
        <div
          style={{
            background: "#0a1a2e",
            borderRadius: "8px",
            border: "1px solid #00ff8833",
            padding: "60px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              letterSpacing: "3px",
              marginBottom: "8px",
              fontSize: "18px",
            }}
          >
            JARVIS CHAT
          </h2>
          <p
            style={{
              color: "#4488aa",
              fontSize: "12px",
              marginBottom: "32px",
              letterSpacing: "1px",
            }}
          >
            Avaa JARVIS AI-assistentti uudessa ikkunassa
          </p>
          <a
            href="https://n8n.boatbase.fi"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "14px 40px",
              background: "#00ff8822",
              border: "1px solid #00ff88",
              borderRadius: "6px",
              color: "#00ff88",
              fontFamily: "monospace",
              fontSize: "14px",
              textDecoration: "none",
              letterSpacing: "2px",
            }}
          >
            AVAA JARVIS
          </a>
        </div>
      )}

      <div
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "10px",
          color: "#1a3a5a",
          letterSpacing: "2px",
        }}
      >
        BOATBASE JARVIS v5.2 - HELSINKI, FINLAND - POWERED BY CLAUDE SONNET 4.6
      </div>
    </div>
  );
}
