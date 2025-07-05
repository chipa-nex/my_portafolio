from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
  
@app.route('/curriculum')
def resume():
    return render_template('resume.html')

@app.route('/proyectos')
def projects():
    return render_template('projectos.html')

@app.route('/contacto')
def contact():
    return render_template('contacto.html')

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

