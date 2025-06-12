import React, { useState } from "react";
import { Upload, Download, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./App.css";

const backgrounds = [
  "/retro_assets/backgrounds/bg_blurred_1.png",
  "/retro_assets/backgrounds/bg_blurred_2.png",
  "/retro_assets/backgrounds/bg_blurred_3.png",
];

const avatars = [
  "/retro_assets/avatars/dog_avatar_1.png",
  "/retro_assets/avatars/dog_avatar_2.png",
  "/retro_assets/avatars/dog_avatar_3.png",
  "/retro_assets/avatars/dog_avatar_4.png",
  "/retro_assets/avatars/dog_avatar_5.png",
  "/retro_assets/avatars/dog_avatar_6.png",
  "/retro_assets/avatars/dog_avatar_7.png",
];

const allAccessories = {
  accessories: [
    "/retro_assets/accessories/hat_knitted_1.png",
    "/retro_assets/accessories/hat_knitted_2.png",
    "/retro_assets/accessories/bone_1.png",
  ],
  "mask": [
    "/retro_assets/accessories/baseball_hat_blue.png",
  ],
  "hats": [
    "/retro_assets/accessories/dad_hat_green.png",
    "/retro_assets/accessories/dad_hat_green1.png",
    "/retro_assets/accessories/dad_hat_green2.png",
    "/retro_assets/accessories/dad_hat_green3.png",
  ],
};

function App() {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [activeAccessoryCategory, setActiveAccessoryCategory] = useState("accessories");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const toggleAccessory = (item) => {
    setSelectedAccessories((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleDownloadConfirm = () => {
    const canvas = document.getElementById("pfp-canvas");
    const ctx = canvas.getContext("2d");

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = src;
      });

    const drawImage = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const assets = [];

      if (selectedBackground) assets.push(loadImage(selectedBackground));
      if (selectedAvatar) assets.push(loadImage(selectedAvatar));
      for (let acc of selectedAccessories) {
        assets.push(loadImage(acc));
      }

      const [bg, avatar, ...accessories] = await Promise.all(assets);

      if (bg) ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      if (avatar) ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
      accessories.forEach((accImg) => {
        ctx.drawImage(accImg, 0, 0, canvas.width, canvas.height);
      });

      const link = document.createElement("a");
      link.download = "tuku_pfp.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      alert("Downloading image!");
      setShowDownloadModal(false);
    };

    drawImage();
  };

  const handleDownloadCancel = () => {
    setShowDownloadModal(false);
  };

   return (
    <div className="app-container">
      <div className="top-bar">
        <h1 className="title">TUKU PFP MAKER</h1>
        <div className="social-icons">
          {/* Twitter Link */}
          <a href="https://x.com/Tuku_hl" target="_blank" rel="noopener noreferrer">
            <img src="/retro_assets/icons/twitter.png" alt="Twitter" className="icon" />
          </a>
          {/* Telegram Link */}
          <a href="https://t.me/tuku_hl" target="_blank" rel="noopener noreferrer">
            <img src="/retro_assets/icons/telegram.png" alt="Telegram" className="icon" />
          </a>
        </div>
      </div>

      <div className="main-area">
        <div className="retro-window preview-window">
          <div className="window-header">
            <div className="window-dots"><span></span><span></span><span></span></div>
            <span className="window-title-text"></span>
            <div className="window-controls"><span></span><span></span><span></span></div>
          </div>
          <div className="window-content preview-content">
            <div className="image-display" style={{ backgroundImage: selectedBackground ? `url(${selectedBackground})` : 'none' }}>
              {selectedAvatar && <img src={selectedAvatar} alt="avatar" className="base-avatar" />}
              {selectedAccessories.map((acc, i) => (
                <img key={i} src={acc} alt="accessory" className="accessory-overlay" />
              ))}
            </div>
            <div className="caption-box">
              <span className="caption-text">TUKU THE DOGS | $TUKU</span>
            </div>
          </div>
        </div>

        <div className="selection-panels">
          <div className="retro-window selection-window background-window">
            <div className="window-header">
              <span className="window-title-text">backgrounds</span>
              <div className="window-controls"><span>-</span><span>□</span><span>x</span></div>
            </div>
            <div className="window-content scroll-content">
              {backgrounds.map((src, i) => (
                <div key={i} className={`option-item ${selectedBackground === src ? "selected" : ""}`} onClick={() => setSelectedBackground(src)}>
                  <img src={src} alt={`bg${i}`} className="option-image" />
                </div>
              ))}
              <div className="option-item pick-option">
                <span className="pick-text">pick</span>
              </div>
            </div>
          </div>

          <div className="retro-window selection-window avatar-window">
            <div className="window-header">
              <span className="window-title-text">avatars</span>
              <div className="window-controls"><span>-</span><span>□</span><span>x</span></div>
            </div>
            <div className="window-content scroll-content">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="avatar option" className={`option-item ${selectedAvatar === src ? "selected" : ""}`} onClick={() => setSelectedAvatar(src)} />
              ))}
            </div>
          </div>

          <div className="retro-window selection-window accessory-window">
            <div className="window-header">
              <span className="window-title-text">accessories</span>
              <div className="window-controls"><span>-</span><span>□</span><span>x</span></div>
            </div>
            <div className="window-content accessory-category-content">
              <div className="accessory-categories">
                {Object.keys(allAccessories).map((category) => (
                  <button key={category} className={`category-tab ${activeAccessoryCategory === category ? "active" : ""}`} onClick={() => setActiveAccessoryCategory(category)}>
                    {category}
                  </button>
                ))}
              </div>
              <div className="scroll-content accessory-options">
                {allAccessories[activeAccessoryCategory].map((src, i) => (
                  <div key={i} className={`option-item ${selectedAccessories.includes(src) ? "selected" : ""}`} onClick={() => toggleAccessory(src)}>
                    <img src={src} alt="accessory option" className="option-image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-actions">
        <div className="action-button-folder">
          <img src="/retro_assets/icons/folder.png" alt="Upload Folder" className="folder-icon" />
          <button className="retro-button">upload image</button>
        </div>
        <div className="action-button-download">
          <button className="retro-button download-btn" onClick={handleDownloadClick}>download</button>
          {showDownloadModal && (
            <div className="retro-window download-modal">
              <div className="window-header">
                <span className="window-title-text">download</span>
                <div className="window-controls"><span>-</span><span>□</span><span>x</span></div>
              </div>
              <div className="window-content download-content">
                <p>download this image?</p>
                <div className="modal-buttons">
                  <button className="retro-button" onClick={handleDownloadConfirm}>YES</button>
                  <button className="retro-button" onClick={handleDownloadCancel}>NO</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for rendering and downloading */}
      <canvas id="pfp-canvas" width={512} height={512} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default App;
