import os

_client = None

SYSTEM_PROMPT = (
    "Summarize the following volunteer organization in 1-2 friendly sentences "
    "that would appeal to a potential volunteer. Focus on mission and impact. "
    "Keep it under 100 words."
)


def _get_client():
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY", "").strip()
        if api_key:
            try:
                from openai import OpenAI
                _client = OpenAI(api_key=api_key)
            except ImportError:
                pass
    return _client


def generate_summary(description: str) -> str:
    client = _get_client()
    if not client:
        # No API key — truncate description as fallback summary
        cutoff = 150
        return description[:cutoff].rstrip() + ("..." if len(description) > cutoff else "")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": description},
            ],
            max_tokens=80,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception:
        cutoff = 150
        return description[:cutoff].rstrip() + ("..." if len(description) > cutoff else "")
