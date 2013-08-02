npm install forever -g
npm install
rm /etc/init.d/libra
cp libra /etc/init.d/libra
chmod 755 /etc/init.d/libra
update-rc.d libra defaults
echo "Libra Installed - Please Reboot"
