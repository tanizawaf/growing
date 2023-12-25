from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
OPENAI_API_KEY='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'

def ask_question(question: str) -> str:
    llm = OpenAI(temperature=0.9)
    template = """Question: {question}

    Answer:"""

    prompt = PromptTemplate(template=template, input_variables=["question"])
    llm_chain = LLMChain(prompt=prompt, llm=llm)

    answer = llm_chain.run(question)
    return answer
