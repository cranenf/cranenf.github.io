import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

token = 'ghp_BwE6KzxdRSWrD1lTP8qoymNlIhhckc3IZ5zq'
data = json.dumps({'name': 'dev-crane-nf.github.io', 'description': '个人网站 - 数学博客', 'auto_init': True}).encode()

req = urllib.request.Request('https://api.github.com/user/repos', data=data, headers={
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0'
})
try:
    resp = urllib.request.urlopen(req, context=ctx, timeout=15)
    print('Status: ' + str(resp.status))
    result = json.loads(resp.read())
    print('Created: ' + result.get('full_name', ''))
    print('Clone URL: ' + result.get('clone_url', ''))
except urllib.error.HTTPError as e:
    print('HTTP Error: ' + str(e.code))
    print(e.read().decode())
except Exception as e:
    print('Error: ' + str(e))
