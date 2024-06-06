# chat-ccx
chat bot Conceal finetuned model (Ubuntu/Debian OS)

WIP project, operational in development, follow those step to try it out.

---

## Dependencies required
nodejs, npm, electron, kill-port  (installer script takes care of those two latter)  
> `npm install -g electron`  
> `npm install --global kill-port`  

## Install
within terminal, in folder of your choice :  
`git clone https://github.com/Acktarius/chat-ccx.git`   
`cd chat-ccx`  
`./install.sh`  

### First run
`./launcher/launch.sh`  
(this way you can see the Model download progress... be patient)


## Alternative method (if you want to download the model yourself)

### Step 1
Download the Model from hugging face :
[https://huggingface.co/Acktarius/open_llama_3b_v2-w-loraCCX_2_Q8](https://huggingface.co/Acktarius/open_llama_3b_v2-w-loraCCX_2_Q8/tree/main)
and move the file in the folder /chat-server/models/

### Step 2
in **chat-server** folder, modify index.js to reflect the downloaded model.  
ie: `modelPath: path.join(__dirname, "models", "open_llama_3b_v2-w-loraCCX_2_Q8.gguf")`  

`npm install`  

### Step 3
in **chat-react** folder  
`npm install`  
`npm run build `  


## Run
`./launcher/launcher.sh` 

---

## Debug
if an error occur and the app is not close correctly,
you may have to stop manually the chat-bot-server:  
`npx kill-port 8080`  
and/or the react interface:  
`npx kill-port 4173`  