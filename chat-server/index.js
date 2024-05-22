import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import {fileURLToPath} from "url";
import path from "path";
import cors from 'cors';
import {downloadFile} from 'ipull';
import { access, constants } from 'node:fs';
import {LlamaModel, LlamaContext, LlamaChatSession, EmptyChatPromptWrapper} from "node-llama-cpp";
// Model access and setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));



const checkmodel = path.join(__dirname, "models", "open_llama_3b_v2-w-loraCCX_2_Q8.gguf");

// Check if the file exists in the current directory.
access(checkmodel, constants.F_OK, async (err) => {
  //console.log(`${checkmodel} ${err ? 'does not exist' : 'exists'}`);
    if (err) {
        try {
        //Downloading model
        const downloader = await downloadFile({
        url: 'https://huggingface.co/Acktarius/open_llama_3b_v2-w-loraCCX_2_Q8.gguf/resolve/main/open_llama_3b_v2-w-loraCCX_2_Q8.gguf?download=true',
        directory: './models',
        skipExisting: true,
        cliProgress: true
        });

        setTimeout(() => {
        downloader.closeAndDeleteFile();
        }, 500000);

        await downloader.download();
    } catch (error) { 
        console.error;
    }
    }
});



const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "open_llama_3b_v2-w-loraCCX_2_Q8.gguf") //adjust file model name as needed.
});



const context = new LlamaContext({model});
const session = new LlamaChatSession({
    context//,
    //promptWrapper: new EmptyChatPromptWrapper()
});

const app = express();
const httpServer = createServer(app);

app.use(
    cors({
        origin: "*",
    })
);

const io = new Server(httpServer , {
    cors: {
        origin: "*",
    },
});


io.on("connection", (soc) => {
    console.log("new connection to CCX_Bot");
    soc.on("message", async (msg) => {
        const ccxbot_reply = await session.prompt(msg);
        soc.emit("response", ccxbot_reply.split(":")[0]);
    });
  });

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => {
    console.log("server started on port %d", PORT)
})




