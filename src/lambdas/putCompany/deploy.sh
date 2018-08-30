cd putCompany
echo "Deploying putCompany"
zip ../../../dist/lambda/putCompany.zip * -x *deploy.sh
aws lambda update-function-code --function-name VertaaTaksit_putCompany --zip-file fileb://../../../dist/lambda/putCompany.zip --profile devuser
echo "Done"
cd ..
