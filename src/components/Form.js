import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_DATA, ADD_LINK } from "../graphql/get-data";

export default function Form() {
  // slug and link states are the current inputs. finalLink is the array
  // that contains the base URL(pathname), the original slug, and url
  // from the input fields
  const { loading, error } = useQuery(ALL_DATA);
  const [insert_Link_one] = useMutation(ADD_LINK);
  const [link, setLink] = useState("");
  const [slug, setSlug] = useState("");
  const [finalLink, setFinalLink] = useState([]);
  const [isDispLink, setIsDispLink] = useState(false);
  if (loading) return "Loading...";
  if (error) return "Error!";

  // The next two functions are for handling the URL input and the slug
  // input.
  function handleChange(event) {
    const { value } = event.target;
    setLink(value);
  }

  function handleSlug(event) {
    const { value } = event.target;
    setSlug(value);
  }

  // Creating a 4 character string of numbers and letters
  function generateSlug() {
    const randSlug =
      Math.random().toString(32).substring(3, 5) +
      Math.random().toString(32).substring(3, 5);
    return randSlug;
  }

  // If the slug is present use slug, if not generate new slug.
  // The slug and url are saved to the database. Then the setFinalLink
  // is called and stores the data that will be rendered in the UI
  function handleSubmit(event) {
    event.preventDefault();
    const pathname = new URL(link).host;
    if (slug) {
      insert_Link_one({ variables: { name: slug, url: link } });
      const arr = [pathname, slug, link];
      setFinalLink((prevLink) => [...prevLink, arr]);
    } else {
      const randSlug = generateSlug();
      insert_Link_one({ variables: { name: randSlug, url: link } });
      const arr = [pathname, randSlug, link];
      setFinalLink((prevLink) => [...prevLink, arr]);
    }
    setLink("");
    setSlug("");
    setIsDispLink(true);
  }

  // Display "original URL" -> "updated URL with slug"
  function currLink() {
    return finalLink
      .map((link) => (
        <p key={link[0]}>{`${link[2]} -> ${window.location.href}${link[1]}`}</p>
      ))
      .reverse();
  }

  return (
    <div className="heading">
      <h1>Save time.</h1>
      <h1>Shorten your links here.</h1>
      <p>Please enter URL and optional slug</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="link"
          placeholder="Make your links shorter"
          value={link}
          onChange={handleChange}
        />
        <input
          type="text"
          name="slug"
          placeholder="Optional slug"
          value={slug}
          onChange={handleSlug}
        />
        <button type="submit">Shorten URL</button>
      </form>
      <div>{isDispLink && currLink()}</div>
    </div>
  );
}
