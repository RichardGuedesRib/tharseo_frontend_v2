import http.server
import socketserver

class DownloadHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Content-Disposition", f"attachment; filename=\"{self.path.split('/')[-1]}\"")
        self.send_header("Content-Type", "application/octet-stream") 
        super().end_headers()

PORT = 8500

with socketserver.TCPServer(("", PORT), DownloadHandler) as httpd:
    print(f"Servindo em http://localhost:{PORT}")
    httpd.serve_forever()
