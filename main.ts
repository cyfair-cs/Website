import Express, { Request, Response } from 'express'
import Path from 'path'

const website = Express();
const PORT = 3000;

website.use(Express.static(Path.join(__dirname, 'public/')));

website.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html')
});
