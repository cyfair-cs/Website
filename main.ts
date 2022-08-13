import Express, { Request, Response } from 'express'
// TODO: Install dotenv
// import dotenv from 'dotenv'
import ansi from 'cli-color'
import Path from 'path'

// dotenv.config();

const website = Express();
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
const staticdir = Path.join(__dirname, '/public/pages/');

website.use(Express.static(Path.join(__dirname, 'public/')));

website.listen(PORT, () => {
    console.log(`Started on port ${ansi.green(PORT)}`);
});

const pages = [ '', 'about', 'presentations', 'meetings', 'competitions', 'important-links' ];

// Simple Router - Will probably be replaced with Apache
pages.forEach(page => {
    website.get('/' + page, (req: Request, res: Response) => {
        let file: string;
        switch (page) {
            case '':
                file = 'home';
                break;
            case 'important-links':
                file = 'importantlinks';
                break;
            default:
                file = page;
        }
        res.sendFile(staticdir + file + '.html');
    });
});

// Not Found
website.use('/', function(req, res) {
    res.status(404).sendFile(staticdir + 'notfound.html');        
}); 


// Fallback
website.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('ERR: Could not respond to your request');
});