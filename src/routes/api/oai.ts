export async function post({ request }) {
  let input = await request.json()
  const res = await fetch("https://api.openai.com/v1/engines/text-davinci-001/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: input.prompt,
      max_tokens: input.max_tokens,
    })
  })

  let data = await res.json()
  data = data.choices[0].text

  return {
    status: 200,
    body: { data },
  }
}
