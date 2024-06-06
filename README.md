# chat-ccx
chat bot Conceal finetuned model

WIP project, operational in development, follow those step to try it out.

---

## Dependencies required
nodejs, npm, electron, kill-port  
`npm install -g electron`  
`npm install --global kill-port`  

## Install
within terminal, in folder of your choice :  
`git clone https://github.com/Acktarius/chat-ccx.git` 

### Step 1
Download the Model from hugging face :
[https://huggingface.co/Acktarius/open_llama_3b_v2-w-loraCCX_2_Q8](https://huggingface.co/Acktarius/open_llama_3b_v2-w-loraCCX_2_Q8/tree/main)
and move the file in the folder /chat-server/models/

### Step 2
in **chat-server** folder modify index.js to reflect the downloaded model.  
ie: `modelPath: path.join(__dirname, "models", "open_llama_3b_v2-w-loraCCX_2_Q8.gguf")`

`npm install`  

### Step 3
in **chat-react** folder
`npm install`  


## Run
`./launcher/launcher.sh` 