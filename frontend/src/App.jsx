import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import "./App.css";

function App() {
  const [fact, setfact] = useState(null);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPrime, setIsPrime] = useState(null);

  async function getAFact() {
    try {
      setLoading(true);
      // get data from the api
      const response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      );
      if (response) {
        // convert the data to json
        const data = await response.json();

        // set the data to the state
        setfact(data.text);
      } else {
        toast.error("No response from the server");
      }
    } catch (error) {
      toast.error("Error, try again later");
    } finally {
      // remove the loader
      setLoading(false);
    }
  }

  async function checkPrime(num) {
    try {
      // get data from the api
      const response = await fetch("http://localhost:3000/api/checkNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // sned number in body
        body: JSON.stringify({ number: num }),
      });
      if (response.ok) {
        // convert the data to json
        const data = await response.json();
        // set the data to the state
        setIsPrime(data.isPrime);
      } else {
        toast.error("No response from the server");
      }
    } catch (error) {
      toast.error("Error, try again later");
    } finally {
      // remove the loader
    }
  }
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        {/* headings */}
        <div className="">
          <h1 className="text-xl text-indigo-700  font-bold">
            Random Fact Generator
          </h1>
          <p className="text-black">
            Click the below button to get a random fact
          </p>
        </div>

        {/* button to generate a fact */}
        <button
          className="bg-indigo-700 text-white p-2 rounded-2xl hover:bg-indigo-600 w-fit cursor-pointer"
          onClick={() => {
            getAFact();
          }}
        >
          Get a Fact
        </button>

        {/* fact */}
        <div className="rounded-2xl shadow-lg border  transition-all bg-black p-3 flex flex-col">
          <h2 className="text-xl font-semibold text-indigo-700  mb-2">
            Random Fact
          </h2>
          <p className="text-slate-800 dark:text-slate-200 h-[200px] md:h-[150px] md:w-[800px] overflow-auto ">
            {loading ? (
              <ClipLoader color="#7c22e4" />
            ) : fact ? (
              fact
            ) : (
              "no fact ☹️"
            )}
          </p>
        </div>
      </div>

      {/* prime number checker */}
      <div className="flex flex-col gap-5 items-center mt-10">
        {/* headings */}

        <h1 className="text-xl text-indigo-700  font-bold">
          Prime Number Checker
        </h1>
        <div className="flex gap-3 items-center">
          {" "}
          <label for="number">Enter the number</label>
          <input
            type="number"
            id="number"
            className="border-2 p-1"
            onChange={(e) => {
              setNumber(e.target.value);
              setIsPrime(null);
            }}
            value={number}
          />
        </div>

        {/* button to generate a fact */}
        <button
          className="bg-indigo-700 text-white p-2 rounded-2xl hover:bg-indigo-600 w-fit cursor-pointer"
          onClick={() => {
            checkPrime(number);
          }}
        >
          Check for prime number
        </button>

        {/* fact */}
        <div className="rounded-2xl shadow-lg border  transition-all bg-black p-3 flex flex-col">
          <h2 className="text-xl font-semibold text-indigo-700 w-[400px] mb-2">
            {isPrime === true
              ? `${number} is a prime number`
              : isPrime === false
              ? `${number} is not a prime number`
              : "God knows 🫡"}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
