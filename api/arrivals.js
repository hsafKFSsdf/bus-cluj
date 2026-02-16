export default async function handler(req, res) {
    // 1. Luăm ID-ul stației din cererea făcută de index.html
    const { id } = req.query;

    // Dacă nu avem ID, dăm o eroare rapidă
    if (!id) {
        return res.status(400).json({ error: "Lipsește ID-ul stației" });
    }

    // 2. Configurăm URL-ul oficial Tranzy OpenData
    const url = `https://api.tranzy.ai/v1/opendata/arrivals/${id}`;

    try {
        // 3. Facem cererea către serverul lor
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1', // ID pentru CTP Cluj
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': 'application/json'
            }
        });

        // 4. Verificăm dacă serverul lor a răspuns cu succes
        if (!response.ok) {
            // Dacă primim 404 sau 502, trimitem eroarea mai departe către aplicație
            const errorData = await response.text();
            console.error("Eroare Tranzy:", errorData);
            return res.status(response.status).json({ 
                error: "Serverul Tranzy este indisponibil", 
                status: response.status 
            });
        }

        // 5. Trimitem datele primite înapoi către index.html
        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        // 6. Gestionăm situația în care serverul e picat complet (Offline)
        console.error("Fetch error:", error);
        return res.status(502).json({ error: "Gateway Error - Serverul nu răspunde" });
    }
}
