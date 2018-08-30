cd dist/src/lambdas

rm *.zip

for f in *; do
    echo ${f}
    zip ${f}.zip ${f}/*
    aws lambda update-function-code --function-name VertaaTaksit_${f} --zip-file fileb://${f}.zip --profile devuser
done