import { useState } from "react";
import { ethers } from "ethers";
import CounselDeLaMancha from "./artifacts/CounselDeLaMancha.json";
import "./App.css";

const contractAddress = "0xEc63726129A3C42887D220aC9f7c4fe3349AcCcc";
function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const askOracle = async () => {
    if (!question) {
      setError("Please enter a question!");
      return;
    }

    setLoading(true);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CounselDeLaMancha.abi, signer);

        // Call askOracle (should return a string)
        const result = await contract.askOracle();
        console.log("Raw result from askOracle:", result);
        setResponse(result);
        setError("");
      } else {
        setError("Please install MetaMask!");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Counsel de La Mancha</h1>
      <p>Ask the noble Don Quixote your question, and receive his knightly wisdom!</p>
      <input
        type="text"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askOracle} disabled={loading}>
        {loading ? "Consulting..." : "Consult the Oracle"}
      </button>
      {response && (
        <div>
          <h3>Don Quixote’s Answer:</h3>
          <p>{response}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() =>
          window.open(
            `https://x.com/intent/tweet?text=${encodeURIComponent(
              `Counsel de La Mancha says: "${response}" #CounselDeLaMancha #Web3`
            )}`
          )
        }
        disabled={!response}
      >
        Share on X
      </button>
    </div>
  );
}

export default App;