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
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10
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
      border: "1px solid black",
      marginBottom: "7px",
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
