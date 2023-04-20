export default async function handler(req, res) {
  if (req.headers['revalidate'] === process.env.REVALIDATE_TOKEN) {
    // await res.revalidate('/');
    console.log('REVALIDATE', req.query.path);
    await res.revalidate(req.query.path);

    res.status(200).json({ revalidate: true });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
