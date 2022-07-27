import Express, { Request, Response } from 'express'
import Path from 'path'

const website = Express();
const PORT = 3000;
const staticdir = Path.join(__dirname, '/public/pages/');

website.use(Express.static(Path.join(__dirname, 'public/')));

website.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});

website.get('/', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'home.html');
});

website.get('/about', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'about.html')
});

website.get('/presentations', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'presentations.html');
});

website.get('/meetings', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'meetings.html');
});

website.get('/competitions', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'competitions.html');
});

website.get('/important-links', (req: Request, res: Response) => {
    res.sendFile(staticdir + 'importantlinks.html');
});