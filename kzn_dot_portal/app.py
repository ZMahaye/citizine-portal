from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/booking')
def booking():
    return render_template('booking.html')

@app.route('/auth')
def auth():
    return render_template('auth.html')

@app.route('/transport')
def transport():
    return render_template('transport.html')

@app.route('/maintenance')
def maintenance():
    return render_template('maintenance.html')

@app.route('/traffic')
def traffic():
    return render_template('traffic.html')

@app.route('/analytics')
def analytics():
    return render_template('analytics.html')

if __name__ == '__main__':
    app.run(debug=True)
