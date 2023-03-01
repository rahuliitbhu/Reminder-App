import React from "react";

const App = () => {
  return (
    <div style={{ position: "relative", width: "360px", height: "720px", background: "#FFFFFF" }}>
      <div style={{ position: "absolute", width: "114px", height: "14px", left: "24px", top: "75px", fontFamily: "'Epilogue'", fontStyle: "normal", fontWeight: 700, fontSize: "14px", lineHeight: "14px", color: "#333333" }}>
        text-1
      </div>
      <div style={{ position: "absolute", width: "255px", height: "64px", left: "24px", top: "98px", fontFamily: "'Epilogue'", fontStyle: "normal", fontWeight: 700, fontSize: "28px", lineHeight: "32px", letterSpacing: "-0.05em", color: "#333333" }}>
        text-2
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "20px 16px 16px", gap: "4px", position: "absolute", width: "312px", height: "56px", left: "24px", top: "227px", background: "#F4F4F4", borderRadius: "8px" }}>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>
    </div>
  );
};

export default App;
