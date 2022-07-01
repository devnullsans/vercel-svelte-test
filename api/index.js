export default async (req, res) => {
    console.log('req.url', req.url);
    console.log('req.method', req.method);
    console.log('req.cookies', req.cookies);
    console.log('req.query', req.query);
    console.log('req.header', req.header);
    console.log('req.body', req.body);
    res.status(200).json({});
}
