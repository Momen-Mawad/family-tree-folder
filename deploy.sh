# build react app
# cd ../client
# npm run build

# push code to GitHub
cd ..
git add .
git commit -m "deploy $(date +'%m/%d %H:%M')"
git push origin master

# sync media files to S3
#aws s3 sync ./dancemap/media/ s3://dancemap-bucket/
