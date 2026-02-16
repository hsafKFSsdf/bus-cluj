export default async function handler(req, res) {
    const { id } = req.query;
    // Testăm cu stația Sora (148) direct în URL dacă nu vine ID-ul
    const stopId = id || "148"; 
    
    const url = `https://api.tranzy.ai/v1/opendata/arrivals/${stopId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': '*/*'
            }
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Serverul Tranzy a refuzat conexiunea. Probabil cheia OpenData este temporar suspendata sau ID-ul unitatii de transport este invalid." });
    }
}
