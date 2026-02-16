export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Lipsește ID-ul stației" });
    }

    // URL-ul oficial Tranzy
    const url = `https://api.tranzy.ai/v1/opendata/arrivals/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        // Verificăm dacă serverul a răspuns cu succes
        if (!response.ok) {
            // Dacă e 502, 404 sau 403, trimitem un mesaj clar interfeței
            return res.status(response.status).json({ 
                error: "Sursa de date indisponibilă", 
                statusCode: response.status 
            });
        }

        const data = await response.json();
        
        // Trimitem datele către index.html
        res.status(200).json(data);

    } catch (error) {
        // Eroare de rețea sau server picat complet
        res.status(502).json({ error: "Eroare de conexiune la serverul Tranzy" });
    }
}
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Nu am putut citi datele de pe site-ul CTP" });
    }
}
