export async function post({ request }) {
  const token = import.meta.env.VITE_PUBLIC_OAI_TOKEN;
  let input = await request.json()
  const res = await fetch("https://api.openai.com/v1/engines/text-davinci-001/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: input.prompt,
      max_tokens: input.max_tokens,
      temperature: 0.8,
    })
  })

  let data = await res.json()
  data = data.choices[0].text

  return {
    status: 200,
    body: { data },
  }
}
