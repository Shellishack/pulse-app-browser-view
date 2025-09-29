import React, { useEffect } from "react";
import "./tailwind.css";
import { useLoading } from "@pulse-editor/react-api";
import { BrowserRouter } from "react-router";
import Browser from "./components/browser";

export default function Main() {
  const { isReady, toggleLoading } = useLoading();

  useEffect(() => {
    if (isReady) {
      toggleLoading(false);
    }
  }, [isReady, toggleLoading]);

  useEffect(() => {
    console.log("Refresh component");
  }, []);

  return (
    <BrowserRouter>
      <Browser />
    </BrowserRouter>
  );
}
