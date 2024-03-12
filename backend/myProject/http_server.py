import http.server
import subprocess

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/start-django':
            self.start_django_server()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def start_django_server(self):
        try:
            # Start Django server
            subprocess.run(['python', '/home/gsm37/Documents/it490_project/myProject/manage.py', 'runserver', '0.0.0.0:8000'], check=True)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'Django server started successfully.')
        except subprocess.CalledProcessError:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b'Error starting Django server.')

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8000...')
    httpd.serve_forever()