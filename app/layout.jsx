import "@styles/globals.css";

export const metadata = {
  title: "PromptHub",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <div className="main">
        <div className="gradient"></div>
      </div>
      <main className="app">{children}</main>
    </html>
  );
};

export default RootLayout;
