from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def indexi():
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

if __name__ == '__main__':
    app.run(debug=True)
