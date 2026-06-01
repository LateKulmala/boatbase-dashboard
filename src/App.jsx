import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xzzptcztfcoolwyiudja.supabase.co",
  "sb_publishable_xK_coX_CaU1eQkDj63d0bw_o6jdbTkF"
);

const PASSWORD = "boatbase2026";

const agents = [
  { name: "JARVIS", role: "Keskusaivot", status: "online", color: "#00ff88" },
  { name: "SCOUT", role: "Markkinatutkimus", status: "online", color: "#00ccff" },
  { name: "HUNTER", role: "Partnerihankinta", status: "online", color: "#ff9900" },
  { name: "WRITER", role: "Sisällöntuotanto", status: "online", color: "#cc44ff" },
  { name: "REPORTER", role: "Uutisartikkelit", status: "online", color: "#ff44aa" },
  { name: "GUARDIAN", role: "Monitorointi", status: "online", color: "#00ff88" },
  { name: "HERMES", role: "Asiakaspalvelu", status: "online", color: "#00ccff" },
  { name: "SHIELD", role: "Tietoturva", status: "online", color: "#ffcc00" },
  { name: "SOCIAL", role: "Somemanageri", status: "building", color: "#ffcc00" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (loggedIn) fetchData();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [loggedIn]);

  async function fetchData() {
    const { data: arts } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    const { data: conts } = await supabase.from("hunter_contacts").select("*").order("created_at", { ascending: false });
    const { data: msgs } = await supabase.from("hermes_messages").select("*").order("created_at", { ascending: false });
    setArticles(arts || []);
    setContacts(conts || []);
    setMessages(msgs || []);
    setLoading(false);
  }

  function handleLogin() {
    if (password === PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Väärä salasana!");
    }
  }

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace" }}>
        <div style={{ background: "#0a1a2e", border: "1px solid #00ccff33", borderRadius: "12px", padding: "40px", width: "320px", textAlign: "center" }}>
          <h1 style={{ color: "#00ccff", letterSpacing: "4px", fontSize: "20px", marginBottom: "8px" }}>⚡ JARVIS</h1>
          <p style={{ color: "#4488aa", fontSize: "12px", letterSpacing: "2px", marginBottom: "32px" }}>BOATBASE COMMAND CENTER</p>
          <input
            type="password"
            placeholder="Salasana..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "12px", background: "#050d1a", border: "1px solid #00ccff44", borderRadius: "6px", color: "#e0f0ff", fontFamily: "monospace", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "#ff4444", fontSize: "12px", marginBottom: "12px" }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: "#00ccff22", border: "1px solid #00ccff", borderRadius: "6px", color: "#00ccff", fontFamily: "monospace", fontSize: "14px", cursor: "pointer", letterSpacing: "2px" }}>
            KIRJAUDU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", color: "#e0f0ff", fontFamily: "monospace", padding: "24px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #0a2a4a", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#00ccff", letterSpacing: "4px" }}>⚡ BOATBASE J.A.R.V.I.S.</h1>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#4488aa", letterSpacing: "2px" }}>JUST A RATHER VERY INTELLIGENT SYSTEM</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "22px", color: "#00ff88", letterSpacing: "2px" }}>{time.toLocaleTimeString("fi-FI")}</div>
          <div style={{ fontSize: "11px", color: "#4488aa" }}>{time.toLocaleDateString("fi-FI", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          <button onClick={() => setLoggedIn(false)} style={{ marginTop: "4px", background: "none", border: "1px solid #ff444444", borderRadius: "4px", color: "#ff4444", fontSize: "10px", padding: "2px 8px", cursor: "pointer", fontFamily: "monospace" }}>KIRJAUDU ULOS</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "ARTIKKELIT", value: articles.length, color: "#cc44ff", icon: "📝" },
          { label: "PARTNERIT", value: contacts.length, color: "#ff9900", icon: "🎯" },
          { label: "ASIAKASVIESTIT", value: messages.length, color: "#00ccff", icon: "📧" },
          { label: "AGENTIT LIVE", value: agents.filter(a => a.status === "online").length, color: "#00ff88", icon: "🤖" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#0a1a2e", border: `1px solid ${stat.color}33`, borderRadius: "8px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>{stat.icon}</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color }}>{loading ? "..." : stat.value}</div>
            <div style={{ fontSize: "10px", color: "#4488aa", letterSpacing: "1px", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#00ccff", fontSize: "13px", letterSpacing: "3px", marginBottom: "12px" }}>⬡ AGENTTIJÄRJESTELMÄ</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {agents.map((agent) => (
            <div key={agent.name} style={{ background: "#0a1a2e", border: `1px solid ${agent.color}44`, borderRadius: "8px", padding: "12px", position: "relative" }}>
              <div style={{ position: "absolute", top: "8px", right: "8px", width: "7px", height: "7px", borderRadius: "50%", background: agent.color }}></div>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: agent.color }}>{agent.name}</div>
              <div style={{ fontSize: "10px", color: "#4488aa" }}>{agent.role}</div>
              <div style={{ fontSize: "9px", marginTop: "6px", color: agent.status === "online" ? "#00ff88" : "#ffcc00" }}>
                {agent.status === "online" ? "● LIVE" : "◐ RAKENNETAAN"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[
          { id: "overview", label: "📝 ARTIKKELIT" },
          { id: "contacts", label: "🎯 CRM" },
          { id: "messages", label: "📧 ASIAKASPALVELU" },
          { id: "chat", label: "💬 JARVIS CHAT" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 16px", background: activeTab === tab.id ? "#00ccff22" : "#0a1a2e", border: `1px solid ${activeTab === tab.id ? "#00ccff" : "#0a2a4a"}`, borderRadius: "6px", color: activeTab === tab.id ? "#00ccff" : "#4488aa", fontFamily: "monospace", fontSize: "11px", cursor: "pointer", letterSpacing: "1px" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #cc44ff33", overflow: "hidden" }}>
          {loading ? <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ladataan...</div> :
            articles.slice(0, 10).map((article, i) => (
              <div key={article.id} style={{ padding: "12px 16px", borderBottom: i < 9 ? "1px solid #0a2a4a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#e0f0ff" }}>{article.title?.substring(0, 60)}...</div>
                  <div style={{ fontSize: "10px", color: "#4488aa", marginTop: "2px" }}>{article.category} · {article.read_minutes} min</div>
                </div>
                <div style={{ fontSize: "10px", color: "#cc44ff" }}>{new Date(article.created_at).toLocaleDateString("fi-FI")}</div>
              </div>
            ))
          }
        </div>
      )}

      {activeTab === "contacts" && (
        <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #ff990033", overflow: "hidden" }}>
          {loading ? <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ladataan...</div> :
            contacts.length === 0 ?
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ei kontakteja — HUNTER ajaa klo 10:00</div> :
              contacts.map((contact, i) => (
                <div key={contact.id} style={{ padding: "12px 16px", borderBottom: i < contacts.length - 1 ? "1px solid #0a2a4a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "#e0f0ff" }}>{contact.yritys_nimi || "—"}</div>
                    <div style={{ fontSize: "10px", color: "#4488aa", marginTop: "2px" }}>{contact.email} · {contact.tyyppi}</div>
                  </div>
                  <div style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "#ff990022", color: "#ff9900" }}>{contact.status}</div>
                </div>
              ))
          }
        </div>
      )}

      {activeTab === "messages" && (
        <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #00ccff33", overflow: "hidden" }}>
          {loading ? <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ladataan...</div> :
            messages.length === 0 ?
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ei asiakasviestejä vielä</div> :
              messages.map((msg, i) => (
                <div key={msg.id} style={{ padding: "16px", borderBottom: i < messages.length - 1 ? "1px solid #0a2a4a" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#00ccff" }}>{msg.from_email}</div>
                    <div style={{ fontSize: "10px", color: "#4488aa" }}>{new Date(msg.created_at).toLocaleDateString("fi-FI")}</div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#e0f0ff", marginBottom: "4px" }}>📨 {msg.subject}</div>
                  <div style={{ fontSize: "11px", color: "#4488aa", marginBottom: "8px" }}>{msg.message?.substring(0, 100)}...</div>
                  <div style={{ fontSize: "11px", color: "#00ff88", background: "#00ff8811", padding: "8px", borderRadius: "4px", borderLeft: "2px solid #00ff88" }}>
                    🤖 {msg.response?.substring(0, 150)}...
                  </div>
                </div>
              ))
          }
        </div>
      )}

      {activeTab === "chat" && (
        <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #00ff8833", padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚡</div>
          <h2 style={{ color: "#00ff88", letterSpacing: "3px", marginBottom: "8px", fontSize: "18px" }}>JARVIS CHAT</h2>
          <p style={{ color: "#4488aa", fontSize: "12px", marginBottom: "32px", letterSpacing: "1px" }}>Avaa JARVIS AI-assistentti uudessa ikkunassa</p>
          <a
            href="http://204.168.129.61:5678"
            target="_blank"
            rel="noreferrer"
            style={{ padding: "14px 40px", background: "#00ff8822", border: "1px solid #00ff88", borderRadius: "6px", color: "#00ff88", fontFamily: "monospace", fontSize: "14px", textDecoration: "none", letterSpacing: "2px" }}
          >
            AVAA JARVIS →
          </a>
        </div>
      )}

      <div style={{ marginTop: "24px", textAlign: "center", fontSize: "10px", color: "#1a3a5a", letterSpacing: "2px" }}>
        BOATBASE JARVIS v5.0 · HELSINKI, FINLAND · POWERED BY CLAUDE SONNET 4.6
      </div>
    </div>
  );
}
