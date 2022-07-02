import dbc from './_db';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const db = await dbc();
    const collection = db.collection('expenses');
    switch (req.method) {
      case 'GET': {
        const { to, id } = req.query;
        console.log('GET>', to, id);
        if (id)
          return res.status(200).json({ data: await collection.findOne({ _id: ObjectId(id) }) });
        else if (to)
          return res.status(200).json({
            data: await collection.find(
              {
                timestamp: {
                  $gte: +to,
                  $lte: +to + 864e5
                }
              },
              { sort: { timestamp: -1 } }
            ).toArray()
          });
        else
          return res.status(400).json({ error: 'Invalid Params Error' });
      }
      case 'POST': {
        const { amount, note, timestamp } = JSON.parse(req.body);
        console.log('POST>', amount, note, timestamp);
        return res.status(200).json({
          data: await collection.insertOne({
            amount,
            note,
            timestamp
          })
        });
      }
      case 'PUT': {
        const { id } = req.query;
        const { amount, note, timestamp } = JSON.parse(req.body);
        console.log('PUT>', id, amount, note, timestamp);
        return res.status(200).json({
          data: await collection.findOneAndUpdate(
            { _id: ObjectId(id) },
            {
              $set: {
                amount,
                note,
                timestamp
              }
            }
          )
        });
      }
      case 'DELETE': {
        const { id } = req.query;
        console.log('DELETE>', id);
        return res.status(200).json({
          data: await collection.findOneAndDelete({ _id: ObjectId(id) })
        });
      }
      default:
        return res.status(400).json({ error: 'HTTP Method not supported' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Sever Error' });
  }
}
