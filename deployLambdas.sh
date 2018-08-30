cd dist/src/lambdas

rm *.zip

for f in *; do
    echo ${f}
    cd ${f}
    npm install
    zip ${f}.zip *
    aws lambda update-function-code --function-name VertaaTaksit_${f} --zip-file fileb://${f}.zip --profile devuser
    cd ..
done