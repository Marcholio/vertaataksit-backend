npm run build
rm -rf dist/lambda
mkdir dist/lambda
cd src/lambda
for d in */; do
    bash -H "$d"deploy.sh
done