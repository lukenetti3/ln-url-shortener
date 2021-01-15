import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Form from "./components/Form";
import ImageContainer from "./components/ImageContainer";
import SharedURL from "./components/SharedURL";
import { useQuery } from "@apollo/client";
import { ALL_DATA } from "./graphql/get-data";

export default function App() {
  const { data, loading, error } = useQuery(ALL_DATA);
  if (loading) return "Loading...";
  if (error) return "Error!";

  if (window.location.pathname !== "/") {
    const matchingLink = data.Link.find(
      (link) => link.name === window.location.pathname.substring(1)
    );
    return <SharedURL link={matchingLink} />;
  } else {
    return (
      <div className="container">
        <Header />
        <div className="flex">
          <Form />
          <ImageContainer />
        </div>
      </div>
    );
  }
}
