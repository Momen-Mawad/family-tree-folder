LOGIN_URL=http://127.0.0.1:8000/login/
YOUR_USER='Momen'
YOUR_PASS='1'
COOKIES=cookies.txt
CURL_BIN="curl -s -c $COOKIES -b $COOKIES -e $LOGIN_URL"

echo -n "Django Auth: get csrftoken ..."
$CURL_BIN $LOGIN_URL > /dev/null
DJANGO_TOKEN="csrfmiddlewaretoken=$(grep csrftoken $COOKIES | sed 's/^.*csrftoken\s*//')"

echo -n $DJANGO_TOKEN



echo -n " perform login ..."

$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X POST $LOGIN_URL

echo -n " do something while logged in ..."
$CURL_BIN \
    -d "$DJANGO_TOKEN&..." \
    -X GET http://127.0.0.1:8000/test/

echo " logout"
rm $COOKIES