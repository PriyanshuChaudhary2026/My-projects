import React, { useState, useEffect } from "react";
import { generateStory } from "../API/api";
import styles from "./StoryPage.module.css";

function StoryPage() {
  const genreBackgrounds = {
    Adventure: [
      "./images/Adventure/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg",
      "./images/Adventure/aerial-view-beautiful-sky-road-top-mountains-with-green-jungle-nan-province-thailand.jpg",
      "./images/Adventure/beautiful-aerial-view-chinese-town-surrounded-by-amazing-nature.jpg",
      "./images/Adventure/beautiful-scenery-wooden-bridge-middle-forest-with-green-plants-trees.jpg",
      "./images/Adventure/clouds-blue-landscape-bright-idyllic-sunshine.jpg",
      "./images/Adventure/flat-lay-hand-holding-magnifying-glass.jpg",
      "./images/Adventure/man-with-rucksack-admires-gorgeous-mountain-landscape.jpg",
      "./images/Adventure/silhouette-fog-spooky-forest-mystery-revealed-generative-ai.jpg",
      "./images/Adventure/stunning-fantasy-videogame-landscape.jpg",
      "./images/Adventure/trekking-forest.jpg",
      "./images/Adventure/view-luxurious-villa-with-modern-architectural-design.jpg",
    ],
    Romantic: [
      "./images/Romantic/dark-style-valentines-day-celebration_23-2151133833.jpg",
      "./images/Romantic/fantasy-characters-experiencing-love_23-2151164482.jpg",
      "./images/Romantic/side-view-romantic-couple-kissing_23-2150948096.jpg",
      "./images/Romantic/silhouette-couple-sunset-background_1157-33589.jpg",
      "./images/Romantic/white-red-hearts_1048-4213.jpg",
    ],
    Horror: [
      "./images/Horror/halloween-background-with-evil-eyes-graveyard_1048-3049.jpg",
      "./images/Horror/halloween-wallpaper-with-zombie-hand_23-2149122586.avif",
      "./images/Horror/hand-sticking-out-ground-fog_23-2147898934.jpg",
      "./images/Horror/haunted-house-gothic-style_23-2151626617.jpg",
      "./images/Horror/haunted-house-gothic-style_23-2151626659.avif",
      "./images/Horror/haunted-house-gothic-style_23-2151626740.jpg",
      "./images/Horror/haunted-house-vintage-style_23-2151631354.jpg",
    ],
    Creative: [
      "./images/Creative/abstract-colorful-splash-3d-background-generative-ai-background.jpg",
      "./images/Creative/creative-light-bulb-abstract-glowing-blue-background-generative-ai.jpg",
      "./images/Creative/dark-style-lamp-indoors.jpg",
      "./images/Creative/eyes-sparkled-with-vibrant-colors-autumn-leaves-generative-ai.jpg",
      "./images/Creative/world-environment-earth-day-concept-generative-ai.jpg",
    ],
    Action: [
      "./images/Action/action-pictures-gmb566k63znichgl.jpg",
      "./images/Action/landscape-extreme-typhoon-damages.jpg",
      "./images/Action/man-racing-dirt-bike-fantasy-environment (2).jpg",
      "./images/Action/man-racing-dirt-bike-fantasy-environment.jpg",
      "./images/Action/medium-shot-soldier-with-weapon.jpg",
      "./images/Action/photographer-capturing-photos-world-photography-day-war-zone-conflict-area.jpg",
    ],
    Education: [
      "./images/Education/education-day-arrangement-table-with-copy-space.jpg",
      "./images/Education/front-view-stacked-books-graduation-cap-ladders-education-day.jpg",
      "./images/Education/medium-shot-graduate-student.jpg",
      "./images/Education/portrait-three-smiling-graduate-friends-graduation-robes-university-campus-with-diploma.jpg",
      "./images/Education/university-melbourne-is-located-heart-city.jpg",
    ],
    CrimeInvestigation: [
      "./images/CrimeInvestigation/3d-render-crime-scene-tape-against-defocussed-background_1048-6111.jpg",
      "./images/CrimeInvestigation/abstract-truth-concept-composition.jpg",
      "./images/CrimeInvestigation/policeman invstigating case.jpg",
      "./images/CrimeInvestigation/detectives-team-inspecting-case-files.jpg",
      "./images/CrimeInvestigation/truth-concept-arrangement-crime-scene.jpg",
    ],
  };
    const [storyGenre, setStoryGenre] = useState('Adventure');

    const [useRandomName, setUseRandomName] = useState(true);
  
    const [characterName, setCharacterName] = useState('');
  
    const [genreDetail, setGenreDetail] = useState('');
  
    const [storyContent, setStoryContent] = useState('Select options and generate a story.');
  
    const [backgroundImage, setBackgroundImage] = useState('');
  
    const getRandomImage = (imagesObject) => {
      if (typeof imagesObject !== 'object' || imagesObject === null) {
        console.error("Invalid imagesObject provided:", imagesObject);
        return null;
      }
  
      const imagesArray = imagesObject[storyGenre];
  
      if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
        console.error("No images found for the selected genre:", storyGenre);
        return null;
      }
  
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      return imagesArray[randomIndex];
    };

    const handleBackgroundChange = () => {
      const image = getRandomImage(genreBackgrounds);
      setBackgroundImage(image ? `url(${image})` : '');
    };
  
    const handleGenreChange = (event) => {
      setStoryGenre(event.target.value);
      handleBackgroundChange();
    };
  
    const handleRandomNameToggle = () => {
      setUseRandomName(!useRandomName);
    };
  
    const handleCharacterNameChange = (event) => {
      setCharacterName(event.target.value);
    };
  
    const handleGenreDetailChange = (event) => {
      setGenreDetail(event.target.value);
    };
  
    const handleGenerateStory = async (event) => {
      event.preventDefault();
      const namePart = useRandomName ? "a random character" : `a character named ${characterName}`;
      const input = `Write a ${storyGenre} story ${genreDetail ? `about ${genreDetail}` : ""} with ${namePart}`;
      try {
        const content = await generateStory(input);
        setStoryContent(content);
      } catch (error) {
        console.error("Error generating content:", error);
        setStoryContent("Failed to load story.");
      }
    };
  
    return (
      <div className={styles.container} style={{ backgroundImage: backgroundImage }}>
        <header className={styles.header}>
          <h1>Your Adventure Begins Here</h1>
        </header>
        <form onSubmit={handleGenerateStory}>
          <div>
            <h3>Choose a story genre:</h3>
            <select className={styles.select} value={storyGenre} onChange={handleGenreChange}>
              <option value="Creative">Creative</option>
              <option value="Adventure">Adventure</option>
              <option value="Romantic">Romantic</option>
              <option value="Action">Action</option>
              <option value="Horror">Horror</option>
              <option value="Education">Education</option>
              <option value="CrimeInvestigation">CrimeInvestigation</option>
            </select>
          </div>
          <div>
            <h3>Additional Details:</h3>
            <input
              className={styles.input}
              type="text"
              value={genreDetail}
              onChange={handleGenreDetailChange}
              placeholder="Enter details for the selected genre"
            />
          </div>
          <div className={styles.checkboxLabel}>
            <label>
              <input
                type="checkbox"
                checked={useRandomName}
                onChange={handleRandomNameToggle}
              />
              Use random name
            </label>
            {!useRandomName && (
              <input
                className={styles.input}
                type="text"
                value={characterName}
                onChange={handleCharacterNameChange}
                placeholder="Enter character name"
                required
              />
            )}
          </div>
          <button className={styles.button} type="submit">Generate Story</button>
        </form>
        <div className={styles.storyContent}>
          <h3>Generated Story:</h3>
          <p>{storyContent}</p>
        </div>
      </div>
    );
  }
  
  export default StoryPage;