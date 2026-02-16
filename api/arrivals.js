export default async function handler(req, res) {
    const { id } = req.query;
    try {
        const response = await fetch(`https://api.tranzy.ai/v1/opendata/arrivals/${id}`, {
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(502).json({ error: "Server picat" });
    }
}
