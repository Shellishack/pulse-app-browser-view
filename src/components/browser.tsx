import React, { useEffect, useState } from "react";
import { Eko, LLMs } from "@eko-ai/eko";
import { BrowserAgent } from "@eko-ai/eko-web";
import { useLocation } from "react-router";
import { usePulseEnv } from "@pulse-editor/react-api";

export default function Browser() {
  const location = useLocation();
  const { envs } = usePulseEnv();

  const [uri, setUri] = useState("");

  async function runAgent() {
    const llms: LLMs = {
      default: {
        provider: "openai",
        model: "gpt-4o-mini",
        apiKey: envs.OPENAI_API_KEY ?? "",
      },
    };
    const agents = [new BrowserAgent()];
    const eko = new Eko({ llms, agents });
    const result = await eko.run(
      `Go to https://www.wikipedia.org/ , search for Artificial Intelligence, and tell me when you find the article. Summarize the first paragraph of the article.`
        // wrap all http links inside a param like /?uri=https%3A%2F%2Fwww.example.com%2F
        .replace(
          /https?:\/\/[^\s]+/g,
          (url) => `local url /?uri=${encodeURIComponent(url)}`
        )
    );
    alert(result.result);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setUri(params.get("uri") ?? "");
  }, [location.search]);

  return (
    <div className="w-full h-full p-2 flex flex-col">
      <div className="grid grid-rows-[max-content_auto] gap-2 h-full">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-sm"
          onClick={runAgent}
        >
          Run Agent
        </button>

        <div className="w-full h-full border border-gray-300 rounded-sm overflow-hidden">
          {uri !== "" && (
            <iframe
              className="w-full h-full"
              title="proxy-frame"
              src={decodeURIComponent(uri)}
              style={{ width: "100%", height: "90vh", border: "none" }}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
