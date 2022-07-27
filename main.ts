import Express, { Request, Response } from 'express'
import Path from 'path'

const website = Express();
const PORT = 3000;
const staticdir = Path.join(__dirname, '/public/pages/');

website.use(Express.static(Path.join(__dirname, 'public/')));

website.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});

const pages = [ '', 'about', 'presentations', 'meetings', 'competitions', 'important-links' ];

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

website.use('/', function(req, res) {
    res.status(404).sendFile(staticdir + 'notfound.html');        
}); 


website.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});