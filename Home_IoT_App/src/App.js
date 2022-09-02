import { TabBar } from "./components/layouts/TabBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        SmartHome App
        <div>
          <img
            className="bannerAdOne"
            src={require("./graphics/email.png")}
            width="100"
            height="100"
            onClick={() =>
              window.open(
                "https://mail.google.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          ></img>
          <img
            className="bannerAdTwo"
            src={require("./graphics/calendar.png")}
            width="100"
            height="100"
            onClick={() =>
              window.open(
                "https://calendar.google.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          ></img>
        </div>
      </header>
      <div className="AppContent">
        <TabBar />
      </div>
    </div>
  );
}

export default App;
