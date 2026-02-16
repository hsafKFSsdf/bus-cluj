export default async function handler(req, res) {
    const { id } = req.query;
    const API_KEY = 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO';

    try {
        const url = `https://api.tranzy.ai/v1/opendata/arrivals/${id}`;
        console.log("Cerem date pentru ID:", id); // Asta o să apară în Vercel Logs

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Eroare Tranzy:", response.status, errText);
            return res.status(response.status).json({ error: errText });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Eroare server Vercel:", error);
        return res.status(500).json({ error: "Eroare interna" });
    }
}
