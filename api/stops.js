export default async function handler(req, res) {
    try {
        const response = await fetch('https://api.tranzy.ai/v1/opendata/stops', {
            method: 'GET',
            headers: {
                'X-Agency-Id': '1',
                'X-App-Key': 'yyAwUKMbMg7GFnXqDqQxfGEATuRpXGrsywdhaHZO',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error("Eroare la preluarea stațiilor");

        const data = await response.json();
        // Trimitem doar ce avem nevoie: nume, id și locație
        res.status(200).json(data);
    } catch (error) {
        res.status(502).json({ error: "Nu am putut încărca lista de stații" });
    }
}
