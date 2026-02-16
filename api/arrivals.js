export default async function handler(req, res) {
    const { id } = req.query;
    
    // Încercăm să contactăm direct serverul de date, ocolind pagina de "Bad Gateway"
    try {
        const response = await fetch(`https://api.tranzy.ai/v1/opendata/arrivals/${id}`, {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) throw new Error("Serverul încă nu răspunde");

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        // Dacă Tranzy e mort, încercăm să returnăm un mesaj clar
        res.status(502).json({ error: "Sursa Tranzy este offline. Verifică api.tranzy.ai" });
    }
}
