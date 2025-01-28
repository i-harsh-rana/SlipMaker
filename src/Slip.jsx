import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Register the Devanagari font
Font.register({
  family: "NotoSansDevanagari",
  src: "/NotoSansDevanagari-Regular.ttf", // Ensure the font file is in the public folder
});

const App = () => {
  const [names, setNames] = useState(Array(16).fill("")); // Array for 16 names
  const [villages, setVillages] = useState(Array(16).fill("")); // Array for 16 villages
  const [titles, setTitles] = useState(Array(16).fill("श्रीमान")); // Array for titles ("श्रीमान" or "श्रीमती")

  const [isHovered, setIsHovered] = useState(false);

// Add this near the top of your component where other styles are defined
const creditStyle = {
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "8px",
    fontSize: "14px",
    background: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    animation: "hoverEffect 2s infinite ease-in-out",
    cursor: "pointer",
    color: "black",
    transition: "all 0.3s ease", // Smooth transition for hover effects
  };

  // Keyframe animation styles
  const keyframeStyles = `
    @keyframes hoverEffect {
      0%, 100% {
        transform: translateY(0);
        text-shadow: none;
      }
      50% {
        transform: translateY(-5px);
      }
    }
    .credit {
      display: inline-block;
    }
    .credit:hover {
      transform: scale(1.2); /* Slightly increase size */
      animation: none; /* Stop the animation on hover */
    }
  `;

  // Dynamically inject keyframe styles
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframeStyles;
  document.head.appendChild(styleSheet);

  // Update name input
  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  // Update village input
  const handleVillageChange = (index, value) => {
    const updatedVillages = [...villages];
    updatedVillages[index] = value;
    setVillages(updatedVillages);
  };

  // Update title selection
  const handleTitleChange = (index, value) => {
    const updatedTitles = [...titles];
    updatedTitles[index] = value;
    setTitles(updatedTitles);
  };

  const MyDocument = () => (
    <Document>
      <Page size={[480.48, 864]} style={styles.page}> {/* Custom Page Size */}
        <View style={styles.grid}>
          {names.map((name, index) => (
            <View key={index} style={styles.box}>
              <Text style={styles.boxText}>
                सेवा में,
                {"\n"}{"      "}{titles[index]} {name || "__________"} जी
                {"\n"}{"      "}(सपरिवार)
                {"\n"}{"      "}ग्राम:- {villages[index] || "__________"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      fontFamily: "NotoSansDevanagari",
      paddingLeft: 39,
      paddingRight: 39,
      paddingTop: 1
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      height: "100%",
    },
    box: {
      width: "49%",          // Ensures 2 columns
      minHeight: 98.88,      // 3.48 cm converted to points
      height: 98.88,         // Fixed height for each box (adjust as needed)
      maxHeight: 98.88,      // Ensures the height doesn't exceed 98.88 points
      marginBottom: "11px",
      padding: 10,           // More padding for cleaner look
      borderRadius: "10px",
      paddingTop: 12

    },
    boxText: {
      fontSize: "14px",           // Adjust font size
      lineHeight: 1.5,
    },
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <a
        href="https://harshrana.in" // Replace with your target URL
        target="_blank"
        rel="noopener noreferrer" // Adds security for target="_blank"
        style={{ textDecoration: "none" }} // Remove underline
      >
        <div className="credit" style={creditStyle}>
          By: Harsh Rana 😎
        </div>
      </a>
      
      <h1>Enter Name and Village (in Hindi)</h1>
      
      <form style={{ marginBottom: "20px" }}>
        {names.map((name, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>Title {index + 1}:</label>
            <select
              value={titles[index]}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginTop: "5px",
              }}
            >
              <option value="श्रीमान">Shri</option>
              <option value="श्रीमती">Shreemati</option>
            </select>

            <label>Name {index + 1}:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Name ${index + 1}`}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginTop: "5px",
              }}
            />
            <label style={{ marginTop: "10px", display: "block" }}>Village {index + 1}:</label>
            <input
              type="text"
              value={villages[index]}
              onChange={(e) => handleVillageChange(index, e.target.value)}
              placeholder={`Village ${index + 1}`}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginTop: "5px",
              }}
            />
          </div>
        ))}
      </form>

      {names.some((name) => name.trim() !== "") && (
        <PDFDownloadLink
          document={<MyDocument />}
          fileName="English_Names_Details.pdf"
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
        </PDFDownloadLink>
      )}
    </div>
);

};

export default App;