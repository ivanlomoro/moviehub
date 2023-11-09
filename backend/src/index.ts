import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World");
})

app.post("/", (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email)
    res.status(201).send("User created");
})

app.put("/:userID", (req: Request, res: Response) => {
    const userData = req.params;
    const {email} = req.body;

    console.log(userData);
    console.log(email);
    res.send("User updated");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});