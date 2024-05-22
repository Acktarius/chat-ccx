#!/bin/bash
#Launch local server and open an electron windows
# this file is subject to Licence
#Copyright (c) 2024, Acktarius
##################################################################

#declaration
wdir=$PWD

#functions
#trip
trip() {
kill -INT $$
}

#Check Zenity
if ! command -v zenity &> /dev/null; then
echo "zenity not install\nrun following command to install it\nsudo apt-get install zenity"
sleep 3
trip
fi


#main
if [[ ! -f ./chat-server/models/open_llama_3b_v2-w-loraCCX_2_Q8.gguf ]]; then
   if zenity --question --title="Download model ?" --text="model not detected, would you like to download it ?\n\n(patience is required)" --ok-label="Download" --cancel-label="Exit"; then
    echo "moving on"
    else
    trip
    fi
fi

set -e
# Start chat Model server
cd chat-server
node index.js &
chatServerPID=$!

cd $wdir
# Start chat react server
cd chat-react
npm run preview &
chatReactPID=$!

cd $wdir

#Open Electron
npm exec electron ./electron/main.js

#cleanup
npx kill-port 8080 4173