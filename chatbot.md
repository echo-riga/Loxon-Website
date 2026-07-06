
test / use case

rigae@DESKTOP-VAFC0U5 MINGW64 ~
$ curl "https://api.groq.com/openai/v1/chat/completions" -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_GROQ_API_KEY" -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"Say hello in onesentence."}]}'
{"id":"chatcmpl-5c44b70c-632d-4c1d-ae01-d02160872e86","object":"chat.completion","created":1783374454,"model":"llama-3.3-70b-versatile","choices":[{"index":0,"message":{"role":"assistant","content":"Hello, it's nice to meet you and I'm here to assist you with any questions or topics you'd like to discuss."},"logprobs":null,"finish_reason":"stop"}],"usage":{"queue_time":0.265612444,"prompt_tokens":41,"prompt_time":0.012792436,"completion_tokens":27,"completion_time":0.055172062,"total_tokens":68,"total_time":0.067964498},"usage_breakdown":null,"system_fingerprint":"fp_43d97c5965","x_groq":{"id":"req_01kwwpd7caeazb6x8yatdpfhys","seed":120908243},"service_tier":"on_demand"}

rigae@DESKTOP-VAFC0U5 MINGW64 ~

context: base it on the db from the admin or fetch it from api idk