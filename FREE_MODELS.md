# 🆓 Free Open Source Models

## Overview

All demos now use **FREE open-source models** from OpenRouter. These models don't cost anything and are perfect for demos and development!

## Current Default Model

**`mistralai/mistral-7b-instruct`** - A lightweight, efficient, and free model designed for instruction-following tasks.

## Why Free Models?

- ✅ **No cost** - Perfect for demos and learning
- ✅ **Open source** - Transparent and community-driven
- ✅ **Good performance** - Suitable for most tasks
- ✅ **No credit card required** - Just need an OpenRouter API key

## Available Free Models

### Recommended Free Models:

1. **`mistralai/mistral-7b-instruct`** (Current Default)
   - Lightweight and efficient
   - Great for instruction-following
   - Fast response times
   - Perfect for demos

2. **`mistralai/mixtral-8x7b-instruct`**
   - More powerful than Mistral 7B
   - Better for complex tasks
   - Still completely free

3. **`meta-llama/llama-3-8b-instruct`**
   - Meta's Llama 3 model
   - Well-tested and reliable
   - Good for general tasks

4. **`openchat/openchat-3.5-0106`**
   - Optimized for chat
   - Fast responses
   - Good for conversational tasks

5. **`nousresearch/nous-capybara-7b`**
   - Strong memory capabilities
   - Good for extended dialogues
   - Reliable performance

## How to Change Models

### Option 1: Environment Variable

Set in your `.env` file:

```env
DEFAULT_MODEL=mistralai/mixtral-8x7b-instruct
```

### Option 2: Code Default

The default is set in each demo file:

**Python demos:**
```python
DEFAULT_MODEL = os.getenv('DEFAULT_MODEL', 'mistralai/mistral-7b-instruct')
```

**Node.js demos:**
```javascript
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'mistralai/mistral-7b-instruct';
```

## Model Comparison

| Model | Size | Speed | Quality | Cost |
|-------|------|-------|---------|------|
| `mistralai/mistral-7b-instruct` | 7B | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | 🆓 Free |
| `mistralai/mixtral-8x7b-instruct` | 8x7B | ⚡⚡ Medium | ⭐⭐⭐⭐ Better | 🆓 Free |
| `meta-llama/llama-3-8b-instruct` | 8B | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | 🆓 Free |
| `openchat/openchat-3.5-0106` | 7B | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | 🆓 Free |

## Testing Free Models

All demos are configured to use free models by default. Just:

1. ✅ Get your OpenRouter API key (free)
2. ✅ Add it to `.env` file
3. ✅ Run the demos - no costs!

## When to Use Paid Models

Consider paid models if you need:
- Higher quality outputs
- Better reasoning capabilities
- More context understanding
- Production-grade reliability

Popular paid options:
- `openai/gpt-4` - Best quality
- `anthropic/claude-3-opus` - Excellent reasoning
- `openai/gpt-3.5-turbo` - Cost-effective

## Resources

- **OpenRouter Models:** https://openrouter.ai/models
- **Mistral AI:** https://mistral.ai/
- **Meta Llama:** https://llama.meta.com/
- **OpenChat:** https://github.com/imoneoi/openchat

---

**All demos now use free models by default! No costs, just great demos! 🎉**

