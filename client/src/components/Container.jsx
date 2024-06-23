import { useState } from "react";
import axios from "axios";

function Container() {
  const [link, setLink] = useState("");
  let shortId;

  const handleLinkGeneration = async () => {
    const url = link;
    const res = await axios.post("http://localhost:3000/url", { url: url });
    shortId = res.data.id;
    setLink(shortId);

    console.log(res);
  };

  const handleRedirection = async () => {
    const res = await axios.get(`http://localhost:3000/url/${link}`);
    const ogUrl = res.data.redirect;
    console.log(ogUrl);

    if (ogUrl) {
      window.location.href = ogUrl; // Redirect to the fetched URL
    } else {
      console.error("Redirect URL is not set");
    }
  };

  return (
    <div className="main">
        <div className="heading itim-regular">
            <h2 className="title outlined-text">URL Shorty</h2>
            <h4 id="tagline">Shorten your url within seconds or paste the short link here!</h4>
        </div>
      <div className="container">
        <input
          id="inputBox"
          type="text"
          placeholder="Enter the Url to generate a short link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>
      <div className="container2">
        <button
          id="generateButton"
          className="itim-regular btn"
          onClick={handleLinkGeneration}
        >
          Generate
        </button>
        <button
          className="itim-regular btn"
          id="redirectButton"
          onClick={handleRedirection}
        >
          Redirect!
        </button>
      </div>
    </div>
  );
}

export default Container;
