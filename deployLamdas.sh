npm run build
rm -rf dist/lambda
mkdir dist/lambda
for d in src/lambda/*/; do
    bash -H "$d"deploy.sh
done