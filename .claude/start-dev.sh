#!/bin/bash
export HOME="/Users/ahmedsoudan"
export PATH="$HOME/bin:/tmp/nodebin:/Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin:$PATH"
mkdir -p /tmp/nodebin "$HOME/bin"
ln -sf /Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin/node /tmp/nodebin/node
ln -sf /Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin/npm /tmp/nodebin/npm
ln -sf /Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin/npx /tmp/nodebin/npx
ln -sf /Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin/node "$HOME/bin/node"
cd /Users/ahmedsoudan/Downloads/ui-ux-pro-max-skill-main/ahmed-soudan-portfolio
exec /Users/ahmedsoudan/.nvm/versions/node/v24.14.0/bin/node node_modules/next/dist/bin/next dev --port 3737
