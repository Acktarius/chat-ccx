#!/bin/bash
#Launch local server and open an electron windows
# this file is subject to Licence
#Copyright (c) 2024, Acktarius
##################################################################

#declaration
wdir=$PWD
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
MODEL_DIR="${SCRIPT_DIR%/*}/chat-server/models"
SERVER_DIR="${SCRIPT_DIR%/*}/chat-server"
REACT_DIR="${SCRIPT_DIR%/*}/chat-react"
ELECTRON_DIR="${SCRIPT_DIR%/*}/electron"

echo $MODEL_DIR

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
if [[ ! -f ${MODEL_DIR}/open_llama_3b_v2-w-loraCCX_2_Q8.gguf ]]; then
   if zenity --question --title="Download model ?" --text="model not detected, would you like to download it ?\n\n(patience is required)" --ok-label="Download" --cancel-label="Exit"; then
    echo "moving on"
    else
    trip
    fi
fi

set -e
# Start chat Model server
cd ${SERVER_DIR}
node index.js &
chatServerPID=$!

#cd $wdir
# Start chat react server
cd ${REACT_DIR}
npm run preview &
chatReactPID=$!

#Open Electron
cd ${ELECTRON_DIR}
npm exec electron main.js

#cleanup
npx kill-port 8080 &
npx kill-port 4173