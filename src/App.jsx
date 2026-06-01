import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xzzptcztfcoolwyiudja.supabase.co",
  "sb_publishable_xK_coX_CaU1eQkDj63d0bw_o6jdbTkF"
);

const agents = [
  { name: "JARVIS", role: "Keskusaivot", status: "online", color: "#00ff88" },
  { name: "SCOUT", role: "Markkinatutkimus", status: "online", color: "#00ccff" },
  { name: "HUNTER", role: "Partnerihankinta", status: "online", color: "#ff9900" },
  { name: "WRITER", role: "Sisällöntuotanto", status: "online", color: "#cc44ff" },
  { name: "GUARDIAN", role: "Monitorointi", status: "offline", color: "#888888" },
  { name: "HERMES", role: "Asiakaspalvelu", status: "offline", color: "#888888" },
  { name: "SHIELD", role: "Tietoturva", status: "offline", color: "#888888" },
  { name: "SOCIAL", role: "Somemanageri", status: "building", color: "#ffcc00" },
];

export default function App() {
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  async function fetchData() {
    const { data: arts } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    const { data: conts } = await supabase.from("hunter_contacts").select("*").order("created_at", { ascending: false });
    setArticles(arts || []);
    setContacts(conts || []);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", color: "#e0f0ff", fontFamily: "monospace", padding: "24px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", borderBottom: "1px solid #0a2a4a", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#00ccff", letterSpacing: "4px", fontWeight: "bold" }}>⚡ BOATBASE J.A.R.V.I.S.</h1>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#4488aa", letterSpacing: "2px" }}>JUST A RATHER VERY INTELLIGENT SYSTEM</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "24px", color: "#00ff88", letterSpacing: "2px" }}>{time.toLocaleTimeString("fi-FI")}</div>
          <div style={{ fontSize: "12px", color: "#4488aa" }}>{time.toLocaleDateString("fi-FI", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "ARTIKKELIT", value: articles.length, color: "#cc44ff", icon: "📝" },
          { label: "PARTNERIT KONTAKTOITU", value: contacts.length, color: "#ff9900", icon: "🎯" },
          { label: "AGENTIT LIVE", value: agents.filter(a => a.status === "online").length, color: "#00ff88", icon: "🤖" },
          { label: "SUPABASE TAULUT", value: "12", color: "#00ccff", icon: "🗄️" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#0a1a2e", border: `1px solid ${stat.color}33`, borderRadius: "8px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{stat.icon}</div>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: stat.color }}>{loading ? "..." : stat.value}</div>
            <div style={{ fontSize: "11px", color: "#4488aa", letterSpacing: "1px", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Agents Grid */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ color: "#00ccff", fontSize: "14px", letterSpacing: "3px", marginBottom: "16px" }}>⬡ AGENTTIJÄRJESTELMÄ</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {agents.map((agent) => (
            <div key={agent.name} style={{ background: "#0a1a2e", border: `1px solid ${agent.color}44`, borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: agent.color, boxShadow: agent.status === "online" ? `0 0 8px ${agent.color}` : "none" }}></div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: agent.color, marginBottom: "4px" }}>{agent.name}</div>
              <div style={{ fontSize: "11px", color: "#4488aa" }}>{agent.role}</div>
              <div style={{ fontSize: "10px", marginTop: "8px", color: agent.status === "online" ? "#00ff88" : agent.status === "building" ? "#ffcc00" : "#444" }}>
                {agent.status === "online" ? "● LIVE" : agent.status === "building" ? "◐ RAKENNETAAN" : "○ OFFLINE"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Articles */}
        <div>
          <h2 style={{ color: "#cc44ff", fontSize: "14px", letterSpacing: "3px", marginBottom: "16px" }}>📝 VIIMEISIMMÄT ARTIKKELIT</h2>
          <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #cc44ff33", overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ladataan...</div>
            ) : articles.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ei artikkeleita</div>
            ) : (
              articles.slice(0, 6).map((article, i) => (
                <div key={article.id} style={{ padding: "12px 16px", borderBottom: i < 5 ? "1px solid #0a2a4a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "#e0f0ff" }}>{article.title?.substring(0, 40)}...</div>
                    <div style={{ fontSize: "11px", color: "#4488aa", marginTop: "2px" }}>{article.category} · {article.read_minutes} min</div>
                  </div>
                  <div style={{ fontSize: "10px", color: "#cc44ff" }}>{new Date(article.created_at).toLocaleDateString("fi-FI")}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hunter Contacts */}
        <div>
          <h2 style={{ color: "#ff9900", fontSize: "14px", letterSpacing: "3px", marginBottom: "16px" }}>🎯 HUNTER CRM</h2>
          <div style={{ background: "#0a1a2e", borderRadius: "8px", border: "1px solid #ff990033", overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>Ladataan...</div>
            ) : contacts.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#4488aa" }}>
                <div style={{ marginBottom: "8px" }}>Ei kontakteja vielä</div>
                <div style={{ fontSize: "11px" }}>HUNTER ajaa maanantaisin klo 9:00</div>
              </div>
            ) : (
              contacts.slice(0, 6).map((contact, i) => (
                <div key={contact.id} style={{ padding: "12px 16px", borderBottom: i < 5 ? "1px solid #0a2a4a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "#e0f0ff" }}>{contact.yritys_nimi || contact.email}</div>
                    <div style={{ fontSize: "11px", color: "#4488aa", marginTop: "2px" }}>{contact.email} · {contact.tyyppi}</div>
                  </div>
                  <div style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "#ff990022", color: "#ff9900" }}>{contact.status}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "32px", textAlign: "center", fontSize: "11px", color: "#1a3a5a", letterSpacing: "2px" }}>
        BOATBASE JARVIS v1.0 · HELSINKI, FINLAND · POWERED BY CLAUDE SONNET 4.6
      </div>
    </div>
  );
}
