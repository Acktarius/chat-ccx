#!/bin/bash
# shorcut installer for Chat-ccx for Ubuntu,Debian users
# this file is subject to Licence
# Copyright (c) 2024, Acktarius
#
# make sure ./install.sh is an executable file
# otherwise, run: chmod 755 install.sh
# run with command: ./install.sh
#
#
#variables
user=$(id -nu 1000)
path=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
#Functions
#trip
trip() {
kill -INT $$
}
## Shortcut creator
shortcutCreator() {
cat << EOF > /home/${user}/.local/share/applications/Conceal-chat.desktop
[Desktop Entry]
Encoding=UTF-8
Name=Conceal chat-bot
Path=${path}
Exec=${path}/launcher/launch.sh
Terminal=false
Type=Application
Icon=${path}/launcher/icon/chat-ccx.png
Hidden=false
NoDisplay=false
Terminal=false
Categories=Office
X-GNOME-Autostart-enabled=true
Comment=Chat about Conceal Network
EOF
echo "shortcut created, you may have to log out and log back in"
}
already() {
read -p  "shortcut already in place, do you want to replace it (y/N)" ans
	case $ans in
		y | Y | yes)
		rm -f /home/${user}/.local/share/applications/Conceal-chat.desktop
		shortcutCreator
		;;
		*)
		echo "nothing done"
		;;
	esac
}
# MAIN
## check and install shortcut
## not already install
if [[ ! -f /home/${user}/.local/share/applications/Conceal-chat.desktop ]]; then 
shortcutCreator
else
already
fi
## npm
cd ${path}/chat-react
npm install
cd ${path}/chat-server
npm install
cd ..
## other dep
sudo npm install -g electron -y
sudo npm install -g kill-port -y