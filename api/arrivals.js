export default async function handler(req, res) {
    const { id } = req.query; // ID-ul stației (ex: 148 pentru Sora)
    
    try {
        // Accesăm site-ul mobil oficial al CTP Cluj pentru stația respectivă
        const response = await fetch(`https://m-ctpcj.alonia.ro/index.php?page=statii&sm=3&st_id=${id}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
            }
        });

        const html = await response.text();

        // Căutăm liniile de autobuz și minutele folosind Regex (căutare în text)
        // Formatul lor în HTML este ceva de genul: <td>24B</td> ... <td>5 min</td>
        const busRegex = /<td class="linie_nr">(.+?)<\/td>[\s\S]*?<td class="linie_timp">(.+?)<\/td>/g;
        let match;
        const arrivals = [];

        while ((match = busRegex.exec(html)) !== null) {
            arrivals.push({
                routeShortName: match[1].trim(),
                arrivalMinutes: parseInt(match[2]) || 0,
                isScraped: true
            });
        }

        // Dacă nu am găsit nimic, trimitem o listă goală
        res.status(200).json(arrivals);

    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Nu am putut citi datele de pe site-ul CTP" });
    }
}
