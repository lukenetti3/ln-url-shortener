import React from "react";
import logo from "../images/link-image.png";

export default function ImageContainer() {
    return(
    <div className="image-container">
        <img src={logo} alt="link-shortener" className="img" />
    </div>
    )
}
