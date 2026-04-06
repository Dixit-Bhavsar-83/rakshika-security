from flask import Flask, render_template, url_for # type: ignore

# FIXED: Flask ke andar __name__ (double underscore) hona chahiye
app = Flask(__name__)

@app.route('/')
def index():
    # Ye aapke templates/index.html ko load karega
    return render_template('index.html')

@app.route('/map')
def map_view():
    # Ye aapke templates/map.html ko load karega
    return render_template('map.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    # debug=True se aapko errors browser mein hi dikh jayenge
   app.run(host='0.0.0.0', port=5000, debug=True)
