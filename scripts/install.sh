npm install forever -g
npm install
rm /etc/init.d/libra
cp libra /etc/init.d/libra
chmod a+x /etc/init.d/libra
update-rc.d libra defaults
/etc/init.d/libra
