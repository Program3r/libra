npm install forever -g
npm install
cp libra /etc/init.d/libra
chmod a+x /etc/init.d/libra
update-rc.d libra defaults
cp ../sample-config.js config.js
/etc/init.d/libra start