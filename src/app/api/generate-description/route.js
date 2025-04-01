export async function POST(req) {
    const {name, shortDesc} = await req.json()
    if (!name || !shortDesc) {
        return new Response(JSON.stringify({error : 'Product name and description are required'}), {status : 400, headers : {'Content-Type' : 'application/json'}});
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    const prompt = `Write a 50-word SEO-optimized product description for a product named "${name}" with the following details : ${shortDesc}`;

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method : 'POST',
            headers : {
             'Authorization' : `Bearer ${apiKey}`,
             'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                "model": "mistral-small-latest",
                "messages": [
                    {
                        "role": "user",
                        "content": `Write a 50-word SEO-optimized product description for a product named "${name}" with the following details: ${shortDesc}`
                    }
                ]
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'API error');
        
        const description = data.choices[0].message.content.trim();
        return new Response(JSON.stringify({description}), {
            status : 200,
            headers : {
                'Content-Type' : 'application/json'
            },
        });

    } catch (error) {
        console.error("Mistral API Error: ", error);
        return new Response(JSON.stringify({error : "Failed to Generate Description"}), {status : 500, 
            headers : {'Content-Type' : 'application/json'},
        });
    }
}