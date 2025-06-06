import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// initialize express
const app = express();

// enable parsing
app.use(express.json());

// cors for security
app.use(cors({ origin: "*" }));

// to load the port
dotenv.config();

// route and method to check the prime number
app.post("/api/checkNumber", (req, resp) => {
  try {
    console.log("api hit")
    const number = req.body.number;

    if (number === undefined || number === null) {
      throw new Error("Number is required");
    }

    if (number <= 1) {
      return resp.status(200).send({
        message: "Not prime",
        isPrime: false,
        success: true,
      });
    }

    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return resp.status(200).send({
          message: "Not prime",
          isPrime: false,
          success: true,
        });
      }
    }
    // no divisor is found then the number is prime
    return resp.status(200).send({
      message: "Prime number",
      isPrime: true,
      success: true,
    });
  } catch (error) {
    return resp.status(500).send({
      message: error.message || "interal Server error",
      success: false,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("started on 3000 port");
});
