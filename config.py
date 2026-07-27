"""Server-side configuration. API keys live here — never expose in frontend code."""
import os
from dotenv import load_dotenv

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(PROJECT_ROOT, '.env'), override=True)

DEFAULT_PROVIDER = os.environ.get("DEFAULT_PROVIDER", "groq").lower()

# Configure backend API keys here directly or in .env
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "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")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")


def get_api_key(provider: str = None) -> str:
    provider = (provider or DEFAULT_PROVIDER).lower()
    if provider == "groq":
        return (os.environ.get("GROQ_API_KEY") or GROQ_API_KEY).strip()
    elif provider == "openrouter":
        return (os.environ.get("OPENROUTER_API_KEY") or OPENROUTER_API_KEY).strip()
    elif provider in ["openai", "chatgpt"]:
        return (os.environ.get("OPENAI_API_KEY") or OPENAI_API_KEY).strip()
    return (os.environ.get("GEMINI_API_KEY") or GEMINI_API_KEY).strip()


def set_api_key(provider: str, key: str):
    provider = (provider or DEFAULT_PROVIDER).lower()
    if provider == "groq":
        env_var = "GROQ_API_KEY"
    elif provider == "openrouter":
        env_var = "OPENROUTER_API_KEY"
    elif provider in ["openai", "chatgpt"]:
        env_var = "OPENAI_API_KEY"
    else:
        env_var = "GEMINI_API_KEY"
        
    os.environ[env_var] = key.strip()
    env_path = os.path.join(PROJECT_ROOT, '.env')
    env_lines = []
    found = False
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.strip().startswith(f"{env_var}="):
                    env_lines.append(f"{env_var}={key.strip()}\n")
                    found = True
                else:
                    env_lines.append(line)
    if not found:
        env_lines.append(f"{env_var}={key.strip()}\n")
    with open(env_path, 'w', encoding='utf-8') as f:
        f.writelines(env_lines)

